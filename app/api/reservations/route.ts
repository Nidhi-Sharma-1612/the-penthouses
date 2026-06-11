import { bookingEngineFetch } from "@/lib/guesty";
import { friendlyError } from "@/lib/guestyErrors";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quoteId, ratePlanId, ccToken, name, email, phone, message } = body;

    if (!quoteId || !ratePlanId || !ccToken) {
      return NextResponse.json(
        { error: "quoteId, ratePlanId, and ccToken are required" },
        { status: 400 }
      );
    }

    const nameParts = (name ?? "").trim().split(" ");
    const firstName = nameParts[0] ?? "Guest";
    const lastName = nameParts.slice(1).join(" ") || "-";

    const confirmRes = await bookingEngineFetch(
      `/api/reservations/quotes/${quoteId}/instant`,
      {
        method: "POST",
        body: JSON.stringify({
          ratePlanId,
          ccToken,
          guest: {
            firstName,
            lastName,
            email: email ?? "",
            phone: phone || "0000000000",
          },
          ...(message ? { notes: message } : {}),
        }),
      }
    );

    const confirmText = await confirmRes.text();
    let reservation: Record<string, unknown>;
    try {
      reservation = JSON.parse(confirmText);
    } catch {
      return NextResponse.json({ error: "Booking could not be completed. Please try again." }, { status: 500 });
    }
    if (!confirmRes.ok) {
      return friendlyError(reservation) ??
        NextResponse.json({ error: "Your card could not be processed. Please try again or use a different card." }, { status: confirmRes.status });
    }

    return NextResponse.json({
      reservationId: reservation.confirmationCode ?? reservation._id,
      status: reservation.status,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
