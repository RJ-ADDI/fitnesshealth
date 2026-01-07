import { PageHeader } from "@/components/page-header";
import { ValidationForm } from "./components/validation-form";

export default function ValidationPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Recommendation Validation"
        description="For fitness experts: Review, refine, and validate AI-generated recommendations."
      />
      <ValidationForm />
    </div>
  );
}
