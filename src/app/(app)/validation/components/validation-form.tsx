"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  validateAIRecommendation,
  type ValidateAIRecommendationInput,
  type ValidateAIRecommendationOutput,
} from "@/ai/flows/validate-ai-recommendation";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  originalData: z.string().min(1, "Original data is required."),
  recommendation: z.string().min(1, "AI recommendation is required."),
  feedback: z.string().min(10, "Please provide detailed feedback."),
});

const exampleData = {
  originalData: JSON.stringify(
    {
      fitnessLevel: "Beginner",
      goals: "Lose weight",
      equipment: "Bodyweight",
      workoutDays: 3,
    },
    null,
    2
  ),
  recommendation: `Weekly Plan:
- Monday: Full Body Strength (Squats, Push-ups, Lunges, Plank) - 3 sets of 12-15 reps.
- Wednesday: Cardio (30 minutes of jogging or brisk walking).
- Friday: Full Body Strength (Glute Bridges, Bird-Dog, Jumping Jacks, Crunches) - 3 sets of 15-20 reps.`,
};

export function ValidationForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidateAIRecommendationOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalData: exampleData.originalData,
      recommendation: exampleData.recommendation,
      feedback: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await validateAIRecommendation(
        values as ValidateAIRecommendationInput
      );
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Validating Recommendation",
        description: "There was an issue processing the validation. Please try again.",
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
              <CardTitle>Expert Review</CardTitle>
              <CardDescription>
                Provide your feedback on the AI's output.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="originalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original User Data</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={6} readOnly className="font-mono text-xs"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recommendation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI-Generated Recommendation</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={8} readOnly className="font-mono text-xs"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Expert Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'The plan is good, but for a beginner, add more rest days...'"
                        {...field}
                        rows={6}
                      />
                    </FormControl>
                    <FormDescription>
                      Suggest improvements, corrections, and refinements.
                    </FormDescription>
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
                Refine Recommendation
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Validated Output</CardTitle>
          <CardDescription>
            The refined recommendation based on your feedback.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-6">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Validated Recommendation:</h3>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none p-4 border rounded-md whitespace-pre-wrap">
                  {result.validatedRecommendation}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Reasoning for Changes:</h3>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none p-4 border rounded-md whitespace-pre-wrap">
                  {result.reasoning}
                </div>
              </div>
            </div>
          )}
          {!loading && !result && (
            <div className="text-center text-muted-foreground h-full flex items-center justify-center">
              The refined output will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
