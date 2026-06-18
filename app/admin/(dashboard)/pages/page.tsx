import Link from "next/link";
import { ADMIN_PAGES } from "@/lib/adminPages";

export default function AdminPagesIndex() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground mb-1" style={{ fontWeight: 400 }}>
        Pages
      </h1>
      <p className="text-sm text-muted-foreground mb-6">Pick a page, then pick a section to edit.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ADMIN_PAGES.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.slug}
              href={`/admin/pages/${p.slug}`}
              className="block rounded-lg border border-border bg-white p-5 hover:border-[#C6A355] hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="flex items-center gap-2">
                  <Icon size={16} strokeWidth={1.75} className="text-[#C6A355]" />
                  <p className="font-medium text-foreground">{p.label}</p>
                </span>
                <span className="shrink-0 text-[11px] text-muted-foreground bg-bg-muted rounded-full px-2 py-0.5">
                  {p.sections.length} {p.sections.length === 1 ? "section" : "sections"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
