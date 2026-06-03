# The Penthouses at Grand Plaza

A luxury direct-booking portal for high-rise penthouse rentals in Chicago's River North. Built as a pixel-perfect frontend clone using Next.js App Router, TypeScript, and Tailwind CSS 4.

## Overview

11 exclusive penthouses on the 50th–56th floors of Grand Plaza, Chicago. This site gives guests a direct-booking experience — no OTA fees, no third-party platform, full host communication.

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Framer Motion 12** — animations and transitions
- **Lucide React** — icons
- **Google Fonts** — Cormorant Garamond (headings) + Inter (body)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured penthouses, why book direct, location, testimonials |
| `/penthouses` | All 11 units listing with cards |
| `/penthouses/[id]` | Unit detail — gallery, amenities, booking form |
| `/book` | Direct booking inquiry form |
| `/compare` | Side-by-side comparison vs Airbnb/VRBO |
| `/location` | Neighborhood highlights and map |
| `/long-stays` | 30+ night stay information |
| `/contact` | Contact form |
| `/faq` | FAQ accordion |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Tokens

- **Gold accent:** `#C6A355`
- **Dark foreground:** `#0A0B0D`
- **Muted text:** `#6B7280`
- **Background:** `#FFFFFF`

## Deployment

Planned deployment on **Vercel** with DNS via **Hostinger**.

```bash
npm run build   # production build
npm run start   # start production server
```
