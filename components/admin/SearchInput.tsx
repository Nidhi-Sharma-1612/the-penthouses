import { Search } from "lucide-react";

export default function SearchInput({
  defaultValue,
  placeholder = "Search...",
}: {
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full sm:w-64">
      <Search size={15} strokeWidth={1.75} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border border-border rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A355]"
      />
    </div>
  );
}
