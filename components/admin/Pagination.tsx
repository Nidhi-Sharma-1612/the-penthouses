import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string | undefined>
) {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) params.set(key, value);
    }
  }
  params.set("page", String(page));
  return `${basePath}?${params.toString()}`;
}

export default function Pagination({
  page,
  pageSize,
  total,
  basePath,
  searchParams,
}: {
  page: number;
  pageSize: number;
  total: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-sm text-muted-foreground">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        {page > 1 && (
          <Link
            href={buildHref(basePath, page - 1, searchParams)}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md hover:bg-bg-base hover:border-[#C6A355]"
          >
            <ChevronLeft size={14} strokeWidth={1.75} />
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={buildHref(basePath, page + 1, searchParams)}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md hover:bg-bg-base hover:border-[#C6A355]"
          >
            Next
            <ChevronRight size={14} strokeWidth={1.75} />
          </Link>
        )}
      </div>
    </div>
  );
}
