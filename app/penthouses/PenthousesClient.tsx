"use client";

import { useState } from "react";
import { SlidersHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ListingCard } from "@/lib/listings";

const filterTags = ["ALL UNITS", "TWO-STORY", "FIREPLACE", "LAKE VIEW", "BALCONY"] as const;
type FilterTag = (typeof filterTags)[number];

interface PenthousesHeader {
  eyebrow: string;
  heading: string;
  body?: string;
}

export default function PenthousesClient({
  listings,
  header,
}: {
  listings: ListingCard[];
  header: PenthousesHeader;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("ALL UNITS");

  const filtered =
    activeFilter === "ALL UNITS"
      ? listings
      : listings.filter((ph) => ph.badges.includes(activeFilter));

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Header */}
      <div className="border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="mb-3" style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgb(198, 163, 85)" }}>
            {header.eyebrow}
          </p>
          <h1 className="text-5xl lg:text-6xl mb-4" style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}>
            {header.heading}
          </h1>
          <p className="max-w-lg leading-relaxed" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 300, color: "rgb(71, 85, 105)" }}>
            {header.body}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center gap-2 overflow-x-auto">
          <SlidersHorizontal width={14} height={14} className="text-muted-foreground shrink-0 mr-2" />
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`shrink-0 text-[9px] tracking-[0.15em] px-4 py-2 border transition-colors font-body cursor-pointer ${
                activeFilter === tag
                  ? "bg-foreground text-white border-foreground"
                  : "border-gray-300 text-foreground hover:border-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-muted-foreground shrink-0 font-body">
            {filtered.length} residences
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground font-body py-20">No penthouses match this filter.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ph) => (
              <Link
                key={ph.id}
                href={`/penthouses/${ph.id}`}
                className="group block bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300"
                style={{ textDecoration: "none" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-72">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ph.images[0] ?? "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=85"}
                    alt={ph.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {ph.badges.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {ph.badges.map((badge) => (
                        <span
                          key={badge}
                          className="bg-white/90 px-2 py-1"
                          style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "8px", letterSpacing: "0.1em", fontWeight: 600, color: "rgb(10, 11, 13)" }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="mb-1" style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "10px", letterSpacing: "0.15em", fontWeight: 600, color: "rgb(10, 11, 13)" }}>
                        {ph.name}
                      </p>
                      <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "11px", fontWeight: 300, color: "rgb(107, 114, 128)" }}>
                        {ph.beds} BED &nbsp;|&nbsp; {ph.baths} BATH &nbsp;|&nbsp; {ph.sqft} SQ FT
                      </p>
                      <p className="mt-1" style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "11px", fontWeight: 300, color: "rgb(107, 114, 128)" }}>
                        From ${ph.price.toLocaleString()} / night
                      </p>
                      <p className="mt-0.5" style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "10px", color: "rgb(198, 163, 85)" }}>
                        Book Direct &amp; Save — ${ph.savingsPerNight} per night
                      </p>
                    </div>
                    <ArrowRight
                      width={16}
                      height={16}
                      className="mt-0.5 shrink-0 transition-all group-hover:translate-x-1 text-[#6B7280] group-hover:text-[#0A0B0D]"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
