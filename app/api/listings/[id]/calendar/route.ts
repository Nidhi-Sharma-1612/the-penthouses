import { fetchCalendar } from "@/lib/listings";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  if (!checkIn || !checkOut) {
    return NextResponse.json({ error: "checkIn and checkOut required" }, { status: 400 });
  }

  try {
    const calendar = await fetchCalendar(id, checkIn, checkOut);
    return NextResponse.json(calendar);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
