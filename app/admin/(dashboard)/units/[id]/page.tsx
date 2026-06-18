import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchListings } from "@/lib/listings";
import { prisma } from "@/lib/prisma";
import { FormField, inputClass, textareaClass } from "@/components/admin/FormField";
import { updateListingContent } from "../actions";

export default async function EditUnitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [listings, override] = await Promise.all([
    fetchListings(),
    prisma.listingContent.findUnique({ where: { guestyListingId: id } }),
  ]);

  const listing = listings.find((l) => l.id === id);
  if (!listing) notFound();

  const updateAction = updateListingContent.bind(null, id);

  return (
    <div>
      <Link href="/admin/units" className="text-sm text-muted-foreground hover:text-[#C6A355]">
        ← Units
      </Link>
      <h1 className="text-xl font-semibold text-foreground mt-3">{listing.name}</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-6">
        Pricing, availability, and core photos come live from Guesty. The fields below only
        control marketing overlay content.
      </p>

      <form action={updateAction} className="space-y-5 max-w-2xl">
        <FormField label="Marketing description override" htmlFor="description">
          <textarea
            id="description"
            name="description"
            defaultValue={override?.description ?? ""}
            placeholder={listing.about}
            className={textareaClass}
          />
        </FormField>

        <FormField label="Curated photo URLs (one per line)" htmlFor="photoUrls">
          <textarea
            id="photoUrls"
            name="photoUrls"
            defaultValue={override?.photoUrls.join("\n") ?? ""}
            className={textareaClass}
          />
        </FormField>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="showOnHomepage"
            name="showOnHomepage"
            defaultChecked={override?.showOnHomepage ?? false}
            className="rounded border-border"
          />
          <label htmlFor="showOnHomepage" className="text-sm text-foreground">
            Show on homepage
          </label>
        </div>

        <FormField label="Homepage order (lower = first)" htmlFor="homepageOrder">
          <input
            type="number"
            id="homepageOrder"
            name="homepageOrder"
            defaultValue={override?.homepageOrder ?? ""}
            className={inputClass}
          />
        </FormField>

        <FormField label="SEO title" htmlFor="seoTitle">
          <input
            type="text"
            id="seoTitle"
            name="seoTitle"
            defaultValue={override?.seoTitle ?? ""}
            className={inputClass}
          />
        </FormField>

        <FormField label="SEO description" htmlFor="seoDescription">
          <textarea
            id="seoDescription"
            name="seoDescription"
            defaultValue={override?.seoDescription ?? ""}
            className={textareaClass}
          />
        </FormField>

        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium bg-foreground text-white rounded-md hover:bg-text-primary cursor-pointer"
        >
          Save
        </button>
      </form>
    </div>
  );
}
