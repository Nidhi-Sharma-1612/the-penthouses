import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";
import PenthouseDetailClient from "./PenthouseDetailClient";

export default async function PenthouseDetailPage() {
  const locationHighlights = await getContentBlock(
    "penthouses",
    "locationHighlights",
    CONTENT_DEFAULTS.penthouses.locationHighlights
  );
  return <PenthouseDetailClient locationHighlights={locationHighlights} />;
}
