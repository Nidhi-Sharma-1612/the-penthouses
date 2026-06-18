import { FormField, inputClass, textareaClass } from "@/components/admin/FormField";

export default function TestimonialForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: { name: string; quote: string; propertyLabel: string | null; published: boolean; order: number };
}) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <FormField label="Guest name" htmlFor="name">
        <input id="name" name="name" type="text" required defaultValue={defaultValues?.name} className={inputClass} />
      </FormField>

      <FormField label="Quote" htmlFor="quote">
        <textarea id="quote" name="quote" required defaultValue={defaultValues?.quote} className={textareaClass} />
      </FormField>

      <FormField label="Property / stay label" htmlFor="propertyLabel">
        <input
          id="propertyLabel"
          name="propertyLabel"
          type="text"
          defaultValue={defaultValues?.propertyLabel ?? ""}
          placeholder="Penthouse 5401 · November 2024"
          className={inputClass}
        />
      </FormField>

      <FormField label="Order (lower = first)" htmlFor="order">
        <input id="order" name="order" type="number" defaultValue={defaultValues?.order ?? 0} className={inputClass} />
      </FormField>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={defaultValues?.published ?? true}
          className="rounded border-border"
        />
        <label htmlFor="published" className="text-sm text-foreground">
          Published (visible on homepage)
        </label>
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium bg-foreground text-white rounded-md hover:bg-text-primary cursor-pointer"
      >
        Save
      </button>
    </form>
  );
}
