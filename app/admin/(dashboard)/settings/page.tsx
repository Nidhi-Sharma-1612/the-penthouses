import { Save } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";
import { FormField, inputClass, textareaClass } from "@/components/admin/FormField";
import { updateSettings } from "./actions";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings(["address", "contactEmail"]);

  return (
    <div>
      <form action={updateSettings} className="space-y-5 max-w-2xl">
        <FormField label="Address" htmlFor="address">
          <textarea
            id="address"
            name="address"
            defaultValue={settings.address ?? ""}
            className={textareaClass}
            placeholder={"Grand Plaza\nRiver North, Chicago IL"}
          />
        </FormField>

        <FormField label="Contact email" htmlFor="contactEmail">
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            defaultValue={settings.contactEmail ?? ""}
            className={inputClass}
          />
        </FormField>

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
