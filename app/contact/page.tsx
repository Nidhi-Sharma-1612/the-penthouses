"use client";

import { useState } from "react";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Header */}
      <div className="border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            GET IN TOUCH
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl mb-4"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            Contact Us
          </h1>
          <p className="text-muted-foreground font-light leading-relaxed font-body max-w-lg">
            Our team responds to all inquiries within a few hours. We&apos;re here
            to help you find the right penthouse and make your stay exceptional.
          </p>
        </div>
      </div>

      {/* Contact grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left: info */}
          <div>
            <h2
              className="font-heading text-2xl mb-8"
              style={{ fontWeight: 400, color: "rgb(17, 17, 17)" }}
            >
              Reach Our Team
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center shrink-0">
                  <Mail width={16} height={16} strokeWidth={1.5} className="text-[#C6A355]" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.15em] text-muted-foreground mb-1 font-body">
                    EMAIL
                  </p>
                  <a
                    href="mailto:reservations@penthousesgrandplaza.com"
                    className="text-sm font-light font-body hover:text-[#C6A355] transition-colors"
                    style={{ color: "rgb(17, 17, 17)" }}
                  >
                    reservations@penthousesgrandplaza.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center shrink-0">
                  <MapPin width={16} height={16} strokeWidth={1.5} className="text-[#C6A355]" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.15em] text-muted-foreground mb-1 font-body">
                    LOCATION
                  </p>
                  <p className="text-sm font-light font-body" style={{ color: "rgb(17, 17, 17)" }}>
                    Grand Plaza
                    <br />
                    River North, Chicago IL 60654
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 bg-[#FAFAFA] border border-gray-100">
              <p className="text-[9px] tracking-[0.15em] text-muted-foreground mb-2 font-body">
                RESPONSE TIME
              </p>
              <p
                className="font-heading text-2xl mb-1"
                style={{ fontWeight: 400, color: "rgb(17, 17, 17)" }}
              >
                Within a Few Hours
              </p>
              <p className="text-sm text-muted-foreground font-light font-body">
                We respond 7 days a week, typically within 2–4 hours during business hours.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 border border-gray-100">
                <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
                  MESSAGE SENT
                </p>
                <h3
                  className="font-heading text-3xl mb-3"
                  style={{ fontWeight: 400, color: "rgb(17, 17, 17)" }}
                >
                  Thank You
                </h3>
                <p className="text-sm text-muted-foreground font-light font-body max-w-sm">
                  We&apos;ll be in touch within a few hours. For urgent matters, email us directly.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                      YOUR NAME
                    </label>
                    <input
                      required
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                      EMAIL ADDRESS
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                    PHONE (OPTIONAL)
                  </label>
                  <input
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                    SUBJECT
                  </label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body focus:outline-none focus:border-foreground bg-white"
                  >
                    <option value="">Select a topic...</option>
                    <option>Reservation Inquiry</option>
                    <option>Availability Question</option>
                    <option>Long-Term Stay</option>
                    <option>Group Booking</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                    MESSAGE
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground resize-none"
                  />
                </div>
                {error && (
                  <p className="text-xs text-red-600 font-body">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-foreground text-white text-[10px] tracking-[0.2em] py-4 hover:bg-gray-800 transition-colors font-body cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
