import FaqForm from "@/components/admin/FaqForm";
import { createFaq } from "../actions";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Add FAQ</h1>
      <FaqForm action={createFaq} />
    </div>
  );
}
