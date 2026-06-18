import { prisma } from "@/lib/prisma";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";
import FaqAccordion, { type FaqGroup } from "@/components/faq/FaqAccordion";

export default async function FAQPage() {
  const [faqs, intro, cta] = await Promise.all([
    prisma.faq.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
    getContentBlock("faq", "intro", CONTENT_DEFAULTS.faq.intro),
    getContentBlock("faq", "cta", CONTENT_DEFAULTS.faq.cta),
  ]);

  const groups: FaqGroup[] = [];
  for (const faq of faqs) {
    let group = groups.find((g) => g.category === faq.category);
    if (!group) {
      group = { category: faq.category, items: [] };
      groups.push(group);
    }
    group.items.push({ q: faq.question, a: faq.answer });
  }

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Header */}
      <div className="border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            {intro.eyebrow}
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl mb-4"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            {intro.heading}
          </h1>
          <p className="text-muted-foreground font-light leading-relaxed font-body">{intro.body}</p>
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <FaqAccordion groups={groups} />
      </div>

      {/* CTA */}
      <div className="bg-[#FAFAFA] border-y border-gray-100 py-14 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="font-heading text-4xl mb-3"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            {cta.heading}
          </h2>
          <p className="text-muted-foreground font-light mb-8 font-body">
            {cta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-foreground text-white text-[10px] tracking-[0.2em] px-8 py-4 hover:bg-gray-800 transition-colors font-body"
            >
              {cta.button1Label}
            </a>
            <a
              href="/book"
              className="inline-block border border-foreground text-foreground text-[10px] tracking-[0.2em] px-8 py-4 hover:bg-foreground hover:text-white transition-colors font-body"
            >
              {cta.button2Label}
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
