import Link from "next/link";
import { HelpCircle, MessageSquareQuote, Layers, History } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ADMIN_PAGES, getAdminPage } from "@/lib/adminPages";

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `${dd}/${mm}/${yyyy}, ${time}`;
}

export default async function AdminDashboardPage() {
  const [faqCount, testimonialCount, recentBlocks] = await Promise.all([
    prisma.faq.count(),
    prisma.testimonial.count(),
    prisma.contentBlock.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);

  const pageCount = ADMIN_PAGES.length;
  const sectionCount = ADMIN_PAGES.reduce((sum, p) => sum + p.sections.length, 0);

  const cards = [
    { label: "Testimonials", value: testimonialCount, href: "/admin/content/testimonials", icon: MessageSquareQuote },
    { label: "FAQs", value: faqCount, href: "/admin/content/faqs", icon: HelpCircle },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground mb-6" style={{ fontWeight: 400 }}>
        Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link
          href="/admin/pages"
          className="block rounded-lg border border-border bg-white p-5 hover:border-[#C6A355] transition-colors"
        >
          <Layers size={18} strokeWidth={1.75} className="text-[#C6A355] mb-2" />
          <p className="text-sm text-muted-foreground">Pages</p>
          <p className="text-2xl font-semibold text-foreground mt-1">
            {pageCount} <span className="text-sm font-normal text-muted-foreground">pages · {sectionCount} sections</span>
          </p>
        </Link>

        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="block rounded-lg border border-border bg-white p-5 hover:border-[#C6A355] transition-colors"
            >
              <Icon size={18} strokeWidth={1.75} className="text-[#C6A355] mb-2" />
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-semibold text-foreground mt-1">{card.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="rounded-lg border border-border bg-white mt-8">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <History size={15} strokeWidth={1.75} className="text-[#C6A355]" />
            Recently Updated Content
          </h2>
          <Link href="/admin/pages" className="text-xs text-muted-foreground hover:text-[#C6A355]">
            View all pages
          </Link>
        </div>
        {recentBlocks.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No content edits yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recentBlocks.map((block) => {
              const pageEntry = getAdminPage(block.page);
              const sectionLabel =
                pageEntry?.sections.find(
                  (s) => s.href === `/admin/content/page-copy/${block.page}/${block.key}`
                )?.label ?? block.key;
              return (
                <li key={block.id}>
                  <Link
                    href={`/admin/content/page-copy/${block.page}/${block.key}`}
                    className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-bg-base"
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-foreground truncate">{sectionLabel}</p>
                      <p className="text-xs text-muted-foreground truncate">{pageEntry?.label ?? block.page}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(block.updatedAt)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
