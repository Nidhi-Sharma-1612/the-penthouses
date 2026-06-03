import { Check, X } from "lucide-react";
import Link from "next/link";

const rows = [
  {
    feature: "Service Fees",
    direct: "$0",
    airbnb: "14–16% added",
    vrbo: "6–12% added",
  },
  {
    feature: "Direct Host Communication",
    direct: "Always",
    airbnb: "Via platform only",
    vrbo: "Via platform only",
  },
  {
    feature: "Flexible Check-in",
    direct: "Available on request",
    airbnb: "Fixed times",
    vrbo: "Fixed times",
  },
  {
    feature: "Rate Negotiation",
    direct: "Possible for long stays",
    airbnb: "Not available",
    vrbo: "Not available",
  },
  {
    feature: "Personal Concierge",
    direct: "Included",
    airbnb: "Not available",
    vrbo: "Not available",
  },
  {
    feature: "Custom Requests",
    direct: "Accommodated",
    airbnb: "Limited",
    vrbo: "Limited",
  },
  {
    feature: "Data Privacy",
    direct: "Private",
    airbnb: "Shared with platform",
    vrbo: "Shared with platform",
  },
  {
    feature: "Best Rate",
    direct: "Guaranteed",
    airbnb: "Platform fees added",
    vrbo: "Platform fees added",
  },
];

export default function ComparePage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Header */}
      <div className="border-b border-gray-200 py-14 lg:py-20 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            THE DIRECT ADVANTAGE
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl mb-4"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            Why Book Direct?
          </h1>
          <p className="text-muted-foreground font-light leading-relaxed font-body max-w-lg mx-auto">
            A side-by-side look at the real difference between booking directly
            with us versus through a third-party platform.
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
          <table className="w-full min-w-140">
            <thead>
              <tr>
                <th className="text-left py-4 pr-8 font-body text-[9px] tracking-[0.15em] text-muted-foreground w-1/3">
                  FEATURE
                </th>
                <th className="text-center py-4 px-6 font-body text-[9px] tracking-[0.15em] bg-foreground text-[#C6A355]">
                  BOOK DIRECT
                  <br />
                  <span className="text-white/40 text-[8px]">The Penthouses</span>
                </th>
                <th className="text-center py-4 px-6 font-body text-[9px] tracking-[0.15em] text-muted-foreground">
                  AIRBNB
                </th>
                <th className="text-center py-4 px-6 font-body text-[9px] tracking-[0.15em] text-muted-foreground">
                  VRBO
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}>
                  <td className="py-4 pr-8 text-sm font-light text-foreground font-body">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-center bg-foreground/5 border-x border-gray-900/10">
                    <div className="flex items-center justify-center gap-2">
                      <Check width={14} height={14} className="text-green-700 shrink-0" />
                      <span className="text-[11px] font-body font-medium">{row.direct}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <X width={14} height={14} className="text-red-400 shrink-0" />
                      <span className="text-[11px] text-muted-foreground font-body">{row.airbnb}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <X width={14} height={14} className="text-red-400 shrink-0" />
                      <span className="text-[11px] text-muted-foreground font-body">{row.vrbo}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/book"
            className="inline-block bg-foreground text-white text-[10px] tracking-[0.2em] px-12 py-4 hover:bg-gray-800 transition-colors font-body"
          >
            BOOK DIRECT NOW
          </Link>
        </div>
      </div>

    </div>
  );
}
