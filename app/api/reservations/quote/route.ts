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

    interface InvoiceItem { amount: number }
    interface Money {
      fareAccommodation?: number;
      fareCleaning?: number;
      totalTaxes?: number;
      invoiceItems?: InvoiceItem[];
    }
    type RatePlanEntry = { ratePlanId?: string; ratePlan?: { _id?: string; money?: Money } };

    const ratePlanEntry = (quote.rates as { ratePlans?: RatePlanEntry[] } | undefined)
      ?.ratePlans?.[0];
    const ratePlanId =
      ratePlanEntry?.ratePlanId ?? ratePlanEntry?.ratePlan?._id ?? "default-rateplan-id";

    const money = ratePlanEntry?.ratePlan?.money;
    const fareAccommodation = money?.fareAccommodation ?? 0;
    const cleaningFee = money?.fareCleaning ?? 0;
    const taxes = money?.totalTaxes ?? 0;
    const total = money?.invoiceItems?.length
      ? money.invoiceItems.reduce((sum, item) => sum + item.amount, 0)
      : fareAccommodation + cleaningFee + taxes;

    return NextResponse.json({ quoteId, ratePlanId, fareAccommodation, cleaningFee, taxes, total });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
