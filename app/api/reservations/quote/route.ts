import { bookingEngineFetch } from "@/lib/guesty";
import { friendlyError } from "@/lib/guestyErrors";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { listingId, checkIn, checkOut, guests } = body;

    if (!listingId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "listingId, checkIn, and checkOut are required" },
        { status: 400 }
      );
    }

    const quoteRes = await bookingEngineFetch("/api/reservations/quotes", {
      method: "POST",
      body: JSON.stringify({
        listingId,
        checkInDateLocalized: checkIn,
        checkOutDateLocalized: checkOut,
        guestsCount: guests ?? 2,
      }),
    });

    const quoteText = await quoteRes.text();
    let quote: Record<string, unknown>;
    try {
      quote = JSON.parse(quoteText);
    } catch {
      return NextResponse.json({ error: "Unable to get a price quote. Please try again." }, { status: 500 });
    }
    if (!quoteRes.ok) {
      return friendlyError(quote) ??
        NextResponse.json({ error: "These dates are not available. Please try different dates." }, { status: quoteRes.status });
    }

    const quoteId = quote._id as string;

    type RatePlan = { ratePlanId?: string; _id?: string };
    const ratePlans = quote.ratePlans as RatePlan[] | undefined;
    const ratePlanId = ratePlans?.[0]?.ratePlanId ?? ratePlans?.[0]?._id ?? "default-rateplan-id";

    return NextResponse.json({ quoteId, ratePlanId });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
