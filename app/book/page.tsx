"use client";

import { useState } from "react";

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Header */}
      <div className="border-b border-gray-200 py-14 lg:py-20 bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            DIRECT RESERVATION
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl mb-4"
            style={{ fontWeight: 400, lineHeight: 1.1 }}
          >
            Reserve Your Penthouse
          </h1>
          <p className="text-white/60 font-light leading-relaxed font-body">
            Book directly with us and enjoy the best rate, no platform fees, and a personal host experience.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8">
            {["$0 Service Fees", "Best Rate Guaranteed", "Direct Concierge Access"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C6A355]" />
                <span className="text-[11px] tracking-widest text-white/60 font-body">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        {submitted ? (
          <div className="text-center py-20 border border-gray-100">
            <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
              INQUIRY RECEIVED
            </p>
            <h2
              className="font-heading text-4xl mb-3"
              style={{ fontWeight: 400, color: "rgb(17, 17, 17)" }}
            >
              Thank You
            </h2>
            <p className="text-sm text-muted-foreground font-light font-body max-w-sm mx-auto">
              Our team will review your request and be in touch within a few hours to confirm availability and next steps.
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                SELECT PENTHOUSE
              </label>
              <select
                required
                className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body focus:outline-none focus:border-foreground bg-white"
              >
                <option value="">Choose a residence...</option>
                <option value="5506">Penthouse #1 — 3 Bed / 2 Bath · From $899/night</option>
                <option value="5304">Penthouse #2 — 2 Bed / 3 Bath · From $799/night</option>
                <option value="5301">Penthouse #3 — 2 Bed / 3 Bath · From $799/night</option>
                <option value="5108">Penthouse #4 — 2 Bed / 2 Bath · From $799/night</option>
                <option value="5207">Penthouse #5 — 1 Bed / 1 Bath · From $399/night</option>
                <option value="5302">Penthouse #6 — 2 Bed / 2 Bath · From $699/night</option>
                <option value="5107">Penthouse #7 — 1 Bed / 1 Bath · From $399/night</option>
                <option value="5203">Penthouse #9 — 1 Bed / 1 Bath · From $399/night</option>
                <option value="5206">Penthouse #10 — 1 Bed / 1 Bath · From $299/night</option>
                <option value="5006">Penthouse #11 — 1 Bed / 1 Bath · From $249/night</option>
                <option value="5005">Penthouse #12 — 0 Bed / 1 Bath · From $239/night</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                  CHECK-IN DATE
                </label>
                <input
                  type="date"
                  required
                  className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body focus:outline-none focus:border-foreground"
                />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                  CHECK-OUT DATE
                </label>
                <input
                  type="date"
                  required
                  className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body focus:outline-none focus:border-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                NUMBER OF GUESTS
              </label>
              <input
                type="number"
                required
                min={1}
                max={16}
                placeholder="e.g. 4"
                className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-[9px] tracking-[0.15em] text-muted-foreground mb-4 font-body">
                YOUR DETAILS
              </p>
              <div className="space-y-4">
                <input
                  required
                  placeholder="Full name"
                  className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                />
                <input
                  placeholder="Phone number (optional)"
                  className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                />
                <textarea
                  rows={4}
                  placeholder="Tell us about your stay — special occasion, group composition, any requests..."
                  className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-foreground text-white text-[11px] tracking-[0.2em] py-5 hover:bg-gray-800 transition-colors font-body cursor-pointer"
            >
              SUBMIT RESERVATION INQUIRY
            </button>
            <p className="text-center text-xs text-muted-foreground font-body">
              No payment required now · Our team will contact you to confirm availability
            </p>
          </form>
        )}
      </div>

    </div>
  );
}
