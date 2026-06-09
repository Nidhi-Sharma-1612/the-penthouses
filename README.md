# The Penthouses at Grand Plaza

A luxury direct-booking portal for high-rise penthouse rentals in Chicago's River North. Built with Next.js 15 App Router, TypeScript, Tailwind CSS 4, and fully integrated with **Guesty Booking Engine API** for live listings, pricing, and reservation inquiries.

## Overview

11 exclusive penthouses on the 50th–56th floors of Grand Plaza, Chicago. This site gives guests a direct-booking experience — no OTA fees, no third-party platform, full host communication. All listing data (names, pricing, images, amenities, square footage) is fetched live from Guesty PMS.

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Framer Motion 12** — animations and transitions
- **Lucide React** — icons
- **Google Fonts** — Cormorant Garamond (headings) + Inter (body)
- **Guesty Booking Engine API** — live PMS integration (listings, pricing, reservations)

## Guesty Integration

All property data is fetched server-side from the Guesty Booking Engine API (`https://booking.guesty.com`). Credentials are never exposed to the browser — all Guesty calls go through Next.js Route Handlers acting as a secure proxy.

```
Browser → /api/listings           → Guesty GET /api/listings
Browser → /api/listings/[id]      → Guesty GET /api/listings/{id}
Browser → /api/reservations       → Guesty POST reservation inquiry
```

Token is fetched via OAuth2 client_credentials flow and cached globally to avoid repeated auth calls on every request.

### Environment Variables

Create a `.env.local` file in the project root:

```
GUESTY_BE_CLIENT_ID=your_client_id_here
GUESTY_BE_CLIENT_SECRET=your_client_secret_here
```

Get these from your Guesty dashboard under **Marketing and Sales → Channel Management → Distribution → Guesty Booking Engine API**.

## Pages

| Route              | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `/`                | Home — hero, featured penthouses (live from Guesty), why book direct, location, testimonials |
| `/penthouses`      | All listings with live cards from Guesty                                                     |
| `/penthouses/[id]` | Unit detail — gallery, amenities, sidebar booking form                                       |
| `/book`            | Direct booking inquiry form with live penthouse selector                                     |
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

Ensure `.env.local` is present with valid Guesty credentials before starting — listing pages will fail to load without them.

```bash
npm run build   # production build
npm run start   # start production server
```
