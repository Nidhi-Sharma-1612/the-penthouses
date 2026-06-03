"use client";

import { useState } from "react";
import { SlidersHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";

const filterTags = ["ALL UNITS", "TWO-STORY", "FIREPLACE", "LAKE VIEW", "BALCONY"] as const;
type FilterTag = (typeof filterTags)[number];

const penthouses = [
  {
    id: "5506",
    name: "Penthouse #1",
    image: "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/228ed6e14_03_540NStateSt_5506_1_LivingRoom_HiRes.jpg",
    badges: ["TWO-STORY", "FIREPLACE", "LAKE VIEW"],
    beds: 3, baths: 2, sqft: "2,200",
    price: "$899", save: "$135",
  },
  {
    id: "5304",
    name: "Penthouse #2",
    image: "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/90b8bd01c_35_540NStateSt_Unit5304_2075_HiRes.jpg",
    badges: ["TWO-STORY", "FIREPLACE", "LAKE VIEW"],
    beds: 2, baths: 3, sqft: "2,500",
    price: "$799", save: "$120",
  },
  {
    id: "5301",
    name: "Penthouse #3",
    image: "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/d469ba0f3_ChatGPTImageJan30202603_14_31PM.png",
    badges: ["TWO-STORY", "FIREPLACE", "LAKE VIEW"],
    beds: 2, baths: 3, sqft: "2,500",
    price: "$799", save: "$120",
  },
  {
    id: "5108",
    name: "Penthouse #4",
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=85&fit=crop",
    badges: ["TWO-STORY", "FIREPLACE", "LAKE VIEW"],
    beds: 2, baths: 2, sqft: "1,950",
    price: "$799", save: "$120",
  },
  {
    id: "5207",
    name: "Penthouse #5",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=85&fit=crop",
    badges: ["FIREPLACE", "LAKE VIEW"],
    beds: 1, baths: 1, sqft: "1,050",
    price: "$399", save: "$60",
  },
  {
    id: "5302",
    name: "Penthouse #6",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=85&fit=crop",
    badges: [] as string[],
    beds: 2, baths: 2, sqft: "1,250",
    price: "$699", save: "$105",
  },
  {
    id: "5107",
    name: "Penthouse #7",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=85&fit=crop",
    badges: ["FIREPLACE", "LAKE VIEW"],
    beds: 1, baths: 1, sqft: "1,050",
    price: "$399", save: "$60",
  },
  {
    id: "5203",
    name: "Penthouse #9",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=85&fit=crop",
    badges: ["FIREPLACE", "LAKE VIEW"],
    beds: 1, baths: 1, sqft: "1,050",
    price: "$399", save: "$60",
  },
  {
    id: "5206",
    name: "Penthouse #10",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=85&fit=crop",
    badges: ["LAKE VIEW"],
    beds: 1, baths: 1, sqft: "850",
    price: "$299", save: "$45",
  },
  {
    id: "5006",
    name: "Penthouse #11",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85&fit=crop",
    badges: [] as string[],
    beds: 1, baths: 1, sqft: "750",
    price: "$249", save: "$37",
  },
  {
    id: "5005",
    name: "Penthouse #12",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=85&fit=crop",
    badges: [] as string[],
    beds: 0, baths: 1, sqft: "690",
    price: "$239", save: "$36",
  },
];

export default function PenthousesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("ALL UNITS");

  const filtered =
    activeFilter === "ALL UNITS"
      ? penthouses
      : penthouses.filter((ph) => ph.badges.includes(activeFilter));

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Header — py-14 lg:py-20 matches original */}
      <div className="border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgb(198, 163, 85)",
            }}
          >
            RIVER NORTH, CHICAGO
          </p>
          <h1
            className="text-5xl lg:text-6xl mb-4"
            style={{
              fontFamily: "var(--font-heading), serif",
              fontWeight: 400,
              color: "rgb(17, 17, 17)",
              lineHeight: 1.1,
            }}
          >
            The Penthouse Collection
          </h1>
          <p
            className="max-w-lg leading-relaxed"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 300,
              color: "rgb(71, 85, 105)",
            }}
          >
            Eleven extraordinary residences, each uniquely positioned above the
            city. From intimate two-bedroom sanctuaries to expansive two-story
            penthouses.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="border-b border-gray-200 bg-white sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center gap-2 overflow-x-auto">
          <SlidersHorizontal
            width={14}
            height={14}
            className="lucide lucide-sliders-horizontal text-muted-foreground shrink-0 mr-2"
          />
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

      {/* Grid — py-12 matches original */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
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
                  src={ph.image}
                  alt={ph.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {ph.badges.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    {ph.badges.map((badge) => (
                      <span
                        key={badge}
                        className="bg-white/90 px-2 py-1"
                        style={{
                          fontFamily: "var(--font-body), sans-serif",
                          fontSize: "8px",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                          color: "rgb(10, 11, 13)",
                        }}
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
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        fontWeight: 600,
                        color: "rgb(10, 11, 13)",
                      }}
                    >
                      {ph.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: "11px",
                        fontWeight: 300,
                        color: "rgb(107, 114, 128)",
                      }}
                    >
                      {ph.beds} BED &nbsp;|&nbsp; {ph.baths} BATH &nbsp;|&nbsp; {ph.sqft} SQ FT
                    </p>
                    <p
                      className="mt-1"
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: "11px",
                        fontWeight: 300,
                        color: "rgb(107, 114, 128)",
                      }}
                    >
                      From {ph.price} / night
                    </p>
                    <p
                      className="mt-0.5"
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: "10px",
                        color: "rgb(198, 163, 85)",
                      }}
                    >
                      Book Direct &amp; Save — {ph.save} per night
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
      </div>

    </div>
  );
}
