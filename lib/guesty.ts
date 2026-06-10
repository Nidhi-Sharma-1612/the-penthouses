import { promises as fsp } from "fs";
import path from "path";

const BOOKING_API_BASE = "https://booking.guesty.com";

// Guesty allows very few /oauth2/token requests per day (e.g. 5/day).
// The token is persisted to disk so it survives dev server hot-reloads,
// Next.js process restarts, and is shared between local dev and the
// deployed instance reading the same filesystem.
const TOKEN_CACHE_FILE = path.join(process.cwd(), ".guesty-token-cache.json");

interface TokenCacheFile {
  token?: string;
  expiresAt?: number;
  cooldownUntil?: number;
  lastError?: string;
}

async function readTokenCache(): Promise<TokenCacheFile> {
  try {
    return JSON.parse(await fsp.readFile(TOKEN_CACHE_FILE, "utf-8")) as TokenCacheFile;
  } catch {
    return {};
  }
}

async function writeTokenCache(data: TokenCacheFile): Promise<void> {
  try {
    await fsp.writeFile(TOKEN_CACHE_FILE, JSON.stringify(data));
  } catch {
    // best-effort — in-memory cache below still works for this process
  }
}

// Global cache survives Next.js hot reloads in development.
// Promise-based lock prevents concurrent requests from each fetching a new token.
const g = global as typeof global & {
  _guestyBeToken?: string;
  _guestyBeTokenExpiresAt?: number;
  _guestyBeTokenPromise?: Promise<string>;
  _guestyBeAuthCooldownUntil?: number;
  _guestyBeAuthLastError?: string;
};

// Fallback cooldown if Guesty doesn't send a Retry-After header — avoids
// hitting /oauth2/token again on every single incoming request after a
// failure, which would never let the rate limit clear.
const AUTH_RETRY_COOLDOWN_MS = 60 * 1000;

async function getBookingEngineToken(): Promise<string> {
  if (process.env.GUESTY_BE_TOKEN) return process.env.GUESTY_BE_TOKEN;
  if (g._guestyBeToken && Date.now() < (g._guestyBeTokenExpiresAt ?? 0)) return g._guestyBeToken;

  const fileCache = await readTokenCache();

  if (fileCache.token && fileCache.expiresAt && Date.now() < fileCache.expiresAt) {
    g._guestyBeToken = fileCache.token;
    g._guestyBeTokenExpiresAt = fileCache.expiresAt;
    return fileCache.token;
  }

  const cooldownUntil = Math.max(g._guestyBeAuthCooldownUntil ?? 0, fileCache.cooldownUntil ?? 0);
  if (cooldownUntil && Date.now() < cooldownUntil) {
    throw new Error(fileCache.lastError ?? g._guestyBeAuthLastError ?? "Guesty BE auth in cooldown after recent failure");
  }

  if (g._guestyBeTokenPromise) return g._guestyBeTokenPromise;

  g._guestyBeTokenPromise = (async () => {
    const res = await fetch(`${BOOKING_API_BASE}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", accept: "application/json" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "booking_engine:api",
        client_id: process.env.GUESTY_BE_CLIENT_ID!,
        client_secret: process.env.GUESTY_BE_CLIENT_SECRET!,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      g._guestyBeTokenPromise = undefined;
      const retryAfter = Number(res.headers.get("retry-after"));
      const cooldownMs = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : AUTH_RETRY_COOLDOWN_MS;
      g._guestyBeAuthCooldownUntil = Date.now() + cooldownMs;
      g._guestyBeAuthLastError = `Guesty BE auth failed: ${res.status} ${text}`;
      await writeTokenCache({ cooldownUntil: g._guestyBeAuthCooldownUntil, lastError: g._guestyBeAuthLastError });
      throw new Error(g._guestyBeAuthLastError);
    }
    const data = await res.json();
    g._guestyBeToken = data.access_token as string;
    g._guestyBeTokenExpiresAt = Date.now() + (data.expires_in - 300) * 1000;
    g._guestyBeTokenPromise = undefined;
    await writeTokenCache({ token: g._guestyBeToken, expiresAt: g._guestyBeTokenExpiresAt });
    return g._guestyBeToken!;
  })();

  return g._guestyBeTokenPromise;
}

export async function bookingEngineFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = await getBookingEngineToken();
  return fetch(`${BOOKING_API_BASE}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(options.headers ?? {}) },
  });
}
