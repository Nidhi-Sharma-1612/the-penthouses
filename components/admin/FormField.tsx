export const inputClass =
  "w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A355]";
export const textareaClass = `${inputClass} min-h-[100px]`;

export function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-foreground mb-1" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}
