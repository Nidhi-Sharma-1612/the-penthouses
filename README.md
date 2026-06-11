# The Penthouses at Grand Plaza

A luxury direct-booking portal for high-rise penthouse rentals in Chicago's River North. Built with Next.js 16 App Router, TypeScript, Tailwind CSS 4, and fully integrated with **Guesty Booking Engine API** for live listings, pricing, and instant paid reservations via **GuestyPay**.

## Overview

11 exclusive penthouses on the 50th–56th floors of Grand Plaza, Chicago. This site gives guests a direct-booking experience — no OTA fees, no third-party platform, full host communication. All listing data (names, pricing, images, amenities, square footage) is fetched live from Guesty PMS.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Framer Motion 12** — animations and transitions
- **Lucide React** — icons
- **Google Fonts** — Cormorant Garamond (headings) + Inter (body)
- **Guesty Booking Engine API** — live PMS integration (listings, pricing, reservations)

## Guesty Integration

All property data and bookings are handled server-side via the Guesty Booking Engine API (`https://booking.guesty.com`). Credentials are never exposed to the browser — all Guesty calls go through Next.js Route Handlers acting as a secure proxy.

```
Browser → /api/listings               → Guesty GET /api/listings
Browser → /api/listings/[id]          → Guesty GET /api/listings/{id}
Browser → /api/listings/[id]/calendar → Guesty GET /api/listings/{id}/calendar
Browser → /api/reservations/quote     → Guesty POST /api/reservations/quotes
Browser → GuestyPay Tokenization SDK  → pay.guesty.com (card details → ccToken)
Browser → /api/reservations           → Guesty POST /api/reservations/quotes/{id}/instant
```

Token is fetched via OAuth2 client_credentials flow and cached (in-memory + on-disk) to avoid repeated auth calls across requests and restarts.

### Payments

Card capture uses GuestyPay's hosted Tokenization SDK (`pay.guesty.com/tokenization/v2/init.js` — see `components/ui/GuestyPaymentForm.tsx`), so card details never touch our server. The resulting `ccToken` is sent to `/api/reservations`, which confirms the booking via Guesty's `/instant` endpoint, putting it under the account's auto-payment policy.

If the card issuer requires 3D Secure authentication, GuestyPay returns a `threeDS.authURL` and the guest is redirected off-site to authenticate. The `submit()` call includes `threeDS.successURL`/`failureURL` (pointing at `/payment-result`) so the guest is returned to a real page on our site afterward instead of a blank page — Guesty completes the reservation/charge server-side once 3DS succeeds.

### Environment Variables

Create a `.env.local` file in the project root:

```
GUESTY_BE_CLIENT_ID=your_client_id_here
GUESTY_BE_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_GUESTY_PAYMENT_PROVIDER_ID=your_guestypay_provider_id_here
```

Get the Booking Engine API credentials from your Guesty dashboard under **Marketing and Sales → Channel Management → Distribution → Guesty Booking Engine API**. The payment provider ID can be retrieved via `GET /api/listings/{id}/payment-provider` once GuestyPay is active on the account.

## Pages

| Route              | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `/`                | Home — hero, featured penthouses (live from Guesty), why book direct, location, testimonials |
| `/penthouses`      | All listings with live cards from Guesty                                                     |
| `/penthouses/[id]` | Unit detail — gallery, amenities, sidebar booking + GuestyPay payment form                   |
| `/book`            | Direct booking — penthouse selector, live quote, and instant paid confirmation via GuestyPay |
| `/payment-result`  | Landing page after a 3D Secure redirect (success/failure)                                    |
| `/compare`         | Side-by-side comparison vs Airbnb/VRBO                                                       |
| `/location`        | Neighborhood highlights and map                                                              |
| `/long-stays`      | 30+ night stay information                                                                   |
| `/contact`         | Contact form                                                                                 |
| `/faq`             | FAQ accordion                                                                                |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Ensure `.env.local` is present with valid Guesty credentials before starting — listing pages will fail to load without them, and the payment form will show "Payment is not configured yet" without `NEXT_PUBLIC_GUESTY_PAYMENT_PROVIDER_ID`.

```bash
npm run build   # production build
npm run start   # start production server
```
