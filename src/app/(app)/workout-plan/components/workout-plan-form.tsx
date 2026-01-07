"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateWorkoutPlan,
  type WorkoutPlanInput,
  type WorkoutPlanOutput,
} from "@/ai/flows/workout-plan-generation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fitnessLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  goals: z.string().min(10, "Please describe your goals in more detail."),
  equipment: z.string().min(3, "Please list your available equipment."),
  workoutDays: z.coerce.number().min(1).max(7),
});

export function WorkoutPlanForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WorkoutPlanOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fitnessLevel: "Intermediate",
      goals: "",
      equipment: "Dumbbells, resistance bands",
      workoutDays: 4,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const plan = await generateWorkoutPlan(values as WorkoutPlanInput);
      setResult(plan);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Plan",
        description: "There was an issue creating your workout plan. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
              <CardDescription>
                Provide your information to generate a tailored plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="fitnessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your fitness level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Lose 10 pounds, build upper body strength..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Equipment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Bodyweight only, dumbbells, full gym..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workoutDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workouts per Week</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading}>
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Generate Plan
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Your Custom Plan</CardTitle>
          <CardDescription>
            Here is the workout plan generated by FitAI.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {result && (
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none whitespace-pre-wrap">
              {result.workoutPlan}
            </div>
          )}
          {!loading && !result && (
            <div className="text-center text-muted-foreground h-full flex items-center justify-center">
              Your generated plan will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
