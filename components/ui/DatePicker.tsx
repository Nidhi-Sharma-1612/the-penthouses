"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  value: string;
  onChange: (date: string) => void;
  unavailableDates: Set<string>;
  minDate?: string;
  placeholder?: string;
  alignRight?: boolean;
}

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DatePicker({
  value,
  onChange,
  unavailableDates,
  minDate,
  placeholder,
  alignRight,
}: Props) {
  const today = toDateStr(new Date());
  const effectiveMin = minDate ?? today;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const base = value || effectiveMin;
    const d = new Date(base + "T00:00:00");
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  function handleOpen() {
    const base = value || effectiveMin;
    const d = new Date(base + "T00:00:00");
    setView({ year: d.getFullYear(), month: d.getMonth() });
    setOpen((o) => !o);
  }

  function prevMonth() {
    setView(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    );
  }

  function nextMonth() {
    setView(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    );
  }

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const firstWeekday = new Date(view.year, view.month, 1).getDay();

  function handleSelect(dateStr: string) {
    onChange(dateStr);
    setOpen(false);
  }

  const displayLabel = value
    ? new Date(value + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body text-left focus:outline-none focus:border-foreground flex items-center justify-between bg-white"
      >
        <span className={value ? "text-foreground" : "text-gray-400 font-light"}>
          {displayLabel || placeholder || "Select date"}
        </span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gray-400 shrink-0 ml-2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {/* Popover calendar */}
      {open && (
        <div
          className={`absolute top-full z-50 bg-white border border-gray-200 shadow-xl mt-1 p-4 w-64 ${
            alignRight ? "right-0" : "left-0"
          }`}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ChevronLeft width={14} height={14} />
            </button>
            <span className="text-xs font-semibold font-body tracking-[0.06em]">
              {MONTH_NAMES[view.month]} {view.year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ChevronRight width={14} height={14} />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className="text-center text-[9px] tracking-wide text-muted-foreground font-body py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`gap-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${view.year}-${String(view.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isPast = dateStr < effectiveMin;
              const isBooked = unavailableDates.has(dateStr);
              const isDisabled = isPast || isBooked;
              const isSelected = dateStr === value;
              const isToday = dateStr === today;

              let cls =
                "text-[11px] font-body h-8 w-full flex items-center justify-center transition-colors ";

              if (isSelected) {
                cls += "bg-foreground text-white cursor-pointer";
              } else if (isBooked && !isPast) {
                cls += "bg-red-50 text-red-300 line-through cursor-not-allowed";
              } else if (isPast) {
                cls += "text-gray-300 cursor-not-allowed";
              } else {
                cls += "hover:bg-gray-100 cursor-pointer text-foreground";
              }

              if (isToday && !isSelected) {
                cls += " font-semibold underline decoration-[#C6A355]";
              }

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelect(dateStr)}
                  className={cls}
                  title={isBooked && !isPast ? "Already booked" : undefined}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-3 pt-2.5 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 border border-gray-300 bg-white" />
              <span className="text-[9px] text-muted-foreground font-body">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-red-50 border border-red-200" />
              <span className="text-[9px] text-muted-foreground font-body">Booked</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
