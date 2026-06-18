"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export interface FaqGroup {
  category: string;
  items: { q: string; a: string }[];
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-start justify-between w-full py-5 text-left gap-4 cursor-pointer"
      >
        <span className="text-[15px] font-light text-foreground font-body">{q}</span>
        {open ? (
          <X width={16} height={16} className="shrink-0 mt-0.5 text-muted-foreground" />
        ) : (
          <Plus width={16} height={16} className="shrink-0 mt-0.5 text-muted-foreground" />
        )}
      </button>
      {open && (
        <p className="pb-5 text-sm text-muted-foreground font-light leading-relaxed font-body">{a}</p>
      )}
    </div>
  );
}

export default function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <>
      {groups.map(({ category, items }) => (
        <div key={category} className="mb-12">
          <p className="text-[9px] tracking-[0.2em] text-muted-foreground mb-6 font-body">{category}</p>
          {items.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      ))}
    </>
  );
}
