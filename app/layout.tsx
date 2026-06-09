import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://james.weblaucher.com";
const LOGO_URL =
  "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/1b5846047_logo.png";
const OG_IMAGE =
  "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/1b5846047_logo.png/v1/fill/w_1200,h_630/1b5846047_logo.png";
const DESCRIPTION =
  "An exclusive, high-end direct-booking portal for luxury Chicago high-rise penthouses, offering guests a curated, personalized, and seamless reservation experience.";

export const metadata: Metadata = {
  title: {
    default: "The Penthouses at Grand Plaza | Direct Booking Chicago",
    template: "%s | The Penthouses at Grand Plaza",
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: LOGO_URL,
    apple: LOGO_URL,
  },
  openGraph: {
    type: "website",
    siteName: "The Penthouses at Grand Plaza",
    title: "The Penthouses at Grand Plaza | Direct Booking Chicago",
    description: DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "The Penthouses at Grand Plaza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Penthouses at Grand Plaza | Direct Booking Chicago",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "The Penthouses at Grand Plaza",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Penthouses at Grand Plaza",
  url: SITE_URL,
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Penthouses at Grand Plaza",
  logo: LOGO_URL,
  url: SITE_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "#ffffff" }}>
        <Navbar />
        <main className="flex-1" style={{ paddingTop: "64px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
