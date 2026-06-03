import Link from "next/link";

export default function Hero() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: "calc(100vh - 64px)",
        minHeight: "480px",
        maxHeight: "680px",
      }}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/f8ab9408a_5506croppedmainphoto.jpg"
        alt="Chicago penthouse living room with skyline and lake views"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 35%" }}
      />

      {/* Gradient overlay — full on mobile (readable over image), fades right on desktop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.60) 60%, rgba(0,0,0,0.20) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 lg:px-14 max-w-2xl">
        {/* Eyebrow */}
        <p
          className="mb-4"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.22em",
            fontWeight: 500,
            color: "rgb(255,255,255)",
            textTransform: "uppercase",
          }}
        >
          50+ Floors Above River North
        </p>

        {/* Headline */}
        <h1
          className="mb-5"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: "clamp(34px, 5.5vw, 68px)",
            fontWeight: 500,
            color: "rgb(255,255,255)",
            lineHeight: 1.05,
          }}
        >
          Luxury Penthouses.
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>Unrivaled</em> Views.
        </h1>

        {/* Description */}
        <p
          className="mb-8 max-w-sm"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.7,
          }}
        >
          Extraordinary penthouses with sweeping skyline and lake views, impeccable
          design, and all the space you need to live exceptionally.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/penthouses"
            className="bg-[#111] text-white hover:bg-[#333] transition-colors"
            style={{
              display: "inline-block",
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.16em",
              fontWeight: 500,
              padding: "13px 18px",
              textDecoration: "none",
            }}
          >
            VIEW PENTHOUSES
          </Link>
          <Link
            href="/book"
            className="text-white border border-white hover:bg-white hover:text-black transition-colors"
            style={{
              display: "inline-block",
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.16em",
              fontWeight: 500,
              padding: "13px 18px",
              textDecoration: "none",
            }}
          >
            BOOK DIRECT
          </Link>
        </div>
      </div>
    </div>
  );
}
