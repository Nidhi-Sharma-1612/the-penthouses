import Link from "next/link";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">LEGAL</p>
        <h1 className="font-heading text-5xl mb-8" style={{ fontWeight: 400, color: "rgb(17,17,17)", lineHeight: 1.1 }}>
          Privacy Policy
        </h1>

        <div className="space-y-8 text-sm font-light leading-relaxed font-body text-muted-foreground">
          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>1. Information We Collect</h2>
            <p>When you make a reservation inquiry, we collect your name, email address, phone number, and stay details. We use this information solely to process your reservation and communicate with you about your stay.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>2. How We Use Your Information</h2>
            <p>Your personal information is used to confirm reservations, process payments, and provide you with a personalized experience. We do not sell, trade, or share your information with third parties except as required to process your booking.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>3. Data Security</h2>
            <p>We take the security of your personal information seriously. All data is transmitted over secure, encrypted connections. We do not store credit card information on our servers.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>4. Cookies</h2>
            <p>Our website uses essential cookies to ensure proper functionality. We do not use tracking or advertising cookies. You may disable cookies in your browser settings, though some site features may not function correctly.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>5. Third-Party Services</h2>
            <p>We use Guesty, a professional property management platform, to manage reservations. Your booking information is shared with Guesty solely for reservation processing purposes. Guesty&apos;s privacy practices are governed by their own privacy policy.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>6. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us. We will respond to all requests within 30 days.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400, color: "rgb(17,17,17)" }}>7. Contact</h2>
            <p>For privacy-related questions, please <Link href="/contact" className="text-[#C6A355] hover:underline">contact us</Link> directly.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-muted-foreground font-body">Last updated: June 2025</p>
        </div>
      </div>
    </div>
  );
}
