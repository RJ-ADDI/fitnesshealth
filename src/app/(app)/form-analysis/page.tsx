import { PageHeader } from "@/components/page-header";
import { FormAnalysisClient } from "./components/form-analysis-client";

export default function FormAnalysisPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Exercise Form Analysis"
        description="Get real-time feedback on your exercise form to prevent injuries and maximize results."
      />
      <FormAnalysisClient />
    </div>
  );
}
