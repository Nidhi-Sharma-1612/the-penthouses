export const dynamic = "force-dynamic";

import { fetchListings, type ListingCard } from "@/lib/listings";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";
import PenthousesClient from "./PenthousesClient";

export default async function PenthousesPage() {
  let listings: ListingCard[] = [];
  try {
    listings = await fetchListings();
  } catch {
    // fallback to empty — client shows "no residences" message
  }
  const header = await getContentBlock("penthouses", "header", CONTENT_DEFAULTS.penthouses.header);
  return <PenthousesClient listings={listings} header={header} />;
}
