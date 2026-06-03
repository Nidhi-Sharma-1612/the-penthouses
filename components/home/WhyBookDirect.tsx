import Link from "next/link";
import { DollarSign, Phone, Clock, Shield } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "$0 Service Fees",
    description: "No Airbnb or VRBO platform fees added to your rate",
  },
  {
    icon: Phone,
    title: "Direct Concierge Access",
    description:
      "Personal contact with our team before, during, and after your stay",
  },
  {
    icon: Clock,
    title: "Easy Check-In",
    description:
      "We provide everything you need before arrival, including detailed instructions and direct support if questions come up.",
  },
  {
    icon: Shield,
    title: "Best Rate Guaranteed",
    description:
      "Book direct and we guarantee you won't find it cheaper elsewhere",
  },
];

export default function WhyBookDirect() {
  return (
    <section className="py-16 lg:py-24" style={{ background: "rgb(255, 255, 255)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              fontWeight: 400,
              color: "rgb(198, 163, 85)",
              textTransform: "uppercase",
            }}
          >
            WHY BOOK DIRECT
          </p>

          <h2
            className="text-4xl lg:text-5xl mb-4"
            style={{
              fontFamily: "var(--font-heading), serif",
              fontWeight: 400,
              color: "rgb(17, 17, 17)",
              lineHeight: 1.1,
            }}
          >
            Skip the Platform.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>Save 10–15%.</em>
          </h2>

          <p
            className="max-w-lg mx-auto"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              color: "rgb(107, 114, 128)",
              lineHeight: 1.625,
            }}
          >
            When you book directly with us, you get better pricing, more
            flexibility, and a host who actually picks up the phone.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="text-center p-6 border border-gray-100 hover:border-[#C6A355]/40 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 border border-gray-200 flex items-center justify-center">
                    <Icon
                      width={20}
                      height={20}
                      strokeWidth={1.5}
                      style={{ color: "rgb(198, 163, 85)" }}
                    />
                  </div>
                </div>

                <p
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    color: "rgb(17, 17, 17)",
                  }}
                >
                  {b.title}
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgb(107, 114, 128)",
                    lineHeight: 1.625,
                  }}
                >
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA block */}
        <div className="text-center">
          <div
            className="inline-block max-w-2xl w-full px-6 py-8 sm:px-12"
            style={{ background: "rgb(10, 11, 13)" }}
          >
            <p
              className="mb-2"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              LIMITED AVAILABILITY
            </p>

            <h3
              className="text-3xl mb-3"
              style={{
                fontFamily: "var(--font-heading), serif",
                fontWeight: 400,
                color: "rgb(255, 255, 255)",
              }}
            >
              Reserve Your Penthouse
            </h3>

            <p
              className="text-sm mb-6"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              11 exclusive residences. Book direct for the best rate and a
              personal experience.
            </p>

            <Link
              href="/book"
              className="inline-block px-8 py-4 bg-[#C6A355] hover:bg-[#D4B675] transition-colors"
              style={{
                color: "rgb(10, 11, 13)",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              CHECK AVAILABILITY
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
