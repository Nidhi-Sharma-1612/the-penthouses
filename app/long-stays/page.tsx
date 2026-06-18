import { DollarSign, House, Wifi, Calendar } from "lucide-react";
import Link from "next/link";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";

const BENEFIT_ICONS = [DollarSign, House, Wifi, Calendar];

export default async function LongStaysPage() {
  const [hero, benefitsBlock, whoStays, cta] = await Promise.all([
    getContentBlock("long-stays", "hero", CONTENT_DEFAULTS["long-stays"].hero),
    getContentBlock("long-stays", "benefits", CONTENT_DEFAULTS["long-stays"].benefits),
    getContentBlock("long-stays", "whoStays", CONTENT_DEFAULTS["long-stays"].whoStays),
    getContentBlock("long-stays", "cta", CONTENT_DEFAULTS["long-stays"].cta),
  ]);
  const benefits = benefitsBlock.benefits.map((b, i) => ({ ...b, Icon: BENEFIT_ICONS[i] ?? DollarSign }));

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Hero */}
      <div className="relative h-100 lg:h-125 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.image}
          alt="Long stay penthouse"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 lg:px-20 text-white max-w-4xl">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            {hero.eyebrow}
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl xl:text-7xl mb-4"
            style={{ fontWeight: 400, lineHeight: 1.05 }}
          >
            {hero.heading}
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>
              {hero.headingEmphasis}
            </em>
          </h1>
          <p className="text-white/75 font-light max-w-lg leading-relaxed font-body">
            {hero.body}
          </p>
        </div>
      </div>

      {/* Benefits + Who Stays */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            {benefitsBlock.eyebrow}
          </p>
          <h2
            className="font-heading text-4xl lg:text-5xl"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            {benefitsBlock.heading}
          </h2>
        </div>

        {/* 4-column benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map(({ Icon, title, description }) => (
            <div key={title} className="p-6 border border-gray-100">
              <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-4">
                <Icon width={18} height={18} strokeWidth={1.5} className="text-[#C6A355]" />
              </div>
              <h3
                className="font-heading text-xl mb-2"
                style={{ fontWeight: 400, color: "rgb(17, 17, 17)" }}
              >
                {title}
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed font-body">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Who Stays + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: who stays */}
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
              {whoStays.eyebrow}
            </p>
            <h2
              className="font-heading text-4xl mb-8"
              style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
            >
              {whoStays.heading}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {whoStays.items.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#C6A355] rounded-full shrink-0" />
                  <span className="text-[15px] text-foreground font-light font-body">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: dark CTA box */}
          <div className="bg-foreground text-white p-10">
            <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-4 font-body">
              {cta.eyebrow}
            </p>
            <h3
              className="font-heading text-3xl mb-3"
              style={{ fontWeight: 400, lineHeight: 1.1 }}
            >
              {cta.heading}
            </h3>
            <p className="text-white/60 font-light text-sm leading-relaxed mb-8 font-body">
              {cta.body}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#C6A355] text-foreground text-[10px] tracking-[0.15em] font-semibold px-8 py-4 hover:bg-[#D4B675] transition-colors font-body"
            >
              {cta.buttonLabel}
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
