import { fetchListings } from "@/lib/listings";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const listings = await fetchListings();
    return NextResponse.json(listings, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
