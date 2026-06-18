import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";

function StarRow({ size }: { size: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          strokeWidth={2}
          style={{ fill: "#C6A355", color: "#C6A355" }}
        />
      ))}
    </>
  );
}

export default async function Testimonials() {
  const [rows, header] = await Promise.all([
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    getContentBlock("home", "testimonialsHeader", CONTENT_DEFAULTS.home.testimonialsHeader),
  ]);
  const testimonials = rows.map((t) => ({ quote: t.quote, name: t.name, unit: t.propertyLabel ?? "" }));

  return (
    <section className="py-16 lg:py-24" style={{ background: "rgb(250, 250, 250)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              fontWeight: 400,
              color: "rgb(198, 163, 85)",
              textTransform: "uppercase",
            }}
          >
            {header.eyebrow}
          </p>

          <h2
            className="text-4xl lg:text-5xl"
            style={{
              fontFamily: "var(--font-heading), serif",
              fontWeight: 400,
              color: "rgb(17, 17, 17)",
            }}
          >
            {header.heading}
          </h2>

          {/* Stars + rating */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <StarRow size={14} />
            <span
              className="text-sm ml-2"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                color: "rgb(107, 114, 128)",
                fontWeight: 400,
              }}
            >
              {header.ratingLabel}
            </span>
          </div>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white p-8 border border-gray-100">

              {/* Card stars */}
              <div className="flex gap-1 mb-4">
                <StarRow size={12} />
              </div>

              {/* Quote */}
              <p
                className="leading-relaxed mb-6"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "15px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "rgb(17, 17, 17)",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Footer */}
              <div className="border-t border-gray-100 pt-5">
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    color: "rgb(17, 17, 17)",
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "11px",
                    fontWeight: 300,
                    color: "rgb(107, 114, 128)",
                  }}
                >
                  {t.unit}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
