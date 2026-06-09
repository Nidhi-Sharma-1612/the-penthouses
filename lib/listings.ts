import { bookingEngineFetch } from "./guesty";

// In-memory cache — survives across requests within the same server process.
const cache = global as typeof global & {
  _listingsCache?: { data: ListingCard[]; expiresAt: number };
  _listingCache?: Record<string, { data: ListingDetail; expiresAt: number }>;
  _calendarCache?: Record<string, { data: { days: CalendarDay[]; totalPrice: number }; expiresAt: number }>;
};

const LISTINGS_TTL  = 5 * 60 * 1000;   // 5 min — listing info rarely changes
const CALENDAR_TTL  = 10 * 60 * 1000;  // 10 min — availability changes more often

export interface ListingCard {
  id: string;
  name: string;
  floor: string;
  beds: number;
  baths: number;
  sqft: string;
  maxGuests: number;
  price: number;
  savingsPerNight: number;
  images: string[];
  badges: string[];
  about: string;
  amenities: string[];
}

export interface ListingDetail extends ListingCard {
  cleaningFee: number;
  space: string;
}

const SQFT_FALLBACK: Record<string, string> = {
  "5506": "2,200", "5304": "2,500", "5301": "2,500", "5108": "1,950",
  "5207": "1,050", "5302": "1,250", "5107": "1,050", "5203": "1,050",
  "5206": "850",   "5006": "750",   "5005": "690",
};

interface GuestyListing {
  _id: string;
  title: string;
  nickname?: string;
  bedrooms: number;
  bathrooms: number;
  accommodates: number;
  pictures: { original: string }[];
  prices: { basePrice: number; cleaningFee?: number };
  publicDescription: { summary?: string; space?: string };
  amenities: string[];
  areaSquareFeet?: number;
}

export function getFloor(title: string): string {
  const match = title.match(/(\d+(?:st|nd|rd|th)?)\s*[Ff]loor/i);
  if (match) return `${match[1]} Floor`;
  if (/2-story|two-story/i.test(title)) return "Multi-Floor Duplex";
  return "";
}

export function getBadges(r: { title: string; amenities: string[] }): string[] {
  const title = r.title?.toLowerCase() ?? "";
  const amenities = r.amenities ?? [];
  const badges: string[] = [];
  if (title.includes("2-story") || title.includes("two-story")) badges.push("TWO-STORY");
  if (title.includes("fireplace") || amenities.some((a) => a.toLowerCase().includes("fireplace"))) badges.push("FIREPLACE");
  if (title.includes("lake") || amenities.some((a) => a.toLowerCase() === "lake")) badges.push("LAKE VIEW");
  if (title.includes("balcony") || amenities.some((a) => a.toLowerCase().includes("balcony") || a.toLowerCase().includes("patio"))) badges.push("BALCONY");
  return badges;
}

function mapCard(r: GuestyListing): ListingCard {
  return {
    id: r._id,
    name: r.title,
    floor: getFloor(r.title),
    beds: r.bedrooms ?? 0,
    baths: r.bathrooms ?? 0,
    sqft: r.areaSquareFeet
      ? r.areaSquareFeet.toLocaleString()
      : (SQFT_FALLBACK[r.nickname ?? ""] ?? ""),
    maxGuests: r.accommodates ?? 2,
    price: r.prices?.basePrice ?? 0,
    savingsPerNight: Math.round((r.prices?.basePrice ?? 0) * 0.15),
    images: (r.pictures ?? []).map((p) => p.original).filter(Boolean),
    badges: getBadges(r),
    about: r.publicDescription?.summary ?? "",
    amenities: r.amenities ?? [],
  };
}

function mapDetail(r: GuestyListing): ListingDetail {
  return {
    ...mapCard(r),
    cleaningFee: r.prices?.cleaningFee ?? 0,
    space: r.publicDescription?.space ?? "",
  };
}

export async function fetchListings(): Promise<ListingCard[]> {
  if (cache._listingsCache && Date.now() < cache._listingsCache.expiresAt) {
    return cache._listingsCache.data;
  }
  const res = await bookingEngineFetch("/api/listings?limit=50");
  if (!res.ok) throw new Error(`Guesty listings failed: ${res.status}`);
  const data = await res.json();
  const listings = (data.results as GuestyListing[]).map(mapCard);
  cache._listingsCache = { data: listings, expiresAt: Date.now() + LISTINGS_TTL };
  return listings;
}

export async function fetchListing(id: string): Promise<ListingDetail> {
  cache._listingCache ??= {};
  const cached = cache._listingCache[id];
  if (cached && Date.now() < cached.expiresAt) return cached.data;

  // Warm the list cache if empty — one Guesty call serves all 11 detail pages.
  if (!cache._listingsCache || Date.now() >= cache._listingsCache.expiresAt) {
    await fetchListings();
  }
  const listCached = cache._listingsCache;
  if (listCached && Date.now() < listCached.expiresAt) {
    const match = listCached.data.find((l) => l.id === id);
    if (match) {
      const detail: ListingDetail = { ...match, cleaningFee: 0, space: "" };
      cache._listingCache[id] = { data: detail, expiresAt: listCached.expiresAt };
      return detail;
    }
  }

  // Fallback: fetch individual listing only if not found in list.
  const res = await bookingEngineFetch(`/api/listings/${id}`);
  if (!res.ok) throw new Error(`Guesty listing ${id} failed: ${res.status}`);
  const r = await res.json();
  const detail = mapDetail(r);
  cache._listingCache[id] = { data: detail, expiresAt: Date.now() + LISTINGS_TTL };
  return detail;
}

export interface CalendarDay {
  date: string;
  available: boolean;
  price: number | null;
}

export async function fetchCalendar(
  id: string,
  checkIn: string,
  checkOut: string
): Promise<{ days: CalendarDay[]; totalPrice: number }> {
  cache._calendarCache ??= {};
  const key = `${id}|${checkIn}|${checkOut}`;
  const cached = cache._calendarCache[key];
  if (cached && Date.now() < cached.expiresAt) return cached.data;
  const res = await bookingEngineFetch(
    `/api/listings/${id}/calendar?from=${checkIn}&to=${checkOut}`
  );
  if (!res.ok) throw new Error(`Guesty calendar failed: ${res.status}`);
  const data = await res.json();

  const days: CalendarDay[] = (Array.isArray(data) ? data : []).map(
    (d: { date: string; status: string; price?: number }) => ({
      date: d.date,
      available: d.status === "available",
      price: d.price ?? null,
    })
  );

  const totalPrice = days
    .filter((d) => d.available && d.price)
    .reduce((sum, d) => sum + (d.price ?? 0), 0);

  const result = { days, totalPrice };
  cache._calendarCache![key] = { data: result, expiresAt: Date.now() + CALENDAR_TTL };
  return result;
}
