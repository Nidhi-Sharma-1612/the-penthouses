import { fetchListing } from "@/lib/listings";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const listing = await fetchListing(id);
    const override = await prisma.listingContent.findUnique({ where: { guestyListingId: id } });

    const merged = {
      ...listing,
      about: override?.description || listing.about,
      images: override?.photoUrls.length ? override.photoUrls : listing.images,
    };

    return NextResponse.json(merged, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
