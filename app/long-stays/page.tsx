import { DollarSign, House, Wifi, Calendar } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    Icon: DollarSign,
    title: "Discounted Monthly Rates",
    desc: "Stays of 30+ nights qualify for significant savings. Contact us for custom monthly pricing tailored to your needs.",
  },
  {
    Icon: House,
    title: "Fully Furnished Living",
    desc: "Move in with nothing but a suitcase. Full kitchen, premium linens, housewares, and everything you need to live comfortably.",
  },
  {
    Icon: Wifi,
    title: "Work From Home Ready",
    desc: "High-speed dedicated WiFi, ample desk space, and a quiet penthouse environment designed for focus and productivity.",
  },
  {
    Icon: Calendar,
    title: "Flexible Terms",
    desc: "Month-to-month arrangements available. No lengthy lease commitments — stay as long as you need, then extend or depart on your timeline.",
  },
];

const guestTypes = [
  "Corporate relocations and project assignments",
  "Entertainment industry productions (film, TV, music tours)",
  "Medical professionals on extended rotations",
  "Families undergoing home renovations",
  "Remote workers seeking a Chicago base",
  "Executives in transition between residences",
  "Athletes during their season or training periods",
  "Legal or consulting professionals on long engagements",
];

export default function LongStaysPage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Hero */}
      <div className="relative h-100 lg:h-125 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&fit=crop"
          alt="Long stay penthouse"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 lg:px-20 text-white max-w-4xl">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            30+ NIGHT STAYS
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl xl:text-7xl mb-4"
            style={{ fontWeight: 400, lineHeight: 1.05 }}
          >
            Your Chicago Home
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>
              For As Long As You Need.
            </em>
          </h1>
          <p className="text-white/75 font-light max-w-lg leading-relaxed font-body">
            Extended stay arrangements at significant savings. Full penthouse
            living with all the privacy, space, and amenities of a permanent
            residence.
          </p>
        </div>
      </div>

      {/* Benefits + Who Stays */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            THE LONG STAY ADVANTAGE
          </p>
          <h2
            className="font-heading text-4xl lg:text-5xl"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            Why Stay for a Month or More
          </h2>
        </div>

        {/* 4-column benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map(({ Icon, title, desc }) => (
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
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Who Stays + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: who stays */}
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
              PERFECT FOR
            </p>
            <h2
              className="font-heading text-4xl mb-8"
              style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
            >
              Who Stays With Us
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {guestTypes.map((item) => (
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
              GET MONTHLY PRICING
            </p>
            <h3
              className="font-heading text-3xl mb-3"
              style={{ fontWeight: 400, lineHeight: 1.1 }}
            >
              Custom Rates for Long Stays
            </h3>
            <p className="text-white/60 font-light text-sm leading-relaxed mb-8 font-body">
              Monthly rates are priced individually based on unit, timing, and
              length of stay. Contact us directly to receive a personalized
              quote within a few hours.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#C6A355] text-foreground text-[10px] tracking-[0.15em] font-semibold px-8 py-4 hover:bg-[#D4B675] transition-colors font-body"
            >
              REQUEST MONTHLY PRICING
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
