import Link from "next/link";
import { ArrowRight } from "lucide-react";

const penthouses = [
  {
    id: "5506",
    name: "Penthouse #1",
    details: "3 BED |  2 BATH |  2,200 SQ FT",
    price: "From $899 / night",
    saving: "Book Direct & Save — $135 per night",
    image:
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/228ed6e14_03_540NStateSt_5506_1_LivingRoom_HiRes.jpg",
    alt: "Penthouse #1",
  },
  {
    id: "5304",
    name: "Penthouse #2",
    details: "2 BED |  3 BATH |  2,500 SQ FT",
    price: "From $799 / night",
    saving: "Book Direct & Save — $120 per night",
    image:
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/90b8bd01c_35_540NStateSt_Unit5304_2075_HiRes.jpg",
    alt: "Penthouse #2",
  },
  {
    id: "5301",
    name: "Penthouse #3",
    details: "2 BED |  3 BATH |  2,500 SQ FT",
    price: "From $799 / night",
    saving: "Book Direct & Save — $120 per night",
    image:
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/d469ba0f3_ChatGPTImageJan30202603_14_31PM.png",
    alt: "Penthouse #3",
  },
];

export default function FeaturedPenthouses() {
  return (
    <div style={{ background: "rgb(255, 255, 255)", paddingBottom: "80px" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.18em",
              fontWeight: 500,
              color: "rgb(26, 26, 26)",
              textTransform: "uppercase",
            }}
          >
            Penthouses Designed for the Way You Live
          </p>

          <Link
            href="/penthouses"
            className="hover:opacity-60 transition-opacity flex items-center gap-1.5 shrink-0"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.12em",
              fontWeight: 500,
              color: "rgb(26, 26, 26)",
              textDecoration: "none",
            }}
          >
            VIEW ALL PENTHOUSES
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
                  src={ph.image}
                  alt={ph.alt}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>

              {/* Content row */}
              <div className="flex items-center justify-between p-4">
                <div>
                  <p
                    className="mb-1"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      fontWeight: 600,
                      color: "rgb(17, 17, 17)",
                    }}
                  >
                    {ph.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.04em",
                      fontWeight: 400,
                      color: "rgb(136, 136, 136)",
                      marginBottom: "3px",
                    }}
                  >
                    {ph.details}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: 300,
                      color: "rgb(136, 136, 136)",
                    }}
                  >
                    {ph.price}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      color: "rgb(198, 163, 85)",
                      marginTop: "3px",
                    }}
                  >
                    {ph.saving}
                  </p>
                </div>

                <ArrowRight
                  width={16}
                  height={16}
                  stroke="#bbb"
                  strokeWidth={1.5}
                  className="group-hover:text-[#111] transition-colors shrink-0 ml-3"
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
