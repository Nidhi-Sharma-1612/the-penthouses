import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchListings, type ListingCard } from "@/lib/listings";
import { prisma } from "@/lib/prisma";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";

async function getFeatured(): Promise<ListingCard[]> {
  try {
    const all = await fetchListings();
    const overrides = await prisma.listingContent.findMany({ where: { showOnHomepage: true } });

    if (overrides.length === 0) return all.slice(0, 3);

    const orderById = new Map(overrides.map((o) => [o.guestyListingId, o.homepageOrder ?? 0]));
    return all
      .filter((listing) => orderById.has(listing.id))
      .sort((a, b) => orderById.get(a.id)! - orderById.get(b.id)!);
  } catch {
    return [];
  }
}

export default async function FeaturedPenthouses() {
  const [penthouses, header] = await Promise.all([
    getFeatured(),
    getContentBlock("home", "featuredPenthouses", CONTENT_DEFAULTS.home.featuredPenthouses),
  ]);

  return (
    <div style={{ background: "rgb(255, 255, 255)", paddingBottom: "80px" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.18em", fontWeight: 500, color: "rgb(26, 26, 26)", textTransform: "uppercase" }}>
            {header.eyebrow}
          </p>
          <Link
            href="/penthouses"
            className="hover:opacity-60 transition-opacity flex items-center gap-1.5 shrink-0"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 500, color: "rgb(26, 26, 26)", textDecoration: "none" }}
          >
            {header.viewAllLabel}
            <ArrowRight width={13} height={13} strokeWidth={2} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {penthouses.map((ph) => (
            <Link
              key={ph.id}
              href={`/penthouses/${ph.id}`}
              className="group block border border-gray-200 hover:border-gray-300 transition-colors"
              style={{ textDecoration: "none", background: "rgb(255, 255, 255)" }}
            >
              {/* Image */}
              <div style={{ height: "220px", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ph.images[0] ?? "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=85"}
                  alt={ph.name}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.14em", fontWeight: 600, color: "rgb(17, 17, 17)" }}>
                    {ph.name}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.04em", fontWeight: 400, color: "rgb(136, 136, 136)", marginBottom: "3px" }}>
                    {ph.beds} BED &nbsp;|&nbsp; {ph.baths} BATH &nbsp;|&nbsp; {ph.sqft} SQ FT
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 300, color: "rgb(136, 136, 136)" }}>
                    From ${ph.price.toLocaleString()} / night
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgb(198, 163, 85)", marginTop: "3px" }}>
                    Book Direct &amp; Save — ${ph.savingsPerNight}/night
                  </p>
                </div>
                <ArrowRight width={16} height={16} stroke="#bbb" strokeWidth={1.5} className="group-hover:text-[#111] transition-colors shrink-0 ml-3" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
