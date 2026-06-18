import CompareRowForm from "@/components/admin/CompareRowForm";
import { createCompareRow } from "../actions";

export default function NewCompareRowPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Add Comparison Row</h1>
      <CompareRowForm action={createCompareRow} />
    </div>
  );
}
