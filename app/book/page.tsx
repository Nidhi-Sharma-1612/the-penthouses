import { getContentBlock } from "@/lib/content";
import { CONTENT_DEFAULTS } from "@/lib/contentDefaults";
import BookPageClient from "./BookPageClient";

export default async function BookPage() {
  const header = await getContentBlock("book", "header", CONTENT_DEFAULTS.book.header);
  return <BookPageClient header={header} />;
}
