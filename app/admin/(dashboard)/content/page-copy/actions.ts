"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getContentBlock, setContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";

const DEFAULTS = CONTENT_DEFAULTS as unknown as Record<string, Record<string, Record<string, unknown>>>;

const PUBLIC_PATH: Record<string, string> = {
  home: "/",
  penthouses: "/penthouses",
  faq: "/faq",
  location: "/location",
  "long-stays": "/long-stays",
  compare: "/compare",
  contact: "/contact",
  book: "/book",
  privacy: "/privacy",
  terms: "/terms",
};

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function isObjectArray(v: unknown): v is Record<string, unknown>[] {
  return (
    Array.isArray(v) &&
    v.length > 0 &&
    v.every((x) => typeof x === "object" && x !== null && !Array.isArray(x))
  );
}

export async function updatePageCopy(page: string, key: string, formData: FormData) {
  const fallback = DEFAULTS[page]?.[key] ?? {};
  const current = await getContentBlock(page, key, fallback);

  const next: Record<string, unknown> = { ...current };

  for (const [fieldKey, fieldValue] of Object.entries(current)) {
    if (typeof fieldValue === "string") {
      const posted = formData.get(fieldKey);
      if (posted !== null) next[fieldKey] = String(posted);
    } else if (isStringArray(fieldValue)) {
      const posted = formData.get(`list__${fieldKey}`);
      if (posted !== null) {
        next[fieldKey] = String(posted)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    } else if (isObjectArray(fieldValue)) {
      next[fieldKey] = fieldValue.map((item, i) => {
        const nextItem: Record<string, unknown> = { ...item };
        for (const objKey of Object.keys(item)) {
          const name = `item__${fieldKey}__${i}__${objKey}`;
          if (isStringArray(item[objKey])) {
            const posted = formData.get(name);
            if (posted !== null) {
              nextItem[objKey] = String(posted)
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean);
            }
          } else {
            const posted = formData.get(name);
            if (posted !== null) nextItem[objKey] = String(posted);
          }
        }
        return nextItem;
      });
    }
  }

  await setContentBlock(page, key, next);

  if (page === "home" && key === "footer") {
    revalidatePath("/", "layout");
  } else {
    revalidatePath(PUBLIC_PATH[page] ?? "/");
    if (page === "penthouses" && key === "locationHighlights") {
      revalidatePath("/penthouses/[id]", "page");
    }
  }
  revalidatePath(`/admin/content/page-copy/${page}/${key}`);
  redirect(`/admin/content/page-copy/${page}/${key}`);
}
