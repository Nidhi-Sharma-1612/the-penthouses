import Sidebar from "@/components/admin/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:flex">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl min-w-0">{children}</main>
    </div>
  );
}
