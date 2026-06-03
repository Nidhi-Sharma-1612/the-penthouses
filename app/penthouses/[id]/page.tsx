"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Bed, Bath, Maximize2, Users } from "lucide-react";

type Penthouse = {
  id: string;
  name: string;
  floor: string;
  subtitle: string;
  beds: number;
  baths: number;
  sqft: string;
  maxGuests: number;
  price: number;
  savingsPerNight: number;
  badges: string[];
  about: string;
  amenities: string[];
  locationHighlights: string[];
  images: string[];
};

const BASE_AMENITIES = [
  "Full kitchen",
  "In-unit washer/dryer",
  "Smart TV",
  "High-speed WiFi",
  "Premium linens & towels",
  "Concierge service",
  "Building gym access",
  "Pool access",
  "24-hour doorman",
  "Secure parking available",
];

const BASE_LOCATION = [
  "Walk Score: 100",
  "CTA Red Line: Corner",
  "Jewel-Osco: In Building",
  "Michigan Ave: 5 min",
  "Millennium Park: 10 min",
  "Navy Pier: 15 min",
];

const penthouses: Penthouse[] = [
  {
    id: "5506",
    name: "Penthouse #1",
    floor: "55th/56th Floor",
    subtitle: "A sanctuary of light and skyline.",
    beds: 3,
    baths: 2,
    sqft: "2,200",
    maxGuests: 8,
    price: 899,
    savingsPerNight: 135,
    badges: ["TWO-STORY", "FIREPLACE", "LAKE VIEW", "BALCONY"],
    about:
      "Penthouse #1 is the cornerstone of the collection. A three-bedroom penthouse offering sweeping panoramic views of Lake Michigan and the Chicago skyline. With floor-to-ceiling windows throughout, a private balcony, and a fireplace, this penthouse delivers an experience unlike anything available through a standard hotel or rental platform.",
    amenities: [...BASE_AMENITIES, "Expansive wrap-around balcony"],
    locationHighlights: BASE_LOCATION,
    images: [
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/228ed6e14_03_540NStateSt_5506_1_LivingRoom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/368aaa9ce_04_540NStateSt_5506_165_LivingRoom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/87b1269da_05_540NStateSt_5506_10001_LivingRoom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/557d9cfbf_06_540NStateSt_5506_93_LivingRoomDiningRoom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/ef11a5c89_07_540NStateSt_5506_93001_LivingRoomDiningRoom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/2afa6fecc_09_540NStateSt_5506_93003_LivingRoomDiningRoom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/8a13b04df_10_540NStateSt_5506_177001_Kitchen_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/fd527fba8_11_540NStateSt_5506_177002_Kitchen_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/578938c02_12_540NStateSt_5506_358_BreakfastArea_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/c3a0cccc5_13_540NStateSt_5506_2_DiningRoom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/0d969d747_14_540NStateSt_5506_178_MasterBedroom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/9d3f59d11_16_540NStateSt_5506_153_2ndBedroom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/10b0a31c4_17_540NStateSt_5506_154_3rdBedroom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/dbc5a72e7_18_540NStateSt_5506_9_2ndBathroom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/0bb4922ff_15_540NStateSt_5506_13_MasterBathroom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/2176082b0_19_540NStateSt_5506_44_LaundryRoom_HiRes.jpg",
      "https://media.base44.com/images/public/6a19a1ea36ff0cb3ba316a87/3f854e717_20_540NStateSt_5506_99_Balcony_HiRes.jpg",
    ],
  },
  {
    id: "5304",
    name: "Penthouse #2",
    floor: "53rd Floor",
    subtitle: "Fireplace elegance above the city.",
    beds: 2,
    baths: 3,
    sqft: "1,800",
    maxGuests: 6,
    price: 799,
    savingsPerNight: 120,
    badges: ["FIREPLACE", "LAKE VIEW", "BALCONY"],
    about:
      "Penthouse #2 offers two bedrooms and three bathrooms on the 53rd floor with stunning lake views and a wood-burning fireplace. A private balcony extends the living space outdoors, overlooking the city below.",
    amenities: [...BASE_AMENITIES, "Wood-burning fireplace", "Private balcony"],
    locationHighlights: BASE_LOCATION,
    images: [
      "https://cdn.base44.com/base44dev/apps/68311f4a6e6c4acb5f68ff07/media/the-penthouses-at-grand-plaza-direct-booking-chicago-il.png",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1400&q=85&fit=crop",
    ],
  },
  {
    id: "5301",
    name: "Penthouse #3",
    floor: "53rd Floor",
    subtitle: "Open-plan living with lake panoramas.",
    beds: 2,
    baths: 3,
    sqft: "1,750",
    maxGuests: 6,
    price: 799,
    savingsPerNight: 120,
    badges: ["LAKE VIEW", "BALCONY"],
    about:
      "Penthouse #3 is a two-bedroom, three-bath residence with open-plan living and sweeping lake views from the 53rd floor. A generous private balcony and abundant natural light define the space.",
    amenities: [...BASE_AMENITIES, "Private balcony"],
    locationHighlights: BASE_LOCATION,
    images: [
      "https://cdn.base44.com/base44dev/apps/68311f4a6e6c4acb5f68ff07/media/3-the-penthouses-at-grand-plaza-direct-booking-chicago-il.png",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=85&fit=crop",
    ],
  },
  {
    id: "5108",
    name: "Penthouse #4",
    floor: "51st Floor",
    subtitle: "Spacious two-bedroom with city views.",
    beds: 2,
    baths: 2,
    sqft: "1,600",
    maxGuests: 6,
    price: 799,
    savingsPerNight: 120,
    badges: ["BALCONY"],
    about:
      "Penthouse #4 is a two-bedroom, two-bath residence on the 51st floor with a private balcony and impressive city views. Generously appointed interiors make this an ideal choice for families or groups.",
    amenities: [...BASE_AMENITIES, "Private balcony"],
    locationHighlights: BASE_LOCATION,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1400&q=85&fit=crop",
    ],
  },
  {
    id: "5207",
    name: "Penthouse #5",
    floor: "52nd Floor",
    subtitle: "Intimate retreat with lake views.",
    beds: 1,
    baths: 1,
    sqft: "900",
    maxGuests: 4,
    price: 399,
    savingsPerNight: 60,
    badges: ["LAKE VIEW"],
    about:
      "Penthouse #5 is an intimate one-bedroom suite on the 52nd floor with direct lake views. Perfect for couples or solo travelers seeking penthouse-level luxury without the footprint.",
    amenities: BASE_AMENITIES,
    locationHighlights: BASE_LOCATION,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&fit=crop",
    ],
  },
  {
    id: "5302",
    name: "Penthouse #6",
    floor: "53rd Floor",
    subtitle: "Classic warmth with a fireplace focal point.",
    beds: 2,
    baths: 2,
    sqft: "1,400",
    maxGuests: 6,
    price: 699,
    savingsPerNight: 105,
    badges: ["FIREPLACE"],
    about:
      "Penthouse #6 is a two-bedroom, two-bath residence centered around a stunning fireplace. On the 53rd floor with refined finishes and a warm, residential feel.",
    amenities: [...BASE_AMENITIES, "Wood-burning fireplace"],
    locationHighlights: BASE_LOCATION,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&fit=crop",
    ],
  },
  {
    id: "5107",
    name: "Penthouse #7",
    floor: "51st Floor",
    subtitle: "Urban luxury at its most refined.",
    beds: 1,
    baths: 1,
    sqft: "850",
    maxGuests: 4,
    price: 399,
    savingsPerNight: 60,
    badges: [],
    about:
      "Penthouse #7 is a one-bedroom residence on the 51st floor with clean lines and a serene atmosphere. Thoughtfully designed for the discerning solo traveler or couple.",
    amenities: BASE_AMENITIES,
    locationHighlights: BASE_LOCATION,
    images: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=85&fit=crop",
    ],
  },
  {
    id: "5203",
    name: "Penthouse #9",
    floor: "52nd Floor",
    subtitle: "Light-filled retreat above River North.",
    beds: 1,
    baths: 1,
    sqft: "820",
    maxGuests: 4,
    price: 399,
    savingsPerNight: 60,
    badges: [],
    about:
      "Penthouse #9 is a light-filled one-bedroom residence on the 52nd floor. An ideal base for exploring Chicago's finest neighborhoods, dining, and culture.",
    amenities: BASE_AMENITIES,
    locationHighlights: BASE_LOCATION,
    images: [
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1400&q=85&fit=crop",
    ],
  },
  {
    id: "5206",
    name: "Penthouse #10",
    floor: "52nd Floor",
    subtitle: "Refined simplicity, fifty floors up.",
    beds: 1,
    baths: 1,
    sqft: "780",
    maxGuests: 2,
    price: 299,
    savingsPerNight: 45,
    badges: [],
    about:
      "Penthouse #10 is a refined one-bedroom residence on the 52nd floor. Understated elegance and outstanding value make this the ideal choice for the solo traveler or couple.",
    amenities: BASE_AMENITIES,
    locationHighlights: BASE_LOCATION,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=85&fit=crop",
    ],
  },
  {
    id: "5006",
    name: "Penthouse #11",
    floor: "50th Floor",
    subtitle: "An elevated escape in the heart of River North.",
    beds: 1,
    baths: 1,
    sqft: "750",
    maxGuests: 2,
    price: 249,
    savingsPerNight: 37,
    badges: [],
    about:
      "Penthouse #11 is a comfortable one-bedroom residence on the 50th floor. Full penthouse amenities and building access at an exceptional nightly rate.",
    amenities: BASE_AMENITIES,
    locationHighlights: BASE_LOCATION,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1400&q=85&fit=crop",
    ],
  },
  {
    id: "5005",
    name: "Penthouse #12",
    floor: "50th Floor",
    subtitle: "Studio luxury above the city.",
    beds: 0,
    baths: 1,
    sqft: "600",
    maxGuests: 2,
    price: 239,
    savingsPerNight: 36,
    badges: [],
    about:
      "Penthouse #12 is a studio residence on the 50th floor — the most intimate unit in the collection. Full access to all Grand Plaza amenities with a compact, beautifully appointed layout.",
    amenities: BASE_AMENITIES,
    locationHighlights: BASE_LOCATION,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1400&q=85&fit=crop",
    ],
  },
];

export default function PenthousePage() {
  const { id } = useParams<{ id: string }>();
  const ph = penthouses.find((p) => p.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  if (!ph) {
    return (
      <div style={{ backgroundColor: "#ffffff" }} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-body text-sm">Penthouse not found.</p>
          <Link href="/penthouses" className="text-[10px] tracking-widest font-body text-foreground mt-4 inline-block underline">
            Back to all penthouses
          </Link>
        </div>
      </div>
    );
  }

  function prev() {
    setActiveImg((i) => (i - 1 + ph!.images.length) % ph!.images.length);
  }
  function next() {
    setActiveImg((i) => (i + 1) % ph!.images.length);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ backgroundColor: "#ffffff" }} className="pb-24 lg:pb-0">

      {/* Mobile sticky booking bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 px-5 py-3 flex items-center justify-between">
        <div>
          <span className="font-heading text-2xl" style={{ fontWeight: 400 }}>${ph.price}</span>
          <span className="text-sm text-muted-foreground font-body"> / night</span>
          <p className="text-[10px] text-[#C6A355] font-body">${ph.savingsPerNight} savings vs. Airbnb</p>
        </div>
        <a
          href="#booking-form"
          className="bg-foreground text-white text-[10px] tracking-[0.2em] px-6 py-3 font-body"
        >
          BOOK NOW
        </a>
      </div>

      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 border-b border-gray-100">
        <Link
          href="/penthouses"
          className="flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <ArrowLeft width={14} height={14} />
          BACK TO ALL PENTHOUSES
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left column */}
          <div className="lg:col-span-2">

            {/* Gallery — main image */}
            <div className="relative mb-3 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ph.images[activeImg]}
                alt={ph.name}
                className="w-full h-100 lg:h-140 object-cover"
              />
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 transition-colors cursor-pointer"
              >
                <ChevronLeft width={18} height={18} strokeWidth={2} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 transition-colors cursor-pointer"
              >
                <ChevronRight width={18} height={18} strokeWidth={2} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {ph.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${i === activeImg ? "bg-white" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 gap-2 mb-10">
              {ph.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`overflow-hidden border-2 transition-colors cursor-pointer ${i === activeImg ? "border-foreground" : "border-transparent"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt=""
                    className="w-full h-20 object-cover hover:opacity-80 transition-opacity"
                  />
                </button>
              ))}
            </div>

            {/* Name + badges */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                {ph.badges.map((badge) => (
                  <span key={badge} className="text-[9px] tracking-[0.15em] border border-gray-300 px-3 py-1 font-body">
                    {badge}
                  </span>
                ))}
              </div>
              <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-2 font-body">
                {ph.floor} · GRAND PLAZA, RIVER NORTH
              </p>
              <h1 className="font-heading text-4xl lg:text-5xl mb-2" style={{ fontWeight: 400 }}>
                {ph.name}
              </h1>
              <p className="text-muted-foreground font-light italic font-heading text-xl">
                {ph.subtitle}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-gray-100">
              <div className="text-center p-4 border border-gray-100">
                <Bed width={18} height={18} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
                <p className="font-heading text-2xl mb-0.5" style={{ fontWeight: 400 }}>{ph.beds}</p>
                <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">BEDROOMS</p>
              </div>
              <div className="text-center p-4 border border-gray-100">
                <Bath width={18} height={18} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
                <p className="font-heading text-2xl mb-0.5" style={{ fontWeight: 400 }}>{ph.baths}</p>
                <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">BATHROOMS</p>
              </div>
              <div className="text-center p-4 border border-gray-100">
                <Maximize2 width={18} height={18} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
                <p className="font-heading text-2xl mb-0.5" style={{ fontWeight: 400 }}>{ph.sqft}</p>
                <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">SQUARE FEET</p>
              </div>
              <div className="text-center p-4 border border-gray-100">
                <Users width={18} height={18} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
                <p className="font-heading text-2xl mb-0.5" style={{ fontWeight: 400 }}>{ph.maxGuests}</p>
                <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">MAX GUESTS</p>
              </div>
            </div>

            {/* About */}
            <div className="mb-10 pb-10 border-b border-gray-100">
              <h2 className="font-heading text-2xl mb-4" style={{ fontWeight: 400 }}>About This Residence</h2>
              <p className="text-muted-foreground font-light leading-relaxed text-[15px] font-body">
                {ph.about}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <h2 className="font-heading text-2xl mb-6" style={{ fontWeight: 400 }}>Amenities &amp; Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                {ph.amenities.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#C6A355] rounded-full shrink-0" />
                    <span className="text-sm text-muted-foreground font-light font-body">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location highlights */}
            <div className="bg-[#FAFAFA] p-6 border border-gray-100">
              <h2 className="font-heading text-xl mb-3" style={{ fontWeight: 400 }}>Unbeatable Location</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ph.locationHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#C6A355] rounded-full shrink-0" />
                    <span className="text-xs text-muted-foreground font-body">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right column — sticky booking form */}
          <div className="lg:col-span-1" id="booking-form">
            <div className="sticky top-28">
              <div className="border border-gray-200">

                {/* Dark header */}
                <div className="bg-foreground text-white p-5">
                  <p className="text-[9px] tracking-[0.2em] text-white/50 mb-1 font-body">BOOK DIRECT &amp; SAVE</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-3xl" style={{ fontWeight: 400 }}>${ph.price}</span>
                    <span className="text-white/60 text-sm font-light font-body">/ night</span>
                  </div>
                  <p className="text-[10px] text-white/50 mt-2 font-body">
                    Book Direct &amp; Save —{" "}
                    <span className="text-[#C6A355]">${ph.savingsPerNight} savings per night</span> vs. Airbnb
                  </p>
                </div>

                {/* Form body */}
                {submitted ? (
                  <div className="p-8 text-center">
                    <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">INQUIRY RECEIVED</p>
                    <p className="font-heading text-2xl mb-2" style={{ fontWeight: 400 }}>Thank You</p>
                    <p className="text-xs text-muted-foreground font-light font-body">
                      Our team will be in touch within a few hours to confirm availability.
                    </p>
                  </div>
                ) : (
                  <form className="p-5 space-y-3" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] tracking-[0.15em] text-foreground mb-1.5 font-body">CHECK-IN</label>
                        <input
                          type="date"
                          required
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] tracking-[0.15em] text-foreground mb-1.5 font-body">CHECK-OUT</label>
                        <input
                          type="date"
                          required
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-foreground"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.15em] text-foreground mb-1.5 font-body">GUESTS</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-foreground bg-white"
                      >
                        {Array.from({ length: ph.maxGuests }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                        ))}
                      </select>
                    </div>
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-[9px] tracking-[0.15em] text-muted-foreground mb-3 font-body">YOUR DETAILS</p>
                      <div className="space-y-3">
                        <input
                          required
                          placeholder="Full name"
                          className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email address"
                          className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                        />
                        <input
                          placeholder="Phone (optional)"
                          className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground"
                        />
                        <textarea
                          rows={3}
                          placeholder="Any questions or special requests?"
                          className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground resize-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-foreground text-white text-[10px] tracking-[0.2em] py-4 hover:bg-gray-800 transition-colors font-body cursor-pointer"
                    >
                      REQUEST TO BOOK
                    </button>
                    <p className="text-center text-[10px] text-muted-foreground font-body">
                      No fees · Best rate guaranteed · Fast response
                    </p>
                  </form>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
