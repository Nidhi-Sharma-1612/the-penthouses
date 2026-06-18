import { FormField, inputClass } from "@/components/admin/FormField";

export default function CompareRowForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: { feature: string; direct: string; airbnb: string; vrbo: string; order: number };
}) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <FormField label="Feature" htmlFor="feature">
        <input id="feature" name="feature" type="text" required defaultValue={defaultValues?.feature} className={inputClass} />
      </FormField>

      <FormField label="Book Direct (us)" htmlFor="direct">
        <input id="direct" name="direct" type="text" required defaultValue={defaultValues?.direct} className={inputClass} />
      </FormField>

      <FormField label="Airbnb" htmlFor="airbnb">
        <input id="airbnb" name="airbnb" type="text" required defaultValue={defaultValues?.airbnb} className={inputClass} />
      </FormField>

      <FormField label="VRBO" htmlFor="vrbo">
        <input id="vrbo" name="vrbo" type="text" required defaultValue={defaultValues?.vrbo} className={inputClass} />
      </FormField>

      <FormField label="Order (lower = first)" htmlFor="order">
        <input id="order" name="order" type="number" defaultValue={defaultValues?.order ?? 0} className={inputClass} />
      </FormField>

      <button type="submit" className="px-4 py-2 text-sm font-medium bg-foreground text-white rounded-md hover:bg-text-primary cursor-pointer">
        Save
      </button>
    </form>
  );
}
