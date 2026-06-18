import { FormField, inputClass, textareaClass } from "@/components/admin/FormField";

export default function FaqForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: { category: string; question: string; answer: string; order: number };
}) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <FormField label="Category" htmlFor="category">
        <input
          id="category"
          name="category"
          type="text"
          required
          defaultValue={defaultValues?.category}
          placeholder="BOOKING"
          className={inputClass}
        />
      </FormField>

      <FormField label="Question" htmlFor="question">
        <input
          id="question"
          name="question"
          type="text"
          required
          defaultValue={defaultValues?.question}
          className={inputClass}
        />
      </FormField>

      <FormField label="Answer" htmlFor="answer">
        <textarea id="answer" name="answer" required defaultValue={defaultValues?.answer} className={textareaClass} />
      </FormField>

      <FormField label="Order (lower = first within category)" htmlFor="order">
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={defaultValues?.order ?? 0}
          className={inputClass}
        />
      </FormField>

      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium bg-foreground text-white rounded-md hover:bg-text-primary cursor-pointer"
      >
        Save
      </button>
    </form>
  );
}
