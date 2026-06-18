import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { getAdminPage } from "@/lib/adminPages";

export default async function AdminPageSections({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const entry = getAdminPage(page);
  if (!entry) notFound();

  const Icon = entry.icon;

  return (
    <div>
      <Link href="/admin/pages" className="text-sm text-muted-foreground hover:text-[#C6A355]">
        ← All Pages
      </Link>
      <h1 className="font-heading text-2xl text-foreground mt-3 mb-1 flex items-center gap-2.5" style={{ fontWeight: 400 }}>
        <Icon size={20} strokeWidth={1.75} className="text-[#C6A355]" />
        {entry.label}
      </h1>
      <p className="text-sm text-muted-foreground mb-6">{entry.description}</p>

      {entry.slug === "contact" && (
        <Link
          href="/admin/settings"
          className="mb-6 flex items-start gap-2.5 rounded-lg border border-accent-light/60 bg-accent-light/20 p-4 text-sm text-foreground hover:border-[#C6A355] transition-colors"
        >
          <Info size={16} strokeWidth={1.75} className="text-[#C6A355] shrink-0 mt-0.5" />
          <span>
            Mailing address and contact email shown here are managed in{" "}
            <span className="font-medium text-[#C6A355]">Settings → Site Settings</span> — they're shared with the site-wide footer.
          </span>
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {entry.sections.map((section) => (
          <Link
            key={section.label}
            href={section.href}
            className="block rounded-lg border border-border bg-white p-5 hover:border-[#C6A355] hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="font-medium text-foreground">{section.label}</p>
              <span
                className={`shrink-0 text-[11px] rounded-full px-2 py-0.5 ${
                  section.type === "list" ? "text-blue-600 bg-blue-50" : "text-accent-dark bg-accent-light/40"
                }`}
              >
                {section.type === "list" ? "List" : "Content"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
