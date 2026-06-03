import { TramFront, ShoppingBag, Utensils, Camera, Music, MapPin } from "lucide-react";

const neighborhoods = [
  {
    Icon: TramFront,
    title: "Transit",
    items: [
      "CTA Red Line – Corner of the building",
      "Multiple bus routes within 1 block",
      "Chicago Riverwalk – 5 min walk",
      "O'Hare Airport – 45 min direct",
    ],
  },
  {
    Icon: ShoppingBag,
    title: "Shopping",
    items: [
      "Jewel-Osco – Inside the building",
      "Michigan Avenue – 8 min walk",
      "Magnificent Mile – 10 min walk",
      "River North Galleries – Adjacent",
    ],
  },
  {
    Icon: Utensils,
    title: "Dining",
    items: [
      "100+ restaurants within walking distance",
      "River North restaurant district",
      "Chicago Riverwalk dining",
      "Whole Foods Market – 5 min walk",
    ],
  },
  {
    Icon: Camera,
    title: "Attractions",
    items: [
      "Millennium Park – 12 min walk",
      "Navy Pier – 15 min walk",
      "Art Institute of Chicago – 15 min",
      "Chicago Riverwalk – 5 min walk",
    ],
  },
  {
    Icon: Music,
    title: "Entertainment",
    items: [
      "House of Blues – 3 min walk",
      "Chicago Theatre District – 12 min",
      "Second City Comedy Club – 5 min",
      "Live music venues on every block",
    ],
  },
  {
    Icon: MapPin,
    title: "Neighborhoods",
    items: [
      "River North (home base)",
      "The Loop – 15 min walk",
      "Gold Coast – 10 min walk",
      "Streeterville – 8 min walk",
    ],
  },
];

export default function LocationPage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Hero */}
      <div className="relative h-100 lg:h-125 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=85&fit=crop"
          alt="Chicago River North"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            THE PENTHOUSES
          </p>
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-1 font-body">
            at Grand Plaza
          </p>
          <h1
            className="font-heading text-5xl lg:text-6xl mb-3"
            style={{ fontWeight: 400, lineHeight: 1.1 }}
          >
            River North, Chicago
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-[#C6A355]" />
            <span className="text-[11px] tracking-[0.15em] text-white/80 font-body">
              WALK SCORE: 100 — WALKER&apos;S PARADISE
            </span>
          </div>
        </div>
      </div>

      {/* Scores bar */}
      <div className="bg-foreground text-white py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap justify-center gap-12">
          {[
            { score: "100", label: "WALK SCORE",    sub: "Walker's Paradise" },
            { score: "100", label: "TRANSIT SCORE", sub: "Rider's Paradise"  },
            { score: "95",  label: "BIKE SCORE",    sub: "Biker's Paradise"  },
          ].map(({ score, label, sub }) => (
            <div key={label} className="text-center">
              <p className="font-heading text-4xl text-[#C6A355]" style={{ fontWeight: 400 }}>
                {score}
              </p>
              <p className="text-[10px] tracking-[0.15em] text-white/50 mt-1 font-body">{label}</p>
              <p className="text-xs text-white/40 font-body">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Neighborhood section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
            THE NEIGHBORHOOD
          </p>
          <h2
            className="font-heading text-4xl lg:text-5xl mb-4"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            Everything at Your Doorstep
          </h2>
          <p className="text-muted-foreground font-light max-w-lg mx-auto font-body">
            Grand Plaza sits in the heart of River North — one of Chicago&apos;s most
            walkable, vibrant, and well-connected neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {neighborhoods.map(({ Icon, title, items }) => (
            <div
              key={title}
              className="p-6 border border-gray-100 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center">
                  <Icon width={18} height={18} strokeWidth={1.5} className="text-[#C6A355]" />
                </div>
                <h3
                  className="font-heading text-xl"
                  style={{ fontWeight: 400, color: "rgb(17, 17, 17)" }}
                >
                  {title}
                </h3>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-[#C6A355] rounded-full shrink-0 mt-2" />
                    <span className="text-sm text-muted-foreground font-light font-body">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#FAFAFA] border-y border-gray-100 py-14 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="font-heading text-4xl mb-3"
            style={{ fontWeight: 400, color: "rgb(17, 17, 17)", lineHeight: 1.1 }}
          >
            Ready to Experience It?
          </h2>
          <p className="text-muted-foreground font-light mb-8 font-body">
            Book direct for the best rate and experience River North from 50+ floors above.
          </p>
          <a
            href="/book"
            className="inline-block bg-foreground text-white text-[10px] tracking-[0.2em] px-10 py-4 hover:bg-gray-800 transition-colors font-body"
          >
            CHECK AVAILABILITY
          </a>
        </div>
      </div>

    </div>
  );
}
