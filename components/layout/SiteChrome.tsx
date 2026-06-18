"use client";

import { usePathname } from "next/navigation";

export default function SiteChrome({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1" style={{ paddingTop: "64px" }}>{children}</main>
      {footer}
    </>
  );
}
