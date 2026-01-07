'use server';

/**
 * @fileOverview A workout plan generation AI agent.
 *
 * - generateWorkoutPlan - A function that handles the workout plan generation process.
 * - WorkoutPlanInput - The input type for the generateWorkoutPlan function.
 * - WorkoutPlanOutput - The return type for the generateWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WorkoutPlanInputSchema = z.object({
  fitnessLevel: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .describe('The user\u2019s current fitness level.'),
  goals: z.string().describe('The user\u2019s fitness goals.'),
  equipment: z.string().describe('The equipment available to the user.'),
  workoutDays: z
    .number()
    .min(1)
    .max(7)
    .describe('The number of days per week the user wants to workout.'),
});
export type WorkoutPlanInput = z.infer<typeof WorkoutPlanInputSchema>;

const WorkoutPlanOutputSchema = z.object({
  workoutPlan: z.string().describe('The generated workout plan.'),
});
export type WorkoutPlanOutput = z.infer<typeof WorkoutPlanOutputSchema>;

export async function generateWorkoutPlan(
  input: WorkoutPlanInput
): Promise<WorkoutPlanOutput> {
  return generateWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWorkoutPlanPrompt',
  input: {schema: WorkoutPlanInputSchema},
  output: {schema: WorkoutPlanOutputSchema},
  prompt: `You are a personal trainer. Generate a workout plan based on the user's fitness level, goals, and available equipment.

Fitness Level: {{{fitnessLevel}}}
Goals: {{{goals}}}
Equipment: {{{equipment}}}
Workout Days: {{{workoutDays}}}

Workout Plan:`,
});

const generateWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'generateWorkoutPlanFlow',
    inputSchema: WorkoutPlanInputSchema,
    outputSchema: WorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
