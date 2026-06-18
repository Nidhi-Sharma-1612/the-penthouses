import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";

const DEFAULTS = {
  address: "Grand Plaza\nRiver North, Chicago IL",
  contactEmail: "info@penthousesgrandplaza.com",
};

export default async function Footer() {
  const [settings, footerCopy] = await Promise.all([
    getSiteSettings(["address", "contactEmail"]),
    getContentBlock("home", "footer", CONTENT_DEFAULTS.home.footer),
  ]);
  const address = settings.address ?? DEFAULTS.address;
  const contactEmail = settings.contactEmail ?? DEFAULTS.contactEmail;
  const copyrightLine = footerCopy.copyrightLine;

  return (
    <footer style={{ background: "rgb(10, 11, 13)", color: "rgb(255, 255, 255)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand — spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  fontWeight: 300,
                  color: "rgba(255, 255, 255, 0.9)",
                  textTransform: "uppercase",
                }}
              >
                The Penthouses
              </p>
              <div className="flex items-center gap-2 my-1">
                <div style={{ height: "1px", width: "24px", background: "rgba(255,255,255,0.5)" }} />
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    fontWeight: 300,
                    color: "rgba(255, 255, 255, 0.9)",
                    textTransform: "uppercase",
                  }}
                >
                  at Grand Plaza
                </p>
                <div style={{ height: "1px", width: "24px", background: "rgba(255,255,255,0.5)" }} />
              </div>
            </div>

            <p
              className="text-sm max-w-sm"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 300,
                lineHeight: 1.625,
                color: "rgba(255, 255, 255, 0.85)",
              }}
            >
              {footerCopy.description}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "rgb(198, 163, 85)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: "rgb(198, 163, 85)",
                }}
              >
                {footerCopy.walkScoreLabel}
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4
              className="mb-5"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255, 255, 255, 0.6)",
                textTransform: "uppercase",
              }}
            >
              EXPLORE
            </h4>
            <div className="space-y-3">
              {[
                { label: "All Penthouses", href: "/penthouses" },
                { label: "Compare Units", href: "/compare" },
                { label: "Location & Neighborhood", href: "/location" },
                { label: "Long Stays", href: "/long-stays" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/80 hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-5"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255, 255, 255, 0.6)",
                textTransform: "uppercase",
              }}
            >
              CONTACT
            </h4>
            <div
              className="space-y-3 text-sm"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.85)",
              }}
            >
              <p>
                {address.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < address.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="block text-white/80 hover:text-white transition-colors"
                style={{ textDecoration: "none" }}
              >
                {contactEmail}
              </a>
              <Link
                href="/book"
                className="inline-block mt-4 text-[#C6A355] border border-[#C6A355] hover:bg-[#C6A355] hover:text-black transition-all"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  padding: "12px 20px",
                  textDecoration: "none",
                }}
              >
                BOOK DIRECT
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            {copyrightLine}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-white/50 hover:text-white/80 transition-colors"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/50 hover:text-white/80 transition-colors"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
