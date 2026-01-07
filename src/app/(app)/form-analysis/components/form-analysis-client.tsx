"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  exerciseFormAnalysisFeedback,
  type ExerciseFormAnalysisOutput,
} from "@/ai/flows/exercise-form-analysis-feedback";

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
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  exerciseName: z.string().min(3, "Please enter the exercise name."),
  userDescription: z.string().optional(),
  video: z.instanceof(File).refine(file => file.size > 0, 'Please upload a video file.'),
});

export function FormAnalysisClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExerciseFormAnalysisOutput | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exerciseName: "Squat",
      userDescription: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("video", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const videoDataUri = await fileToDataUri(values.video);
      const feedback = await exerciseFormAnalysisFeedback({
        exerciseName: values.exerciseName,
        userDescription: values.userDescription,
        videoDataUri,
      });
      setResult(feedback);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Analyzing Form",
        description:
          "There was an issue analyzing your video. Please try again.",
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
              <CardTitle>Analyze Your Form</CardTitle>
              <CardDescription>
                Upload a short video of your exercise.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="exerciseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exercise Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Deadlift, Push-up" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I have a slight pain in my left shoulder."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide any context about your body or limitations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exercise Video</FormLabel>
                    <FormControl>
                      <div className="w-full">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {field.value ? "Change video" : "Upload video"}
                        </Button>
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {videoPreview && (
                <div className="aspect-video w-full rounded-md overflow-hidden border">
                    <video src={videoPreview} controls className="w-full h-full object-cover" />
                </div>
              )}
               {!videoPreview && (
                <div className="aspect-video w-full rounded-md border border-dashed flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <Video className="mx-auto h-12 w-12" />
                        <p className="mt-2">Video preview will appear here</p>
                    </div>
                </div>
              )}


            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading}>
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Analyze Form
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>AI Feedback</CardTitle>
          <CardDescription>
            Corrections and tips from our AI personal trainer.
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
              {result.feedback}
            </div>
          )}
          {!loading && !result && (
            <div className="text-center text-muted-foreground h-full flex items-center justify-center">
              Your feedback will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
