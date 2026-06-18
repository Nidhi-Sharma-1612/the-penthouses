import Link from "next/link";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";

export const metadata = { title: "Terms of Service" };

export default async function TermsPage() {
  const content = await getContentBlock("terms", "page", CONTENT_DEFAULTS.terms.page);

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">LEGAL</p>
        <h1 className="font-heading text-5xl mb-8" style={{ fontWeight: 400, color: "rgb(17,17,17)", lineHeight: 1.1 }}>
          {content.title}
        </h1>

        <div className="space-y-8 text-sm font-light leading-relaxed font-body text-muted-foreground">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>
                {section.heading}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>{content.contactHeading}</h2>
            <p>
              {content.contactBody.split("{contact}")[0]}
              <Link href="/contact" className="text-[#C6A355] hover:underline">contact us</Link>
              {content.contactBody.split("{contact}")[1]}
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-muted-foreground font-body">Last updated: {content.lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}
