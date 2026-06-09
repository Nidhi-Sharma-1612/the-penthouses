import { bookingEngineFetch } from "./guesty";

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
  const res = await bookingEngineFetch("/api/listings?limit=50");
  if (!res.ok) throw new Error(`Guesty listings failed: ${res.status}`);
  const data = await res.json();
  return (data.results as GuestyListing[]).map(mapCard);
}

export async function fetchListing(id: string): Promise<ListingDetail> {
  const res = await bookingEngineFetch(`/api/listings/${id}`);
  if (!res.ok) throw new Error(`Guesty listing ${id} failed: ${res.status}`);
  const r = await res.json();
  return mapDetail(r);
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

  return { days, totalPrice };
}
