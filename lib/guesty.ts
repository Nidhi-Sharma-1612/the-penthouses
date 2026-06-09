const BOOKING_API_BASE = "https://booking.guesty.com";

// Global cache survives Next.js hot reloads in development.
// Promise-based lock prevents concurrent requests from each fetching a new token.
const g = global as typeof global & {
  _guestyBeToken?: string;
  _guestyBeTokenExpiresAt?: number;
  _guestyBeTokenPromise?: Promise<string>;
};

async function getBookingEngineToken(): Promise<string> {
  if (process.env.GUESTY_BE_TOKEN) return process.env.GUESTY_BE_TOKEN;
  if (g._guestyBeToken && Date.now() < (g._guestyBeTokenExpiresAt ?? 0)) return g._guestyBeToken;
  if (g._guestyBeTokenPromise) return g._guestyBeTokenPromise;

  g._guestyBeTokenPromise = (async () => {
    const res = await fetch(`${BOOKING_API_BASE}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.GUESTY_BE_CLIENT_ID!,
        client_secret: process.env.GUESTY_BE_CLIENT_SECRET!,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      g._guestyBeTokenPromise = undefined;
      throw new Error(`Guesty BE auth failed: ${res.status} ${text}`);
    }
    const data = await res.json();
    g._guestyBeToken = data.access_token as string;
    g._guestyBeTokenExpiresAt = Date.now() + (data.expires_in - 300) * 1000;
    g._guestyBeTokenPromise = undefined;
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
