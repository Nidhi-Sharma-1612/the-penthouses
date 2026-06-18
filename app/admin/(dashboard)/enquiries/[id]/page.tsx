import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const enquiry = await prisma.contactEnquiry.findUnique({ where: { id } });
  if (!enquiry) notFound();

  return (
    <div>
      <Link href="/admin/enquiries" className="text-sm text-muted-foreground hover:text-[#C6A355] underline">
        ← Back to enquiries
      </Link>

      <h1 className="text-xl font-semibold text-foreground mt-4 mb-1">{enquiry.subject ?? "Contact enquiry"}</h1>
      <p className="text-sm text-muted-foreground mb-6">{enquiry.createdAt.toLocaleString()}</p>

      <div className="bg-white border border-border rounded-lg p-5 max-w-2xl space-y-4">
        <div>
          <p className="text-xs text-muted-foreground">Name</p>
          <p className="text-sm text-foreground">{enquiry.name}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Email</p>
          <a href={`mailto:${enquiry.email}`} className="text-sm text-foreground underline">
            {enquiry.email}
          </a>
        </div>
        {enquiry.phone && (
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm text-foreground">{enquiry.phone}</p>
          </div>
        )}
        <div>
          <p className="text-xs text-muted-foreground">Message</p>
          <p className="text-sm text-foreground whitespace-pre-wrap">{enquiry.message}</p>
        </div>
      </div>
    </div>
  );
}
