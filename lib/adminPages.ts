import type { LucideIcon } from "lucide-react";
import {
  Home,
  Building2,
  Scale,
  MapPin,
  CalendarRange,
  HelpCircle,
  Mail,
  CalendarCheck,
  ShieldCheck,
  FileText,
} from "lucide-react";

export type AdminSectionType = "block" | "list";

export interface AdminPageSection {
  label: string;
  description: string;
  href: string;
  type: AdminSectionType;
}

export interface AdminPageEntry {
  slug: string;
  label: string;
  description: string;
  icon: LucideIcon;
  sections: AdminPageSection[];
}

export const ADMIN_PAGES: AdminPageEntry[] = [
  {
    slug: "home",
    label: "Home",
    description: "The main landing page — hero, features, and highlights.",
    icon: Home,
    sections: [
      { label: "Hero", description: "Background image, heading, body copy, and call-to-action buttons.", href: "/admin/content/page-copy/home/hero", type: "block" },
      { label: "Features Strip", description: "Row of icons highlighting building and unit features.", href: "/admin/content/page-copy/home/featuresStrip", type: "block" },
      { label: "Grand Plaza Experience", description: "Section image and copy introducing the building's amenities.", href: "/admin/content/page-copy/home/grandPlazaExperience", type: "block" },
      { label: "Featured Penthouses", description: "Eyebrow label and \"view all\" link above the featured units grid.", href: "/admin/content/page-copy/home/featuredPenthouses", type: "block" },
      { label: "Why Book Direct", description: "Benefits of booking direct instead of Airbnb or VRBO.", href: "/admin/content/page-copy/home/whyBookDirect", type: "block" },
      { label: "Testimonials Header", description: "Eyebrow, heading, and rating line above the guest reviews.", href: "/admin/content/page-copy/home/testimonialsHeader", type: "block" },
      { label: "Testimonials", description: "Guest reviews shown on the homepage.", href: "/admin/content/testimonials", type: "list" },
      { label: "Footer", description: "Brand description, Walk Score badge, and copyright line shown in the site-wide footer.", href: "/admin/content/page-copy/home/footer", type: "block" },
    ],
  },
  {
    slug: "penthouses",
    label: "Penthouses",
    description: "The Penthouse Collection — listing grid and individual unit pages.",
    icon: Building2,
    sections: [
      { label: "Header", description: "Eyebrow, heading, and intro copy above the unit grid.", href: "/admin/content/page-copy/penthouses/header", type: "block" },
      { label: "Unit Page — Location Highlights", description: "\"Unbeatable Location\" heading and bullet list shown on every unit detail page.", href: "/admin/content/page-copy/penthouses/locationHighlights", type: "block" },
    ],
  },
  {
    slug: "compare",
    label: "Compare Units",
    description: "Book Direct vs. Airbnb vs. VRBO comparison page.",
    icon: Scale,
    sections: [
      { label: "Hero", description: "Top banner heading and intro copy.", href: "/admin/content/page-copy/compare/hero", type: "block" },
      { label: "Comparison Rows", description: "Each row of the comparison table.", href: "/admin/content/compare-rows", type: "list" },
      { label: "Table Labels", description: "Column headers and CTA button text.", href: "/admin/content/page-copy/compare/tableLabels", type: "block" },
    ],
  },
  {
    slug: "location",
    label: "Location",
    description: "Neighborhood and location highlights page.",
    icon: MapPin,
    sections: [
      { label: "Hero", description: "Background image, heading, and intro copy.", href: "/admin/content/page-copy/location/hero", type: "block" },
      { label: "Neighborhoods", description: "Walk/transit scores and neighborhood category highlights.", href: "/admin/content/page-copy/location/neighborhoods", type: "block" },
      { label: "Bottom CTA", description: "Closing call-to-action section.", href: "/admin/content/page-copy/location/cta", type: "block" },
    ],
  },
  {
    slug: "long-stays",
    label: "Long Stays",
    description: "Extended and monthly stays page.",
    icon: CalendarRange,
    sections: [
      { label: "Hero", description: "Background image, heading, and intro copy.", href: "/admin/content/page-copy/long-stays/hero", type: "block" },
      { label: "Benefits", description: "List of long-stay benefits.", href: "/admin/content/page-copy/long-stays/benefits", type: "block" },
      { label: "Who Stays", description: "Guest types who book extended stays.", href: "/admin/content/page-copy/long-stays/whoStays", type: "block" },
      { label: "Dark CTA Box", description: "Closing call-to-action box.", href: "/admin/content/page-copy/long-stays/cta", type: "block" },
    ],
  },
  {
    slug: "faq",
    label: "FAQ",
    description: "Frequently asked questions page.",
    icon: HelpCircle,
    sections: [
      { label: "Intro", description: "Heading and intro copy at the top of the page.", href: "/admin/content/page-copy/faq/intro", type: "block" },
      { label: "Questions", description: "All FAQ items, grouped by category.", href: "/admin/content/faqs", type: "list" },
      { label: "Bottom CTA", description: "\"Still Have Questions?\" call-to-action.", href: "/admin/content/page-copy/faq/cta", type: "block" },
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    description: "Contact page.",
    icon: Mail,
    sections: [
      { label: "Header", description: "Eyebrow, heading, and intro copy.", href: "/admin/content/page-copy/contact/header", type: "block" },
      { label: "Info Sidebar", description: "Team and response-time info shown beside the form.", href: "/admin/content/page-copy/contact/info", type: "block" },
    ],
  },
  {
    slug: "book",
    label: "Book Direct",
    description: "Book Direct / reservation page.",
    icon: CalendarCheck,
    sections: [
      { label: "Header", description: "Eyebrow, heading, body, and benefit pills.", href: "/admin/content/page-copy/book/header", type: "block" },
    ],
  },
  {
    slug: "privacy",
    label: "Privacy Policy",
    description: "Privacy policy legal page.",
    icon: ShieldCheck,
    sections: [
      { label: "Legal Text", description: "Page title, all policy sections, the closing contact section, and the last-updated date.", href: "/admin/content/page-copy/privacy/page", type: "block" },
    ],
  },
  {
    slug: "terms",
    label: "Terms of Service",
    description: "Terms of service legal page.",
    icon: FileText,
    sections: [
      { label: "Legal Text", description: "Page title, all terms sections, the closing contact section, and the last-updated date.", href: "/admin/content/page-copy/terms/page", type: "block" },
    ],
  },
];

export function getAdminPage(slug: string): AdminPageEntry | undefined {
  return ADMIN_PAGES.find((p) => p.slug === slug);
}
