'use server';

/**
 * @fileOverview A chatbot flow that acts as a friendly fitness assistant.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatbotInput - The input type for the chat function.
 * - ChatbotOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatbotInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  message: z.string().describe('The AI-generated response.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chat(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: z.object({ message: z.string() }) },
  prompt: `You are a friendly and helpful fitness assistant chatbot named FitAI. Your goal is to provide encouraging and informative answers to users about fitness, nutrition, and workout plans.

Here is the conversation history:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}
model:`,
});


const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      message: output!.message
    };
  }
);
