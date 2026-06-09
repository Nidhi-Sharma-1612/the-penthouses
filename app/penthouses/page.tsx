import { fetchListings, type ListingCard } from "@/lib/listings";
import PenthousesClient from "./PenthousesClient";

export default async function PenthousesPage() {
  let listings: ListingCard[] = [];
  try {
    listings = await fetchListings();
  } catch {
    // fallback to empty — client shows "no residences" message
  }
  return <PenthousesClient listings={listings} />;
}
