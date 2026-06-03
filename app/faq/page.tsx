"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqGroups = [
  {
    category: "BOOKING",
    items: [
      {
        q: "Why should I book direct instead of Airbnb or VRBO?",
        a: "Booking directly with us means zero platform service fees, which saves you 10–15% compared to third-party sites. You also get direct access to our team, flexible check-in options, and the best available rate — guaranteed.",
      },
      {
        q: "How do I make a reservation?",
        a: "Submit a booking request through our Book Direct page. We'll confirm availability and send a reservation agreement within a few hours. Payment is collected via secure link.",
      },
      {
        q: "What is the minimum stay?",
        a: "Our standard minimum stay is 2 nights. For long stays of 30+ nights, special monthly pricing is available — contact us directly for a personalized quote.",
      },
      {
        q: "Is there a security deposit?",
        a: "Yes. A refundable security deposit is required at booking. It is returned within 7 business days of checkout, provided there is no damage beyond normal wear and tear.",
      },
    ],
  },
  {
    category: "THE PENTHOUSES",
    items: [
      {
        q: "How many units do you have?",
        a: "We manage 11 exclusive penthouse residences within Grand Plaza — each with its own layout, floor plan, and views. No two units are identical.",
      },
      {
        q: "Are all units the same?",
        a: "No. Units range from intimate one-bedroom residences to expansive two-story penthouses. Some feature fireplaces, private balconies, lake views, or two-floor layouts. Browse the Penthouse Collection to compare.",
      },
      {
        q: "What building amenities are included?",
        a: "All guests have access to Grand Plaza's amenities: 24-hour door staff, fitness center, indoor pool, concierge services, and secure building access. Parking is available for an additional fee.",
      },
      {
        q: "Is there a grocery store in the building?",
        a: "Yes — there is a full Jewel-Osco grocery store located inside the building, accessible without going outside. This is one of the most convenient features for long-stay guests.",
      },
    ],
  },
  {
    category: "POLICIES",
    items: [
      {
        q: "What is your cancellation policy?",
        a: "Cancellations made 14 or more days before check-in receive a full refund. Cancellations within 14 days are non-refundable. We recommend travel insurance for added flexibility.",
      },
      {
        q: "Are pets allowed?",
        a: "Pets are not permitted in any of our penthouse residences. This policy is enforced by building management and cannot be waived.",
      },
      {
        q: "What are the check-in and check-out times?",
        a: "Standard check-in is at 4:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available on request, subject to availability — just reach out to our team in advance.",
      },
      {
        q: "Are events or parties permitted?",
        a: "Events, parties, and gatherings beyond the registered guest count are not permitted. Our units are private residences in an occupied residential building and must be treated accordingly.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-start justify-between w-full py-5 text-left gap-4 cursor-pointer"
      >
        <span className="text-[15px] font-light text-foreground font-body">{q}</span>
        {open
          ? <X width={16} height={16} className="shrink-0 mt-0.5 text-muted-foreground" />
          : <Plus width={16} height={16} className="shrink-0 mt-0.5 text-muted-foreground" />
        }
      </button>
      {open && (
        <p className="pb-5 text-sm text-muted-foreground font-light leading-relaxed font-body">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Header */}
      <div className="border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl mb-4"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            Everything You Need to Know
          </h1>
          <p className="text-muted-foreground font-light leading-relaxed font-body">
            If you don&apos;t find your answer here, contact us directly — we
            respond to all inquiries within a few hours.
          </p>
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        {faqGroups.map(({ category, items }) => (
          <div key={category} className="mb-12">
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground mb-6 font-body">
              {category}
            </p>
            {items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#FAFAFA] border-y border-gray-100 py-14 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="font-heading text-4xl mb-3"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground font-light mb-8 font-body">
            Our team is available 7 days a week. Reach out directly and expect a fast, personal response.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-foreground text-white text-[10px] tracking-[0.2em] px-8 py-4 hover:bg-gray-800 transition-colors font-body"
            >
              CONTACT US
            </a>
            <a
              href="/book"
              className="inline-block border border-foreground text-foreground text-[10px] tracking-[0.2em] px-8 py-4 hover:bg-foreground hover:text-white transition-colors font-body"
            >
              BOOK DIRECT
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
