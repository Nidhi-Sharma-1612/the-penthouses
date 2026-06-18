import { Check, X } from "lucide-react";
import Link from "next/link";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";
import { prisma } from "@/lib/prisma";

export default async function ComparePage() {
  const [hero, tableLabels, rows] = await Promise.all([
    getContentBlock("compare", "hero", CONTENT_DEFAULTS.compare.hero),
    getContentBlock("compare", "tableLabels", CONTENT_DEFAULTS.compare.tableLabels),
    prisma.compareRow.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Header */}
      <div className="border-b border-gray-200 py-14 lg:py-20 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            {hero.eyebrow}
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl mb-4"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            {hero.heading}
          </h1>
          <p className="text-muted-foreground font-light leading-relaxed font-body max-w-lg mx-auto">
            {hero.body}
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
                  {tableLabels.featureLabel}
                </th>
                <th className="text-center py-4 px-6 font-body text-[9px] tracking-[0.15em] bg-foreground text-[#C6A355]">
                  {tableLabels.directLabel}
                  <br />
                  <span className="text-white/40 text-[8px]">{tableLabels.directSubLabel}</span>
                </th>
                <th className="text-center py-4 px-6 font-body text-[9px] tracking-[0.15em] text-muted-foreground">
                  {tableLabels.airbnbLabel}
                </th>
                <th className="text-center py-4 px-6 font-body text-[9px] tracking-[0.15em] text-muted-foreground">
                  {tableLabels.vrboLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} className={i % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}>
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
            {tableLabels.ctaButtonLabel}
          </Link>
        </div>
      </div>

    </div>
  );
}
