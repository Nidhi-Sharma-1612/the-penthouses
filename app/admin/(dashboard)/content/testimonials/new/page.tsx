import TestimonialForm from "@/components/admin/TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Add Testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
