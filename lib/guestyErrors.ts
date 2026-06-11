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

export function friendlyError(raw: Record<string, unknown>): NextResponse | null {
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
