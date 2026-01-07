'use server';

/**
 * @fileOverview A flow for fitness experts to validate and refine the AI's recommendations and feedback.
 *
 * - validateAIRecommendation - A function that handles the validation and refinement process.
 * - ValidateAIRecommendationInput - The input type for the validateAIRecommendation function.
 * - ValidateAIRecommendationOutput - The return type for the validateAIRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateAIRecommendationInputSchema = z.object({
  recommendation: z.string().describe('The AI-generated recommendation to validate.'),
  feedback: z.string().describe('The fitness expert’s feedback on the recommendation.'),
  originalData: z.string().describe('The original data used to generate the recommendation.'),
});
export type ValidateAIRecommendationInput = z.infer<typeof ValidateAIRecommendationInputSchema>;

const ValidateAIRecommendationOutputSchema = z.object({
  validatedRecommendation: z.string().describe('The validated and refined recommendation.'),
  reasoning: z.string().describe('Explanation of the changes made by the expert.'),
});
export type ValidateAIRecommendationOutput = z.infer<typeof ValidateAIRecommendationOutputSchema>;

export async function validateAIRecommendation(input: ValidateAIRecommendationInput): Promise<ValidateAIRecommendationOutput> {
  return validateAIRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateAIRecommendationPrompt',
  input: {schema: ValidateAIRecommendationInputSchema},
  output: {schema: ValidateAIRecommendationOutputSchema},
  prompt: `You are a fitness expert reviewing an AI-generated fitness recommendation.

  Original Data: {{{originalData}}}
  AI Recommendation: {{{recommendation}}}
  Expert Feedback: {{{feedback}}}

  Based on your expertise and the provided feedback, refine the AI's recommendation to be more accurate and personalized. Explain the reasoning behind your changes.

  Return the validated recommendation and the reasoning for the changes.
  `,
});

const validateAIRecommendationFlow = ai.defineFlow(
  {
    name: 'validateAIRecommendationFlow',
    inputSchema: ValidateAIRecommendationInputSchema,
    outputSchema: ValidateAIRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
