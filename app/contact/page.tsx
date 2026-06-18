import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";
import { getSiteSettings } from "@/lib/settings";
import ContactPageClient from "@/components/contact/ContactPageClient";

export default async function ContactPage() {
  const [header, info, settings] = await Promise.all([
    getContentBlock("contact", "header", CONTENT_DEFAULTS.contact.header),
    getContentBlock("contact", "info", CONTENT_DEFAULTS.contact.info),
    getSiteSettings(["contactEmail", "address"]),
  ]);

  return (
    <ContactPageClient
      header={header}
      info={info}
      contactEmail={settings.contactEmail ?? "info@penthousesgrandplaza.com"}
      address={settings.address ?? "Grand Plaza\nRiver North, Chicago IL"}
    />
  );
}
