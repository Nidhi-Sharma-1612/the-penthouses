"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Layers, Building2, Inbox, Settings as SettingsIcon, LogOut, Menu, X } from "lucide-react";
import { logout } from "@/app/admin/(dashboard)/actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: Layers },
  { href: "/admin/units", label: "Units", icon: Building2 },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: SettingsIcon,
    children: [
      { href: "/admin/settings", label: "Site Settings" },
      { href: "/admin/settings/password", label: "Change Password" },
    ],
  },
];

function Logo() {
  return (
    <Link href="/admin" className="flex flex-col items-start select-none gap-0.5" style={{ lineHeight: 1 }}>
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
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile/tablet drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-border bg-white px-4 py-3">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="cursor-pointer text-foreground p-1"
        >
          <Menu size={22} strokeWidth={1.75} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-56 shrink-0 border-r border-border bg-white min-h-screen flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-5 py-6 border-b border-border">
          <div>
            <Logo />
            <p className="text-[9px] tracking-[0.25em] text-[#C6A355] mt-2" style={{ fontWeight: 500 }}>
              ADMIN
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="lg:hidden cursor-pointer text-muted-foreground p-1"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? "bg-foreground text-white" : "text-foreground hover:bg-bg-muted"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.75} />
                  {item.label}
                </Link>
                {item.children && active && (
                  <div className="mt-1 ml-6.5 space-y-0.5 border-l border-border pl-3">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                            childActive ? "text-[#C6A355] font-medium" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <form action={logout} className="px-3 py-4 border-t border-border">
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-bg-muted hover:text-[#C6A355] cursor-pointer"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Log out
          </button>
        </form>
      </aside>
    </>
  );
}
