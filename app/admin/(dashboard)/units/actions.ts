"use server";

import { revalidatePath } from "next/cache";
import { fetchListings } from "@/lib/listings";
import { prisma } from "@/lib/prisma";

export async function syncListingsFromGuesty() {
  const listings = await fetchListings(true);

  await Promise.all(
    listings.map((listing) =>
      prisma.listingContent.upsert({
        where: { guestyListingId: listing.id },
        update: {},
        create: { guestyListingId: listing.id },
      })
    )
  );

  revalidatePath("/admin/units");
}

export async function updateListingContent(guestyListingId: string, formData: FormData) {
  const description = String(formData.get("description") ?? "").trim() || null;
  const seoTitle = String(formData.get("seoTitle") ?? "").trim() || null;
  const seoDescription = String(formData.get("seoDescription") ?? "").trim() || null;
  const showOnHomepage = formData.get("showOnHomepage") === "on";
  const homepageOrderRaw = String(formData.get("homepageOrder") ?? "").trim();
  const homepageOrder = homepageOrderRaw ? Number(homepageOrderRaw) : null;
  const photoUrls = String(formData.get("photoUrls") ?? "")
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

  await prisma.listingContent.upsert({
    where: { guestyListingId },
    update: { description, seoTitle, seoDescription, showOnHomepage, homepageOrder, photoUrls },
    create: {
      guestyListingId,
      description,
      seoTitle,
      seoDescription,
      showOnHomepage,
      homepageOrder,
      photoUrls,
    },
  });

  revalidatePath("/admin/units");
  revalidatePath(`/admin/units/${guestyListingId}`);
}
