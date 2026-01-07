import { PageHeader } from "@/components/page-header";
import { WorkoutPlanForm } from "./components/workout-plan-form";

export default function WorkoutPlanPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Personalized Workout Plan"
        description="Let our AI craft the perfect workout plan for your needs."
      />
      <WorkoutPlanForm />
    </div>
  );
}
