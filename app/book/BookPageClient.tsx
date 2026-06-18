"use client";

import { useState, useEffect, useRef } from "react";
import type { ListingCard } from "@/lib/listings";
import DatePicker from "@/components/ui/DatePicker";
import GuestyPaymentForm, { type GuestyPaymentFormHandle } from "@/components/ui/GuestyPaymentForm";

function localDateStr(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return localDateStr(d);
}

function nightsBetween(checkIn: string, checkOut: string): number {
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
}

const DEFAULT_MIN_NIGHTS = 4;

interface FormState {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface BookHeader {
  eyebrow: string;
  heading: string;
  body?: string;
  benefits: string[];
}

export default function BookPageClient({ header }: { header: BookHeader }) {
  const [listings, setListings] = useState<ListingCard[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  const [form, setForm] = useState<FormState>({
    listingId: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [step, setStep] = useState<"details" | "payment" | "done">("details");
  const [quote, setQuote] = useState<{
    quoteId: string;
    ratePlanId: string;
    fareAccommodation: number;
    cleaningFee: number;
    taxes: number;
    total: number;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [nights, setNights] = useState(0);
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set());
  const [minNightsByDate, setMinNightsByDate] = useState<Record<string, number>>({});
  const paymentRef = useRef<GuestyPaymentFormHandle>(null);

  useEffect(() => {
    fetch("/api/listings")
      .then((r) => r.json())
      .then((data) => {
        setListings(Array.isArray(data) ? data : []);
        setLoadingListings(false);
      })
      .catch(() => setLoadingListings(false));
  }, []);

  useEffect(() => {
    if (form.checkIn && form.checkOut) {
      const n = Math.round(
        (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000
      );
      setNights(n > 0 ? n : 0);
    } else {
      setNights(0);
    }
  }, [form.checkIn, form.checkOut]);

  useEffect(() => {
    if (!form.listingId) {
      setUnavailableDates(new Set());
      setMinNightsByDate({});
      return;
    }
    const from = localDateStr();
    const to = addDays(from, 365);
    fetch(`/api/listings/${form.listingId}/calendar?checkIn=${from}&checkOut=${to}`)
      .then((r) => r.json())
      .then((data) => {
        const booked = new Set<string>(
          (data.days ?? [])
            .filter((d: { available: boolean }) => !d.available)
            .map((d: { date: string }) => d.date)
        );
        setUnavailableDates(booked);

        const minNights: Record<string, number> = {};
        (data.days ?? []).forEach((d: { date: string; minNights?: number | null }) => {
          if (d.minNights) minNights[d.date] = d.minNights;
        });
        setMinNightsByDate(minNights);
      })
      .catch(() => {
        setUnavailableDates(new Set());
        setMinNightsByDate({});
      });
  }, [form.listingId]);

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  const selected = listings.find((l) => l.id === form.listingId);
  const today = localDateStr();
  const total = selected ? selected.price * nights : 0;
  const paymentConfigured = Boolean(process.env.NEXT_PUBLIC_GUESTY_PAYMENT_PROVIDER_ID);
  const effectiveMinNights = (form.checkIn && minNightsByDate[form.checkIn]) || DEFAULT_MIN_NIGHTS;

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: form.listingId,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guests: form.guests,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          typeof data.error === "string" ? data.error : JSON.stringify(data.error)
        );
      }
      setQuote({
        quoteId: data.quoteId,
        ratePlanId: data.ratePlanId,
        fareAccommodation: data.fareAccommodation,
        cleaningFee: data.cleaningFee,
        taxes: data.taxes,
        total: data.total,
      });
      setStep("payment");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!quote) return;
    setError("");
    setSubmitting(true);
    try {
      const nameParts = form.name.trim().split(" ");
      const firstName = nameParts[0] || "Guest";
      const lastName = nameParts.slice(1).join(" ") || "-";

      const ccToken = await paymentRef.current!.submit({
        amount: quote.total,
        currency: "USD",
        listingId: form.listingId,
        quoteId: quote.quoteId,
        guest: { firstName, lastName, email: form.email, phone: form.phone },
        threeDS: {
          amount: quote.total,
          currency: "USD",
          successURL: `${window.location.origin}/payment-result?status=success&quoteId=${quote.quoteId}`,
          failureURL: `${window.location.origin}/payment-result?status=failure&quoteId=${quote.quoteId}`,
        },
      });

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteId: quote.quoteId,
          ratePlanId: quote.ratePlanId,
          ccToken,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          typeof data.error === "string" ? data.error : JSON.stringify(data.error)
        );
      }
      setReservationId(data.reservationId ?? "confirmed");
      setStep("done");
    } catch (err) {
      if (err instanceof Error && err.message === "3DS_REDIRECT") return;
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Header */}
      <div className="border-b border-gray-200 py-14 lg:py-20 bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            {header.eyebrow}
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl mb-4"
            style={{ fontWeight: 400, lineHeight: 1.1 }}
          >
            {header.heading}
          </h1>
          <p className="text-white/60 font-light leading-relaxed font-body">
            {header.body}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8">
            {header.benefits.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C6A355]" />
                <span className="text-[11px] tracking-widest text-white/60 font-body">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form / Confirmation */}
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

        {step === "done" ? (
          /* ── Confirmation ── */
          <div className="text-center py-20 border border-gray-100 px-8">
            <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
              RESERVATION CONFIRMED
            </p>
            <h2
              className="font-heading text-4xl mb-3"
              style={{ fontWeight: 400, color: "rgb(17, 17, 17)" }}
            >
              Thank You
            </h2>
            <p className="text-sm text-muted-foreground font-light font-body max-w-sm mx-auto mb-6">
              Your payment was successful and your reservation is confirmed. A confirmation email is on its way.
            </p>
            <div className="inline-block border border-gray-200 bg-gray-50 px-6 py-4">
              <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body mb-1.5">
                CONFIRMATION CODE
              </p>
              <p className="font-mono text-sm text-foreground tracking-wide select-all">
                {reservationId}
              </p>
              <p className="text-[9px] text-muted-foreground font-body mt-1.5">
                Quote this number if you contact us
              </p>
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <form className="space-y-6" onSubmit={step === "details" ? handleContinue : handlePay}>

            {step === "details" ? (
              <>
                {/* Penthouse selector */}
                <div>
                  <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                    SELECT PENTHOUSE
                  </label>
                  {loadingListings ? (
                    <div className="w-full border border-gray-200 px-4 py-3.5 text-sm font-body text-gray-400 bg-gray-50">
                      Loading residences…
                    </div>
                  ) : (
                    <select
                      required
                      value={form.listingId}
                      onChange={(e) => set("listingId", e.target.value)}
                      className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body focus:outline-none focus:border-foreground bg-white"
                    >
                      <option value="">Choose a residence…</option>
                      {listings.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name} — {l.beds} Bed / {l.baths} Bath · From ${l.price.toLocaleString()}/night
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                      CHECK-IN DATE
                    </label>
                    <DatePicker
                      value={form.checkIn}
                      onChange={(date) => {
                        set("checkIn", date);
                        const minNightsForDate = minNightsByDate[date] || DEFAULT_MIN_NIGHTS;
                        if (form.checkOut && nightsBetween(date, form.checkOut) < minNightsForDate) {
                          set("checkOut", "");
                        }
                      }}
                      unavailableDates={unavailableDates}
                      minDate={today}
                      placeholder="Select date"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                      CHECK-OUT DATE
                    </label>
                    <DatePicker
                      value={form.checkOut}
                      onChange={(date) => set("checkOut", date)}
                      unavailableDates={unavailableDates}
                      minDate={form.checkIn ? addDays(form.checkIn, effectiveMinNights) : addDays(today, DEFAULT_MIN_NIGHTS)}
                      placeholder="Select date"
                      alignRight
                    />
                  </div>
                </div>

                {form.listingId && (
                  <p className="text-[10px] text-muted-foreground font-body -mt-2">
                    Minimum stay: {effectiveMinNights} night{effectiveMinNights !== 1 ? "s" : ""}
                  </p>
                )}

                {/* Guests */}
                <div>
                  <label className="block text-[9px] tracking-[0.15em] text-foreground mb-2 font-body">
                    NUMBER OF GUESTS
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={selected?.maxGuests ?? 16}
                    placeholder="e.g. 4"
                    value={form.guests}
                    onChange={(e) => set("guests", Number(e.target.value))}
                    className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body focus:outline-none focus:border-foreground"
                  />
                </div>

                {/* Price preview */}
                {selected && nights > 0 && (
                  <div className="bg-gray-50 border border-gray-100 px-4 py-4 space-y-1.5">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground font-light">
                        ${selected.price.toLocaleString()} × {nights} night{nights !== 1 ? "s" : ""}
                      </span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-[#C6A355] font-body">
                      Book Direct &amp; Save — ${selected.savingsPerNight}/night vs OTA
                    </p>
                    <p className="text-[10px] text-muted-foreground font-body">
                      Estimated — final pricing with taxes &amp; fees shown on the next step
                    </p>
                  </div>
                )}

                {/* Guest details */}
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-[9px] tracking-[0.15em] text-muted-foreground mb-4 font-body">
                    YOUR DETAILS
                  </p>
                  <div className="space-y-4">
                    <input
                      required
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                    />
                    <input
                      placeholder="Phone number (optional)"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                    />
                    <textarea
                      rows={4}
                      placeholder="Tell us about your stay — special occasion, group composition, any requests…"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      className="w-full border border-gray-300 px-4 py-3.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground resize-none"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Booking summary */}
                <div className="bg-gray-50 border border-gray-100 px-4 py-4 space-y-1.5">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground font-light">{selected?.name}</span>
                    <span>{form.checkIn} → {form.checkOut}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground font-light">
                      {nights} night{nights !== 1 ? "s" : ""} accommodation
                    </span>
                    <span>${(quote?.fareAccommodation ?? 0).toLocaleString()}</span>
                  </div>
                  {!!quote?.cleaningFee && (
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground font-light">Cleaning fee</span>
                      <span>${quote.cleaningFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground font-light">Taxes &amp; fees</span>
                    <span>${(quote?.taxes ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold font-body border-t border-gray-100 pt-2">
                    <span>Total due</span>
                    <span>${(quote?.total ?? 0).toFixed(2)}</span>
                  </div>
                </div>

                <GuestyPaymentForm
                  ref={paymentRef}
                  providerId={process.env.NEXT_PUBLIC_GUESTY_PAYMENT_PROVIDER_ID ?? ""}
                  containerId="guesty-payment-book"
                />
              </>
            )}

            {/* Error */}
            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-700 font-body">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || loadingListings || (step === "payment" && !paymentConfigured)}
              className="w-full bg-foreground text-white text-[11px] tracking-[0.2em] py-5 hover:bg-gray-800 transition-colors font-body cursor-pointer disabled:opacity-60"
            >
              {step === "details"
                ? (submitting ? "CHECKING AVAILABILITY…" : "CONTINUE TO PAYMENT")
                : (submitting ? "PROCESSING…" : "BOOK & PAY")}
            </button>

            {step === "payment" && (
              <button
                type="button"
                onClick={() => { setStep("details"); setError(""); }}
                className="w-full text-center text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-body cursor-pointer"
              >
                ← BACK TO DETAILS
              </button>
            )}

            <p className="text-center text-xs text-muted-foreground font-body">
              {step === "details"
                ? "Secure checkout · Best rate guaranteed · Direct confirmation"
                : "Your card will be charged according to our payment schedule. You'll receive a confirmation email immediately."}
            </p>

          </form>
        )}
      </div>

    </div>
  );
}
