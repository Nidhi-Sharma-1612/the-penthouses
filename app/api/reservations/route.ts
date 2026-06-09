import { bookingEngineFetch } from "@/lib/guesty";
import { NextResponse } from "next/server";

type NotApplicable = {
  minNights?: boolean;
  closed?: boolean;
  bookingWindow?: boolean;
  advanceNotice?: boolean;
};

type GuestyErrorBody = {
  code?: string;
  data?: {
    moreDetails?: {
      notApplicableRatePlans?: { notApplicable?: NotApplicable }[];
    };
  };
};

function friendlyError(raw: Record<string, unknown>): NextResponse | null {
  const err = ((raw as { error?: GuestyErrorBody }).error ?? raw) as GuestyErrorBody;

  if (err.code === "LISTING_IS_NOT_AVAILABLE") {
    const plans = err.data?.moreDetails?.notApplicableRatePlans ?? [];
    if (plans.some((p) => p.notApplicable?.minNights))
      return NextResponse.json({ error: "This property requires a minimum number of nights. Please select a longer stay and try again." }, { status: 400 });
    if (plans.some((p) => p.notApplicable?.closed))
      return NextResponse.json({ error: "These dates are not available. Please choose different dates." }, { status: 400 });
    if (plans.some((p) => p.notApplicable?.bookingWindow))
      return NextResponse.json({ error: "These dates are outside the available booking window. Please try different dates." }, { status: 400 });
    if (plans.some((p) => p.notApplicable?.advanceNotice))
      return NextResponse.json({ error: "This property requires more advance notice. Please select dates further in the future." }, { status: 400 });
    return NextResponse.json({ error: "These dates are not available for this property. Please try different dates." }, { status: 400 });
  }

  if (err.code === "WRONG_REQUEST_PARAMETERS") {
    return NextResponse.json({ error: "Invalid booking details. Please check your dates and try again." }, { status: 400 });
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { listingId, checkIn, checkOut, guests, name, email, phone, message } = body;

    if (!listingId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "listingId, checkIn, and checkOut are required" },
        { status: 400 }
      );
    }

    const nameParts = (name ?? "").trim().split(" ");
    const firstName = nameParts[0] ?? "Guest";
    const lastName = nameParts.slice(1).join(" ") || "-";

    // Step 1: Create a quote
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

    // Extract rate plan ID from quote response, fall back to Guesty's default
    type RatePlan = { ratePlanId?: string; _id?: string };
    const ratePlans = quote.ratePlans as RatePlan[] | undefined;
    const ratePlanId = ratePlans?.[0]?.ratePlanId ?? ratePlans?.[0]?._id ?? "default-rateplan-id";

    // Step 2: Confirm as inquiry (no payment required)
    const confirmRes = await bookingEngineFetch(
      `/api/reservations/quotes/${quoteId}/inquiry`,
      {
        method: "POST",
        body: JSON.stringify({
          guest: {
            firstName,
            lastName,
            email: email ?? "",
            phone: phone || "0000000000",
          },
          ratePlanId,
          ...(message ? { notes: message } : {}),
        }),
      }
    );

    const confirmText = await confirmRes.text();
    let reservation: Record<string, unknown>;
    try {
      reservation = JSON.parse(confirmText);
    } catch {
      return NextResponse.json({ error: "Booking request failed. Please try again." }, { status: 500 });
    }
    if (!confirmRes.ok) {
      return friendlyError(reservation) ??
        NextResponse.json({ error: "Something went wrong with your booking request. Please try again." }, { status: confirmRes.status });
    }

    return NextResponse.json({
      reservationId: reservation.confirmationCode ?? reservation._id,
      status: reservation.status,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
