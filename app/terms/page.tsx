import Link from "next/link";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">LEGAL</p>
        <h1 className="font-heading text-5xl mb-8" style={{ fontWeight: 400, color: "rgb(17,17,17)", lineHeight: 1.1 }}>
          Terms of Service
        </h1>

        <div className="space-y-8 text-sm font-light leading-relaxed font-body text-muted-foreground">
          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>1. Acceptance of Terms</h2>
            <p>By accessing and using this website and making reservations through The Penthouses at Grand Plaza, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>2. Reservations & Bookings</h2>
            <p>All reservations are subject to availability and confirmation by our team. A reservation is not confirmed until you receive written confirmation and a signed rental agreement. We reserve the right to refuse any reservation at our discretion.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>3. Payment</h2>
            <p>Payment terms will be outlined in your rental agreement. A security deposit is required at the time of booking and will be returned within 7 business days of checkout, provided no damage has occurred beyond normal wear and tear.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>4. Cancellation Policy</h2>
            <p>Cancellations made 14 or more days before check-in are eligible for a full refund. Cancellations within 14 days of check-in are non-refundable. We recommend purchasing travel insurance to protect your reservation.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>5. Guest Responsibilities</h2>
            <p>Guests are responsible for maintaining the property in good condition during their stay. Smoking is not permitted in any unit. Pets are not allowed. Events or parties beyond the registered guest count are prohibited.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>6. Limitation of Liability</h2>
            <p>The Penthouses at Grand Plaza is not liable for any indirect, incidental, or consequential damages arising from your use of our services or stay at our properties. Our liability is limited to the amount paid for the reservation.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>7. Contact</h2>
            <p>For questions about these terms, please <Link href="/contact" className="text-[#C6A355] hover:underline">contact us</Link>.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-muted-foreground font-body">Last updated: June 2025</p>
        </div>
      </div>
    </div>
  );
}
