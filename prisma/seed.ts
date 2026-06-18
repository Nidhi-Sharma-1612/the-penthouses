import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { CONTENT_DEFAULTS } from "../lib/contentDefaults";

config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const FAQ_SEED = [
  {
    category: "BOOKING",
    items: [
      {
        question: "Why should I book direct instead of Airbnb or VRBO?",
        answer:
          "Booking directly with us means zero platform service fees, which saves you 10–15% compared to third-party sites. You also get direct access to our team, flexible check-in options, and the best available rate — guaranteed.",
      },
      {
        question: "How do I make a reservation?",
        answer:
          "Submit a booking request through our Book Direct page. We'll confirm availability and send a reservation agreement within a few hours. Payment is collected via secure link.",
      },
      {
        question: "What is the minimum stay?",
        answer:
          "Our standard minimum stay is 2 nights. For long stays of 30+ nights, special monthly pricing is available — contact us directly for a personalized quote.",
      },
      {
        question: "Is there a security deposit?",
        answer:
          "Yes. A refundable security deposit is required at booking. It is returned within 7 business days of checkout, provided there is no damage beyond normal wear and tear.",
      },
    ],
  },
  {
    category: "THE PENTHOUSES",
    items: [
      {
        question: "How many units do you have?",
        answer:
          "We manage 11 exclusive penthouse residences within Grand Plaza — each with its own layout, floor plan, and views. No two units are identical.",
      },
      {
        question: "Are all units the same?",
        answer:
          "No. Units range from intimate one-bedroom residences to expansive two-story penthouses. Some feature fireplaces, private balconies, lake views, or two-floor layouts. Browse the Penthouse Collection to compare.",
      },
      {
        question: "What building amenities are included?",
        answer:
          "All guests have access to Grand Plaza's amenities: 24-hour door staff, fitness center, indoor pool, concierge services, and secure building access. Parking is available for an additional fee.",
      },
      {
        question: "Is there a grocery store in the building?",
        answer:
          "Yes — there is a full Jewel-Osco grocery store located inside the building, accessible without going outside. This is one of the most convenient features for long-stay guests.",
      },
    ],
  },
  {
    category: "POLICIES",
    items: [
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellations made 14 or more days before check-in receive a full refund. Cancellations within 14 days are non-refundable. We recommend travel insurance for added flexibility.",
      },
      {
        question: "Are pets allowed?",
        answer: "Pets are not permitted in any of our penthouse residences. This policy is enforced by building management and cannot be waived.",
      },
      {
        question: "What are the check-in and check-out times?",
        answer:
          "Standard check-in is at 4:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available on request, subject to availability — just reach out to our team in advance.",
      },
      {
        question: "Are events or parties permitted?",
        answer:
          "Events, parties, and gatherings beyond the registered guest count are not permitted. Our units are private residences in an occupied residential building and must be treated accordingly.",
      },
    ],
  },
];

const TESTIMONIAL_SEED = [
  {
    name: "Sarah M.",
    propertyLabel: "Penthouse 5401 · November 2024",
    quote:
      "Absolutely breathtaking. Woke up to the most incredible view of Lake Michigan every morning. The space was enormous — we had a group of 6 and everyone had their own area. Booking direct was seamless and the team was incredibly responsive.",
  },
  {
    name: "James & Lauren T.",
    propertyLabel: "Penthouse 5602 · October 2024",
    quote:
      "We stayed for our anniversary and this was better than any hotel we've ever booked. Two floors, a fireplace, and a view that made us feel like we owned the city. Will absolutely be booking direct again next trip.",
  },
  {
    name: "Marcus D.",
    propertyLabel: "Penthouse 5801 · September 2024",
    quote:
      "Traveling for work and needed space to decompress. Found this through a Google search and so glad I didn't book through Airbnb. Saved money, got a direct line to the host, and the Jewel-Osco in the building was a game changer.",
  },
];

const SITE_SETTINGS_SEED: Record<string, string> = {
  address: "Grand Plaza\nRiver North, Chicago IL",
  contactEmail: "info@penthousesgrandplaza.com",
};

const COMPARE_ROWS_SEED = [
  { feature: "Service Fees", direct: "$0", airbnb: "14–16% added", vrbo: "6–12% added" },
  { feature: "Direct Host Communication", direct: "Always", airbnb: "Via platform only", vrbo: "Via platform only" },
  { feature: "Flexible Check-in", direct: "Available on request", airbnb: "Fixed times", vrbo: "Fixed times" },
  { feature: "Rate Negotiation", direct: "Possible for long stays", airbnb: "Not available", vrbo: "Not available" },
  { feature: "Personal Concierge", direct: "Included", airbnb: "Not available", vrbo: "Not available" },
  { feature: "Custom Requests", direct: "Accommodated", airbnb: "Limited", vrbo: "Limited" },
  { feature: "Data Privacy", direct: "Private", airbnb: "Shared with platform", vrbo: "Shared with platform" },
  { feature: "Best Rate", direct: "Guaranteed", airbnb: "Platform fees added", vrbo: "Platform fees added" },
];

const CONTENT_BLOCKS_SEED: { page: string; key: string; value: object }[] = [
  { page: "home", key: "hero", value: CONTENT_DEFAULTS.home.hero },
  { page: "home", key: "featuresStrip", value: CONTENT_DEFAULTS.home.featuresStrip },
  { page: "home", key: "grandPlazaExperience", value: CONTENT_DEFAULTS.home.grandPlazaExperience },
  { page: "home", key: "featuredPenthouses", value: CONTENT_DEFAULTS.home.featuredPenthouses },
  { page: "home", key: "whyBookDirect", value: CONTENT_DEFAULTS.home.whyBookDirect },
  { page: "home", key: "testimonialsHeader", value: CONTENT_DEFAULTS.home.testimonialsHeader },
  { page: "home", key: "footer", value: CONTENT_DEFAULTS.home.footer },
  { page: "penthouses", key: "header", value: CONTENT_DEFAULTS.penthouses.header },
  { page: "penthouses", key: "locationHighlights", value: CONTENT_DEFAULTS.penthouses.locationHighlights },
  { page: "faq", key: "intro", value: CONTENT_DEFAULTS.faq.intro },
  { page: "faq", key: "cta", value: CONTENT_DEFAULTS.faq.cta },
  { page: "location", key: "hero", value: CONTENT_DEFAULTS.location.hero },
  { page: "location", key: "neighborhoods", value: CONTENT_DEFAULTS.location.neighborhoods },
  { page: "location", key: "cta", value: CONTENT_DEFAULTS.location.cta },
  { page: "long-stays", key: "hero", value: CONTENT_DEFAULTS["long-stays"].hero },
  { page: "long-stays", key: "benefits", value: CONTENT_DEFAULTS["long-stays"].benefits },
  { page: "long-stays", key: "whoStays", value: CONTENT_DEFAULTS["long-stays"].whoStays },
  { page: "long-stays", key: "cta", value: CONTENT_DEFAULTS["long-stays"].cta },
  { page: "compare", key: "hero", value: CONTENT_DEFAULTS.compare.hero },
  { page: "compare", key: "tableLabels", value: CONTENT_DEFAULTS.compare.tableLabels },
  { page: "contact", key: "header", value: CONTENT_DEFAULTS.contact.header },
  { page: "contact", key: "info", value: CONTENT_DEFAULTS.contact.info },
  { page: "book", key: "header", value: CONTENT_DEFAULTS.book.header },
  { page: "privacy", key: "page", value: CONTENT_DEFAULTS.privacy.page },
  { page: "terms", key: "page", value: CONTENT_DEFAULTS.terms.page },
];

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local before seeding.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`Seeded admin user: ${email}`);

  if ((await prisma.faq.count()) === 0) {
    let order = 0;
    for (const group of FAQ_SEED) {
      for (const item of group.items) {
        await prisma.faq.create({
          data: { category: group.category, question: item.question, answer: item.answer, order: order++ },
        });
      }
    }
    console.log("Seeded FAQs");
  }

  if ((await prisma.testimonial.count()) === 0) {
    let order = 0;
    for (const t of TESTIMONIAL_SEED) {
      await prisma.testimonial.create({ data: { ...t, order: order++ } });
    }
    console.log("Seeded testimonials");
  }

  // Upsert (not "only if empty") so re-running the seed after adding new
  // blocks fills in the new ones without touching ones already edited.
  for (const block of CONTENT_BLOCKS_SEED) {
    await prisma.contentBlock.upsert({
      where: { page_key: { page: block.page, key: block.key } },
      update: {},
      create: block,
    });
  }
  console.log("Seeded content blocks");

  if ((await prisma.siteSetting.count()) === 0) {
    for (const [key, value] of Object.entries(SITE_SETTINGS_SEED)) {
      await prisma.siteSetting.create({ data: { key, value } });
    }
    console.log("Seeded site settings");
  }

  if ((await prisma.compareRow.count()) === 0) {
    let order = 0;
    for (const row of COMPARE_ROWS_SEED) {
      await prisma.compareRow.create({ data: { ...row, order: order++ } });
    }
    console.log("Seeded compare rows");
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
