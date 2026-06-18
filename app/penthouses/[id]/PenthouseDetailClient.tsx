"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Bed, Bath, Maximize2, Users } from "lucide-react";
import type { ListingDetail } from "@/lib/listings";
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

interface LocationHighlights {
  heading: string;
  items: string[];
}

export default function PenthouseDetailClient({
  locationHighlights,
}: {
  locationHighlights: LocationHighlights;
}) {
  const { id } = useParams<{ id: string }>();
  const [ph, setPh] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
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
  const paymentRef = useRef<GuestyPaymentFormHandle>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [nights, setNights] = useState(0);
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set());
  const [minNightsByDate, setMinNightsByDate] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then((r) => r.json())
      .then((data) => { setPh(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  // Fetch a year of availability once listing is known, so the date picker
  // can show blocked dates across the whole booking horizon, not just 3 months.
  useEffect(() => {
    if (!id) return;
    const from = localDateStr();
    const to = addDays(from, 365);
    fetch(`/api/listings/${id}/calendar?checkIn=${from}&checkOut=${to}`)
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
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!checkIn || !checkOut || !id) return;
    const n = Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
    );
    setNights(n > 0 ? n : 0);
    if (n <= 0) { setTotalPrice(null); return; }
    fetch(`/api/listings/${id}/calendar?checkIn=${checkIn}&checkOut=${checkOut}`)
      .then((r) => r.json())
      .then((data) => { if (data.totalPrice) setTotalPrice(data.totalPrice); })
      .catch(() => {});
  }, [checkIn, checkOut, id]);

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!ph) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId: ph.id, checkIn, checkOut, guests }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(typeof data.error === "string" ? data.error : JSON.stringify(data.error));
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
    if (!ph || !quote) return;
    setError("");
    setSubmitting(true);
    try {
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0] || "Guest";
      const lastName = nameParts.slice(1).join(" ") || "-";

      const ccToken = await paymentRef.current!.submit({
        amount: quote.total,
        currency: "USD",
        listingId: ph.id,
        quoteId: quote.quoteId,
        guest: { firstName, lastName, email, phone },
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
          name, email, phone, message: notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(typeof data.error === "string" ? data.error : JSON.stringify(data.error));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C6A355] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground font-body">Loading penthouse details...</p>
        </div>
      </div>
    );
  }

  if (!ph) {
    return (
      <div style={{ backgroundColor: "#ffffff" }} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-body text-sm">Penthouse not found.</p>
          <Link href="/penthouses" className="text-[10px] tracking-widest font-body text-foreground mt-4 inline-block underline">
            Back to all penthouses
          </Link>
        </div>
      </div>
    );
  }

  const images = ph.images.length > 0
    ? ph.images
    : ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=85"];

  const displayPrice = totalPrice ?? (nights > 0 ? ph.price * nights : null);
  const paymentConfigured = Boolean(process.env.NEXT_PUBLIC_GUESTY_PAYMENT_PROVIDER_ID);
  const effectiveMinNights = (checkIn && minNightsByDate[checkIn]) || DEFAULT_MIN_NIGHTS;

  return (
    <div style={{ backgroundColor: "#ffffff" }} className="pb-24 lg:pb-0">

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 px-5 py-3 flex items-center justify-between">
        <div>
          <span className="font-heading text-2xl" style={{ fontWeight: 400 }}>${ph.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground font-body"> / night</span>
          <p className="text-[10px] text-[#C6A355] font-body">${ph.savingsPerNight} savings vs. Airbnb</p>
        </div>
        <a href="#booking-form" className="bg-foreground text-white text-[10px] tracking-[0.2em] px-6 py-3 font-body">
          BOOK NOW
        </a>
      </div>

      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 border-b border-gray-100">
        <Link
          href="/penthouses"
          className="flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <ArrowLeft width={14} height={14} />
          BACK TO ALL PENTHOUSES
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* LEFT: main content */}
          <div className="lg:col-span-2">

            {/* Gallery — main image */}
            <div className="relative mb-3 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[activeImg]}
                alt={ph.name}
                className="w-full h-100 lg:h-140 object-cover"
              />
              <button
                onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 transition-colors cursor-pointer"
              >
                <ChevronLeft width={18} height={18} strokeWidth={2} />
              </button>
              <button
                onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 transition-colors cursor-pointer"
              >
                <ChevronRight width={18} height={18} strokeWidth={2} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${i === activeImg ? "bg-white" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 gap-2 mb-10">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`overflow-hidden border-2 transition-colors cursor-pointer ${i === activeImg ? "border-foreground" : "border-transparent"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-20 object-cover hover:opacity-80 transition-opacity" />
                </button>
              ))}
            </div>

            {/* Name + badges */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                {ph.badges.map((badge) => (
                  <span key={badge} className="text-[9px] tracking-[0.15em] border border-gray-300 px-3 py-1 font-body">
                    {badge}
                  </span>
                ))}
              </div>
              {ph.floor && (
                <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-2 font-body">
                  {ph.floor.toUpperCase()} · GRAND PLAZA, RIVER NORTH
                </p>
              )}
              <h1 className="font-heading text-4xl lg:text-5xl mb-2" style={{ fontWeight: 400 }}>
                {ph.name}
              </h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-gray-100">
              <div className="text-center p-4 border border-gray-100">
                <Bed width={18} height={18} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
                <p className="font-heading text-2xl mb-0.5" style={{ fontWeight: 400 }}>{ph.beds}</p>
                <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">BEDROOMS</p>
              </div>
              <div className="text-center p-4 border border-gray-100">
                <Bath width={18} height={18} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
                <p className="font-heading text-2xl mb-0.5" style={{ fontWeight: 400 }}>{ph.baths}</p>
                <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">BATHROOMS</p>
              </div>
              <div className="text-center p-4 border border-gray-100">
                <Maximize2 width={18} height={18} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
                <p className="font-heading text-2xl mb-0.5" style={{ fontWeight: 400 }}>{ph.sqft || "—"}</p>
                <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">SQUARE FEET</p>
              </div>
              <div className="text-center p-4 border border-gray-100">
                <Users width={18} height={18} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
                <p className="font-heading text-2xl mb-0.5" style={{ fontWeight: 400 }}>{ph.maxGuests}</p>
                <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">MAX GUESTS</p>
              </div>
            </div>

            {/* About */}
            <div className="mb-10 pb-10 border-b border-gray-100">
              <h2 className="font-heading text-2xl mb-4" style={{ fontWeight: 400 }}>About This Residence</h2>
              <p className="text-muted-foreground font-light leading-relaxed text-[15px] font-body">{ph.about}</p>
              {ph.space && (
                <p className="text-muted-foreground font-light leading-relaxed text-[15px] font-body mt-3">{ph.space}</p>
              )}
            </div>

            {/* Amenities */}
            {ph.amenities.length > 0 && (
              <div className="mb-10">
                <h2 className="font-heading text-2xl mb-6" style={{ fontWeight: 400 }}>Amenities &amp; Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                  {ph.amenities.slice(0, 20).map((a) => (
                    <div key={a} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-[#C6A355] rounded-full shrink-0" />
                      <span className="text-sm text-muted-foreground font-light font-body">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-[#FAFAFA] p-6 border border-gray-100">
              <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400 }}>{locationHighlights.heading}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {locationHighlights.items.map((h) => (
                  <div key={h} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#C6A355] rounded-full shrink-0" />
                    <span className="text-xs text-muted-foreground font-body">{h}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: sticky booking sidebar */}
          <div className="lg:col-span-1" id="booking-form">
            <div className="sticky top-28">
              <div className="border border-gray-200">

                {/* Dark header */}
                <div className="bg-foreground text-white p-5">
                  <p className="text-[9px] tracking-[0.2em] text-white/50 mb-1 font-body">BOOK DIRECT &amp; SAVE</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-3xl" style={{ fontWeight: 400 }}>${ph.price.toLocaleString()}</span>
                    <span className="text-white/60 text-sm font-light font-body">/ night</span>
                  </div>
                  <p className="text-[10px] text-white/50 mt-2 font-body">
                    Book Direct &amp; Save —{" "}
                    <span className="text-[#C6A355]">${ph.savingsPerNight} savings per night</span> vs. Airbnb
                  </p>
                </div>

                {/* Form */}
                {step === "done" ? (
                  <div className="p-6 text-center">
                    <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">RESERVATION CONFIRMED</p>
                    <p className="font-heading text-2xl mb-2" style={{ fontWeight: 400 }}>Thank You</p>
                    <p className="text-xs text-muted-foreground font-light font-body mb-5">
                      Your payment was successful and your reservation is confirmed.
                    </p>
                    {reservationId && (
                      <div className="border border-gray-200 bg-gray-50 px-4 py-3 text-left">
                        <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body mb-1">
                          CONFIRMATION CODE
                        </p>
                        <p className="font-mono text-xs text-foreground tracking-wide select-all break-all">
                          {reservationId}
                        </p>
                        <p className="text-[9px] text-muted-foreground font-body mt-1">
                          Quote this if you contact us
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <form className="p-5 space-y-3" onSubmit={step === "details" ? handleContinue : handlePay}>
                    {step === "details" ? (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] tracking-[0.15em] text-foreground mb-1.5 font-body">CHECK-IN</label>
                            <DatePicker
                              value={checkIn}
                              onChange={(date) => {
                                setCheckIn(date);
                                const minNightsForDate = minNightsByDate[date] || DEFAULT_MIN_NIGHTS;
                                if (checkOut && nightsBetween(date, checkOut) < minNightsForDate) {
                                  setCheckOut("");
                                }
                              }}
                              unavailableDates={unavailableDates}
                              minDate={localDateStr()}
                              placeholder="Select"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] tracking-[0.15em] text-foreground mb-1.5 font-body">CHECK-OUT</label>
                            <DatePicker
                              value={checkOut}
                              onChange={setCheckOut}
                              unavailableDates={unavailableDates}
                              minDate={checkIn ? addDays(checkIn, effectiveMinNights) : addDays(localDateStr(), DEFAULT_MIN_NIGHTS)}
                              placeholder="Select"
                              alignRight
                            />
                          </div>
                        </div>

                        {checkIn && (
                          <p className="text-[10px] text-muted-foreground font-body">
                            Minimum stay: {effectiveMinNights} night{effectiveMinNights !== 1 ? "s" : ""}
                          </p>
                        )}

                        <div>
                          <label className="block text-[9px] tracking-[0.15em] text-foreground mb-1.5 font-body">GUESTS</label>
                          <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-foreground bg-white"
                          >
                            {Array.from({ length: ph.maxGuests }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                            ))}
                          </select>
                        </div>

                        {/* Price breakdown */}
                        {nights > 0 && (
                          <div className="border-t border-gray-100 pt-3 space-y-1.5">
                            <div className="flex justify-between text-sm font-body">
                              <span className="text-muted-foreground font-light">${ph.price.toLocaleString()} × {nights} night{nights !== 1 ? "s" : ""}</span>
                              <span>${(ph.price * nights).toLocaleString()}</span>
                            </div>
                            {ph.cleaningFee > 0 && (
                              <div className="flex justify-between text-sm font-body">
                                <span className="text-muted-foreground font-light">Cleaning fee</span>
                                <span>${ph.cleaningFee.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm font-semibold font-body border-t border-gray-100 pt-2">
                              <span>Total</span>
                              <span>${((displayPrice ?? 0) + ph.cleaningFee).toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground font-body">
                              Estimated — final pricing with taxes &amp; fees shown on the next step
                            </p>
                          </div>
                        )}

                        <div className="border-t border-gray-100 pt-3">
                          <p className="text-[9px] tracking-[0.15em] text-muted-foreground mb-3 font-body">YOUR DETAILS</p>
                          <div className="space-y-3">
                            <input
                              required
                              placeholder="Full name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                            />
                            <input
                              required
                              type="email"
                              placeholder="Email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                            />
                            <input
                              placeholder="Phone (optional)"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                            />
                            <textarea
                              rows={3}
                              placeholder="Any questions or special requests?"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground resize-none"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Booking summary */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-sm font-body">
                            <span className="text-muted-foreground font-light">{checkIn} → {checkOut}</span>
                            <span>{guests} guest{guests !== 1 ? "s" : ""}</span>
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
                          containerId="guesty-payment-detail"
                        />
                      </>
                    )}

                    {error && (
                      <div className="border border-red-200 bg-red-50 px-3 py-2.5">
                        <p className="text-xs text-red-700 font-body">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting || (step === "payment" && !paymentConfigured)}
                      className="w-full bg-foreground text-white text-[10px] tracking-[0.2em] py-4 hover:bg-gray-800 transition-colors font-body cursor-pointer disabled:opacity-60"
                    >
                      {step === "details"
                        ? (submitting ? "CHECKING…" : "CONTINUE TO PAYMENT")
                        : (submitting ? "PROCESSING…" : "BOOK & PAY")}
                    </button>

                    {step === "payment" && (
                      <button
                        type="button"
                        onClick={() => { setStep("details"); setError(""); }}
                        className="w-full text-center text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-body cursor-pointer"
                      >
                        ← BACK TO DETAILS
                      </button>
                    )}

                    <p className="text-center text-[10px] text-muted-foreground font-body">
                      {step === "details"
                        ? "No fees · Best rate guaranteed · Direct confirmation"
                        : "Charged according to our payment schedule. Confirmation sent immediately."}
                    </p>
                  </form>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
