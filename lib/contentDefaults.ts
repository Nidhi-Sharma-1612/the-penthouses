// Default values for each editable marketing copy block, matching what was
// previously hardcoded in the page components. Used both as the initial
// seed data (prisma/seed.ts) and as the fallback when no admin edit exists
// yet, so nothing on the public site changes until someone edits it in /admin.

export interface HeroBlock {
  image?: string;
  eyebrow: string;
  eyebrow2?: string;
  heading: string;
  headingEmphasis?: string;
  body?: string;
}

export interface BenefitCopy {
  title: string;
  description: string;
}

export interface WhyBookDirectBlock {
  eyebrow: string;
  heading: string;
  headingEmphasis: string;
  body: string;
  benefits: BenefitCopy[];
  ctaEyebrow: string;
  ctaHeading: string;
  ctaBody: string;
}

export interface CategoryCopy {
  title: string;
  items: string[];
}

export interface ScoreCopy {
  score: string;
  label: string;
  sub: string;
}

export interface SectionCopy {
  heading: string;
  body: string;
}

export const CONTENT_DEFAULTS = {
  home: {
    hero: {
      image: "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/f8ab9408a_5506croppedmainphoto.jpg",
      eyebrow: "50+ Floors Above River North",
      heading: "Luxury Penthouses.",
      headingEmphasis: "Unrivaled Views.",
      body:
        "Extraordinary penthouses with sweeping skyline and lake views, impeccable design, and all the space you need to live exceptionally.",
      ctaPrimaryLabel: "VIEW PENTHOUSES",
      ctaSecondaryLabel: "BOOK DIRECT",
    },
    featuresStrip: {
      items: [
        { title: "50+ FLOORS UP", description: "Breathtaking skyline\nand lake views" },
        { title: "SPACIOUS LAYOUTS", description: "Expansive living areas\nwith refined finishes" },
        { title: "FULL KITCHENS", description: "Premium appliances,\ncookware, and dining" },
        { title: "BALCONIES", description: "Private outdoor space in\nmost residences" },
        { title: "FIREPLACES", description: "Warmth and ambiance\nin select penthouses" },
        { title: "PARKING", description: "Limited discount parking\navailable" },
        { title: "DIRECT BOOKING", description: "Best rates. No fees.\nPersonalized service." },
      ] as BenefitCopy[],
    },
    featuredPenthouses: {
      eyebrow: "Penthouses Designed for the Way You Live",
      viewAllLabel: "VIEW ALL PENTHOUSES",
    },
    grandPlazaExperience: {
      image: "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/c3a0cccc5_13_540NStateSt_5506_2_DiningRoom_HiRes.jpg",
      eyebrow: "The Grand Plaza Experience",
      heading: "Above the City.",
      headingEmphasis: "Beyond the Ordinary.",
      body:
        "Set high above downtown Chicago, The Penthouses at Grand Plaza combine privacy, space, and skyline views for guests who want more than a standard hotel stay.",
      buttonLabel: "LEARN MORE",
    },
    whyBookDirect: {
      eyebrow: "WHY BOOK DIRECT",
      heading: "Skip the Platform.",
      headingEmphasis: "Save 10–15%.",
      body:
        "When you book directly with us, you get better pricing, more flexibility, and a host who actually picks up the phone.",
      benefits: [
        { title: "$0 Service Fees", description: "No Airbnb or VRBO platform fees added to your rate" },
        {
          title: "Direct Concierge Access",
          description: "Personal contact with our team before, during, and after your stay",
        },
        {
          title: "Easy Check-In",
          description:
            "We provide everything you need before arrival, including detailed instructions and direct support if questions come up.",
        },
        {
          title: "Best Rate Guaranteed",
          description: "Book direct and we guarantee you won't find it cheaper elsewhere",
        },
      ],
      ctaEyebrow: "LIMITED AVAILABILITY",
      ctaHeading: "Reserve Your Penthouse",
      ctaBody: "11 exclusive residences. Book direct for the best rate and a personal experience.",
    } as WhyBookDirectBlock,
    testimonialsHeader: {
      eyebrow: "GUEST EXPERIENCES",
      heading: "What Our Guests Say",
      ratingLabel: "5.0 · 200+ stays",
    },
    footer: {
      description:
        "Luxury penthouse living in the heart of Chicago's River North. Eleven exceptional residences, 50+ floors above the city.",
      walkScoreLabel: "WALK SCORE: 100",
      copyrightLine: "© 2025 The Penthouses at Grand Plaza. All rights reserved.",
    },
  },
  faq: {
    intro: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Everything You Need to Know",
      body: "If you don't find your answer here, contact us directly — we respond to all inquiries within a few hours.",
    } as HeroBlock,
    cta: {
      heading: "Still Have Questions?",
      body: "Our team is available 7 days a week. Reach out directly and expect a fast, personal response.",
      button1Label: "CONTACT US",
      button2Label: "BOOK DIRECT",
    },
  },
  location: {
    hero: {
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=85&fit=crop",
      eyebrow: "THE PENTHOUSES",
      eyebrow2: "at Grand Plaza",
      heading: "River North, Chicago",
    } as HeroBlock,
    neighborhoods: {
      eyebrow: "THE NEIGHBORHOOD",
      heading: "Everything at Your Doorstep",
      body:
        "Grand Plaza sits in the heart of River North — one of Chicago's most walkable, vibrant, and well-connected neighborhoods.",
      scores: [
        { score: "100", label: "WALK SCORE", sub: "Walker's Paradise" },
        { score: "100", label: "TRANSIT SCORE", sub: "Rider's Paradise" },
        { score: "95", label: "BIKE SCORE", sub: "Biker's Paradise" },
      ] as ScoreCopy[],
      categories: [
        {
          title: "Transit",
          items: [
            "CTA Red Line – Corner of the building",
            "Multiple bus routes within 1 block",
            "Chicago Riverwalk – 5 min walk",
            "O'Hare Airport – 45 min direct",
          ],
        },
        {
          title: "Shopping",
          items: [
            "Jewel-Osco – Inside the building",
            "Michigan Avenue – 8 min walk",
            "Magnificent Mile – 10 min walk",
            "River North Galleries – Adjacent",
          ],
        },
        {
          title: "Dining",
          items: [
            "100+ restaurants within walking distance",
            "River North restaurant district",
            "Chicago Riverwalk dining",
            "Whole Foods Market – 5 min walk",
          ],
        },
        {
          title: "Attractions",
          items: [
            "Millennium Park – 12 min walk",
            "Navy Pier – 15 min walk",
            "Art Institute of Chicago – 15 min",
            "Chicago Riverwalk – 5 min walk",
          ],
        },
        {
          title: "Entertainment",
          items: [
            "House of Blues – 3 min walk",
            "Chicago Theatre District – 12 min",
            "Second City Comedy Club – 5 min",
            "Live music venues on every block",
          ],
        },
        {
          title: "Neighborhoods",
          items: [
            "River North (home base)",
            "The Loop – 15 min walk",
            "Gold Coast – 10 min walk",
            "Streeterville – 8 min walk",
          ],
        },
      ] as CategoryCopy[],
    },
    cta: {
      heading: "Ready to Experience It?",
      body: "Book direct for the best rate and experience River North from 50+ floors above.",
      buttonLabel: "CHECK AVAILABILITY",
    },
  },
  "long-stays": {
    hero: {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&fit=crop",
      eyebrow: "30+ NIGHT STAYS",
      heading: "Your Chicago Home",
      headingEmphasis: "For As Long As You Need.",
      body:
        "Extended stay arrangements at significant savings. Full penthouse living with all the privacy, space, and amenities of a permanent residence.",
    } as HeroBlock,
    benefits: {
      eyebrow: "THE LONG STAY ADVANTAGE",
      heading: "Why Stay for a Month or More",
      benefits: [
        {
          title: "Discounted Monthly Rates",
          description:
            "Stays of 30+ nights qualify for significant savings. Contact us for custom monthly pricing tailored to your needs.",
        },
        {
          title: "Fully Furnished Living",
          description:
            "Move in with nothing but a suitcase. Full kitchen, premium linens, housewares, and everything you need to live comfortably.",
        },
        {
          title: "Work From Home Ready",
          description:
            "High-speed dedicated WiFi, ample desk space, and a quiet penthouse environment designed for focus and productivity.",
        },
        {
          title: "Flexible Terms",
          description:
            "Month-to-month arrangements available. No lengthy lease commitments — stay as long as you need, then extend or depart on your timeline.",
        },
      ],
    } as { eyebrow: string; heading: string; benefits: BenefitCopy[] },
    whoStays: {
      eyebrow: "PERFECT FOR",
      heading: "Who Stays With Us",
      items: [
        "Corporate relocations and project assignments",
        "Entertainment industry productions (film, TV, music tours)",
        "Medical professionals on extended rotations",
        "Families undergoing home renovations",
        "Remote workers seeking a Chicago base",
        "Executives in transition between residences",
        "Athletes during their season or training periods",
        "Legal or consulting professionals on long engagements",
      ],
    },
    cta: {
      eyebrow: "GET MONTHLY PRICING",
      heading: "Custom Rates for Long Stays",
      body:
        "Monthly rates are priced individually based on unit, timing, and length of stay. Contact us directly to receive a personalized quote within a few hours.",
      buttonLabel: "REQUEST MONTHLY PRICING",
    },
  },
  compare: {
    hero: {
      eyebrow: "THE DIRECT ADVANTAGE",
      heading: "Why Book Direct?",
      body: "A side-by-side look at the real difference between booking directly with us versus through a third-party platform.",
    } as HeroBlock,
    tableLabels: {
      featureLabel: "FEATURE",
      directLabel: "BOOK DIRECT",
      directSubLabel: "The Penthouses",
      airbnbLabel: "AIRBNB",
      vrboLabel: "VRBO",
      ctaButtonLabel: "BOOK DIRECT NOW",
    },
  },
  contact: {
    header: {
      eyebrow: "GET IN TOUCH",
      heading: "Contact Us",
      body:
        "Our team responds to all inquiries within a few hours. We're here to help you find the right penthouse and make your stay exceptional.",
    } as HeroBlock,
    info: {
      teamHeading: "Reach Our Team",
      responseTimeLabel: "RESPONSE TIME",
      responseTimeHeading: "Within a Few Hours",
      responseTimeBody: "We respond 7 days a week, typically within 2–4 hours during business hours.",
    },
  },
  book: {
    header: {
      eyebrow: "DIRECT RESERVATION",
      heading: "Reserve Your Penthouse",
      body: "Book directly with us and enjoy the best rate, no platform fees, and a personal host experience.",
      benefits: ["$0 Service Fees", "Best Rate Guaranteed", "Direct Concierge Access"],
    },
  },
  penthouses: {
    header: {
      eyebrow: "RIVER NORTH, CHICAGO",
      heading: "The Penthouse Collection",
      body:
        "Eleven extraordinary residences, each uniquely positioned above the city. From intimate one-bedroom sanctuaries to expansive two-story penthouses.",
    } as HeroBlock,
    locationHighlights: {
      heading: "Unbeatable Location",
      items: [
        "Walk Score: 100",
        "CTA Red Line: Corner",
        "Jewel-Osco: In Building",
        "Michigan Ave: 5 min",
        "Millennium Park: 10 min",
        "Navy Pier: 15 min",
      ],
    },
  },
  privacy: {
    page: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "1. Information We Collect",
          body:
            "When you make a reservation inquiry, we collect your name, email address, phone number, and stay details. We use this information solely to process your reservation and communicate with you about your stay.",
        },
        {
          heading: "2. How We Use Your Information",
          body:
            "Your personal information is used to confirm reservations, process payments, and provide you with a personalized experience. We do not sell, trade, or share your information with third parties except as required to process your booking.",
        },
        {
          heading: "3. Data Security",
          body:
            "We take the security of your personal information seriously. All data is transmitted over secure, encrypted connections. We do not store credit card information on our servers.",
        },
        {
          heading: "4. Cookies",
          body:
            "Our website uses essential cookies to ensure proper functionality. We do not use tracking or advertising cookies. You may disable cookies in your browser settings, though some site features may not function correctly.",
        },
        {
          heading: "5. Third-Party Services",
          body:
            "We use Guesty, a professional property management platform, to manage reservations. Your booking information is shared with Guesty solely for reservation processing purposes. Guesty's privacy practices are governed by their own privacy policy.",
        },
        {
          heading: "6. Your Rights",
          body:
            "You may request access to, correction of, or deletion of your personal information at any time by contacting us. We will respond to all requests within 30 days.",
        },
      ] as SectionCopy[],
      contactHeading: "7. Contact",
      contactBody: "For privacy-related questions, please {contact} directly.",
      lastUpdated: "June 2025",
    },
  },
  terms: {
    page: {
      title: "Terms of Service",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          body:
            "By accessing and using this website and making reservations through The Penthouses at Grand Plaza, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
        },
        {
          heading: "2. Reservations & Bookings",
          body:
            "All reservations are subject to availability and confirmation by our team. A reservation is not confirmed until you receive written confirmation and a signed rental agreement. We reserve the right to refuse any reservation at our discretion.",
        },
        {
          heading: "3. Payment",
          body:
            "Payment terms will be outlined in your rental agreement. A security deposit is required at the time of booking and will be returned within 7 business days of checkout, provided no damage has occurred beyond normal wear and tear.",
        },
        {
          heading: "4. Cancellation Policy",
          body:
            "Cancellations made 14 or more days before check-in are eligible for a full refund. Cancellations within 14 days of check-in are non-refundable. We recommend purchasing travel insurance to protect your reservation.",
        },
        {
          heading: "5. Guest Responsibilities",
          body:
            "Guests are responsible for maintaining the property in good condition during their stay. Smoking is not permitted in any unit. Pets are not allowed. Events or parties beyond the registered guest count are prohibited.",
        },
        {
          heading: "6. Limitation of Liability",
          body:
            "The Penthouses at Grand Plaza is not liable for any indirect, incidental, or consequential damages arising from your use of our services or stay at our properties. Our liability is limited to the amount paid for the reservation.",
        },
      ] as SectionCopy[],
      contactHeading: "7. Contact",
      contactBody: "For questions about these terms, please {contact}.",
      lastUpdated: "June 2025",
    },
  },
};
