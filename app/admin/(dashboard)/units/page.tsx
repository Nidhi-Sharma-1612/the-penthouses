import Link from "next/link";
import { fetchListings } from "@/lib/listings";
import { prisma } from "@/lib/prisma";
import DataTable from "@/components/admin/DataTable";
import { syncListingsFromGuesty } from "./actions";

export default async function AdminUnitsPage() {
  const [listings, overrides] = await Promise.all([
    fetchListings(),
    prisma.listingContent.findMany(),
  ]);

  const overrideByListingId = new Map(overrides.map((o) => [o.guestyListingId, o]));

  const rows = listings.map((listing) => ({
    listing,
    override: overrideByListingId.get(listing.id) ?? null,
  }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-xl font-semibold text-foreground">Units</h1>
        <form action={syncListingsFromGuesty}>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-foreground text-white rounded-md hover:bg-text-primary cursor-pointer"
          >
            Sync from Guesty
          </button>
        </form>
      </div>

      <DataTable
        rows={rows}
        getRowKey={(row) => row.listing.id}
        emptyMessage="No listings yet — click Sync from Guesty."
        columns={[
          { header: "Name", cell: (row) => row.listing.name },
          { header: "Guesty ID", cell: (row) => <span className="text-muted-foreground">{row.listing.id}</span> },
          {
            header: "Homepage",
            cell: (row) => (row.override?.showOnHomepage ? "Yes" : "No"),
          },
          {
            header: "Order",
            cell: (row) => row.override?.homepageOrder ?? "—",
          },
          {
            header: "",
            cell: (row) => (
              <Link href={`/admin/units/${row.listing.id}`} className="text-foreground underline">
                Edit
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
