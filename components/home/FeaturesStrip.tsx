import {
  Building2,
  LayoutTemplate,
  UtensilsCrossed,
  Wind,
  Flame,
  CarFront,
  BadgeCheck,
} from "lucide-react";
import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";

const ICONS = [Building2, LayoutTemplate, UtensilsCrossed, Wind, Flame, CarFront, BadgeCheck];

export default async function FeaturesStrip() {
  const content = await getContentBlock("home", "featuresStrip", CONTENT_DEFAULTS.home.featuresStrip);
  const features = content.items.map((item, i) => ({ ...item, Icon: ICONS[i] ?? Building2 }));

  return (
    <div
      style={{
        borderTop: "1px solid rgb(229, 229, 229)",
        borderBottom: "1px solid rgb(229, 229, 229)",
        background: "rgb(255, 255, 255)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-9">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-4">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-2.5"
            >
              <Icon width={28} height={28} stroke="#1a1a1a" strokeWidth={1} />
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: "rgb(26, 26, 26)",
                    margin: "0 0 5px",
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 300,
                    color: "rgb(136, 136, 136)",
                    lineHeight: 1.55,
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
