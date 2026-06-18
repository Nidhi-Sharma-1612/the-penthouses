"use client";

import { usePathname } from "next/navigation";

const SUB_LABELS: Record<string, string> = {
  "/admin/settings": "Site Settings",
  "/admin/settings/password": "Change Password",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const subLabel = pathname ? SUB_LABELS[pathname] : undefined;

  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground" style={{ fontWeight: 400 }}>
        Settings
      </h1>
      {subLabel && (
        <p className="text-sm text-muted-foreground mb-6 mt-0.5">{subLabel}</p>
      )}

      {children}
    </div>
  );
}
