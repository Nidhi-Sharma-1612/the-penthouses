import Link from "next/link";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";

export default async function GrandPlazaExperience() {
  const content = await getContentBlock(
    "home",
    "grandPlazaExperience",
    CONTENT_DEFAULTS.home.grandPlazaExperience
  );

  return (
    <div style={{ background: "rgb(255, 255, 255)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <p
              className="mb-4"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                fontWeight: 500,
                color: "rgb(198, 163, 85)",
                textTransform: "uppercase",
              }}
            >
              {content.eyebrow}
            </p>

            <h2
              className="mb-5"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(32px, 3.5vw, 58px)",
                fontWeight: 400,
                color: "rgb(17, 17, 17)",
                lineHeight: 1.08,
              }}
            >
              {content.heading}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>
                {content.headingEmphasis}
              </em>
            </h2>

            <p
              className="mb-8 max-w-md"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgb(102, 102, 102)",
                lineHeight: 1.75,
              }}
            >
              {content.body}
            </p>

            <Link
              href="/penthouses"
              className="text-[#111] border border-[#111] hover:bg-[#111] hover:text-white transition-colors"
              style={{
                display: "inline-block",
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.16em",
                fontWeight: 500,
                padding: "13px 22px",
                textDecoration: "none",
              }}
            >
              {content.buttonLabel}
            </Link>
          </div>

          {/* Right: Image */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.image}
              alt="Grand Plaza penthouse living and dining space"
              className="w-full object-cover"
              style={{ height: "clamp(280px, 40vw, 480px)", display: "block" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
