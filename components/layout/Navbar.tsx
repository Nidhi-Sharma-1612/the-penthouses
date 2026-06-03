"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "PENTHOUSES",    href: "/penthouses"  },
  { label: "COMPARE UNITS", href: "/compare"     },
  { label: "LOCATION",      href: "/location"    },
  { label: "LONG STAYS",    href: "/long-stays"  },
  { label: "FAQ",           href: "/faq"         },
  { label: "CONTACT",       href: "/contact"     },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      style={{ borderBottom: "1px solid rgb(232, 232, 232)", boxShadow: "none" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{ height: "64px" }}>

          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-start select-none gap-0.5"
            style={{ lineHeight: 1 }}
          >
            <span
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "14px",
                letterSpacing: "0.22em",
                fontWeight: 400,
                color: "rgb(26, 26, 26)",
              }}
            >
              THE PENTHOUSES
            </span>
            <div className="flex items-center gap-1.5">
              <div style={{ height: "1px", width: "20px", background: "rgb(26, 26, 26)" }} />
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  fontWeight: 400,
                  color: "rgb(26, 26, 26)",
                }}
              >
                AT GRAND PLAZA
              </span>
              <div style={{ height: "1px", width: "20px", background: "rgb(26, 26, 26)" }} />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center" style={{ gap: "28px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.13em",
                  fontWeight: 500,
                  color: pathname === link.href ? "rgb(198, 163, 85)" : "rgb(26, 26, 26)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* BOOK DIRECT CTA */}
            <Link
              href="/book"
              className="hover:opacity-90 transition-opacity"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.13em",
                fontWeight: 500,
                background: "rgb(26, 26, 26)",
                color: "rgb(255, 255, 255)",
                padding: "10px 18px",
                textDecoration: "none",
              }}
            >
              BOOK DIRECT
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X width={20} height={20} />
            ) : (
              <Menu width={20} height={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden bg-white"
            style={{ borderTop: "1px solid rgb(232, 232, 232)" }}
          >
            <div className="flex flex-col px-6 py-5 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.13em",
                    fontWeight: 500,
                    color: pathname === link.href ? "rgb(198, 163, 85)" : "rgb(26, 26, 26)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="self-start"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.13em",
                  fontWeight: 500,
                  background: "rgb(26, 26, 26)",
                  color: "rgb(255, 255, 255)",
                  padding: "10px 18px",
                  textDecoration: "none",
                }}
              >
                BOOK DIRECT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
