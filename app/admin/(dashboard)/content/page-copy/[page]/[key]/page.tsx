import Link from "next/link";
import { Save, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";
import { getAdminPage } from "@/lib/adminPages";
import { FormField, inputClass, textareaClass } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { updatePageCopy } from "../../actions";

function isImageField(fieldKey: string): boolean {
  return fieldKey === "image" || fieldKey.endsWith("Image");
}

const DEFAULTS = CONTENT_DEFAULTS as unknown as Record<string, Record<string, Record<string, unknown>>>;

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

// Postgres jsonb does not preserve object key insertion order (it reorders by
// key length, then alphabetically), so a saved block's field order can drift
// from how it was authored. Re-sort against the CONTENT_DEFAULTS template so
// the editor always shows fields in the same order the public page renders them.
function orderByTemplate<T extends Record<string, unknown>>(obj: T, template: Record<string, unknown> | undefined): [string, unknown][] {
  const entries = Object.entries(obj);
  if (!template) return entries;
  const templateKeys = Object.keys(template);
  const rank = (k: string) => {
    const i = templateKeys.indexOf(k);
    return i === -1 ? templateKeys.length : i;
  };
  return entries.sort((a, b) => rank(a[0]) - rank(b[0]));
}

export default async function EditPageCopyPage({
  params,
}: {
  params: Promise<{ page: string; key: string }>;
}) {
  const { page, key } = await params;
  const fallback = DEFAULTS[page]?.[key];
  if (!fallback) notFound();

  const value = await getContentBlock(page, key, fallback);
  const updateAction = updatePageCopy.bind(null, page, key);

  const pageEntry = getAdminPage(page);
  const sectionLabel =
    pageEntry?.sections.find((s) => s.href === `/admin/content/page-copy/${page}/${key}`)?.label ?? key;

  const fields = orderByTemplate(value, fallback);

  return (
    <div>
      <Link href={`/admin/pages/${page}`} className="text-sm text-muted-foreground hover:text-[#C6A355]">
        ← {pageEntry?.label ?? page} Page
      </Link>
      <h1 className="font-heading text-2xl text-foreground mt-3 mb-6" style={{ fontWeight: 400 }}>
        {sectionLabel}
      </h1>

      {page === "home" && key === "footer" && (
        <Link
          href="/admin/settings"
          className="mb-6 flex items-start gap-2.5 rounded-lg border border-accent-light/60 bg-accent-light/20 p-4 text-sm text-foreground hover:border-[#C6A355] transition-colors max-w-2xl"
        >
          <Info size={16} strokeWidth={1.75} className="text-[#C6A355] shrink-0 mt-0.5" />
          <span>
            The mailing address and contact email shown in this footer are managed in{" "}
            <span className="font-medium text-[#C6A355]">Settings → Site Settings</span> — they're shared with the Contact page.
          </span>
        </Link>
      )}

      <form action={updateAction} className="space-y-5 max-w-2xl">
        {fields.map(([fieldKey, fieldValue]) => {
          if (typeof fieldValue === "string") {
            return isImageField(fieldKey) ? (
              <ImageUploadField key={fieldKey} name={fieldKey} label={fieldKey} defaultValue={fieldValue} />
            ) : (
              <FormField key={fieldKey} label={fieldKey} htmlFor={fieldKey}>
                {fieldValue.length > 80 ? (
                  <textarea id={fieldKey} name={fieldKey} defaultValue={fieldValue} className={textareaClass} />
                ) : (
                  <input id={fieldKey} name={fieldKey} type="text" defaultValue={fieldValue} className={inputClass} />
                )}
              </FormField>
            );
          }

          if (isStringArray(fieldValue)) {
            return (
              <FormField key={fieldKey} label={`${fieldKey} (one per line)`} htmlFor={`list__${fieldKey}`}>
                <textarea
                  id={`list__${fieldKey}`}
                  name={`list__${fieldKey}`}
                  defaultValue={fieldValue.join("\n")}
                  className={textareaClass}
                />
              </FormField>
            );
          }

          if (isObjectArray(fieldValue)) {
            const itemTemplate = fallback[fieldKey];
            const templateItem = isObjectArray(itemTemplate) ? itemTemplate[0] : undefined;
            return (
              <div key={fieldKey} className="space-y-4 border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">{fieldKey}</p>
                {fieldValue.map((item, i) => (
                  <div key={i} className="space-y-3 border border-border rounded-md p-3">
                    {orderByTemplate(item, templateItem).map(([objKey, objValue]) => {
                      const name = `item__${fieldKey}__${i}__${objKey}`;
                      if (isStringArray(objValue)) {
                        return (
                          <div key={objKey}>
                            <label className="block text-xs text-muted-foreground mb-1">{objKey} (one per line)</label>
                            <textarea name={name} defaultValue={objValue.join("\n")} className={textareaClass} />
                          </div>
                        );
                      }
                      const strValue = String(objValue ?? "");
                      return (
                        <div key={objKey}>
                          <label className="block text-xs text-muted-foreground mb-1">{objKey}</label>
                          {strValue.length > 80 ? (
                            <textarea name={name} defaultValue={strValue} className={textareaClass} />
                          ) : (
                            <input name={name} type="text" defaultValue={strValue} className={inputClass} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          }

          return null;
        })}

        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-foreground text-white rounded-md hover:bg-text-primary cursor-pointer"
        >
          <Save size={15} strokeWidth={1.75} />
          Save
        </button>
      </form>
    </div>
  );
}
