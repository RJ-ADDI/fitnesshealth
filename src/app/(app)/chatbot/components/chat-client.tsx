'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { chat } from '@/ai/flows/chatbot-flow';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { user } from '@/lib/data';

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function ChatClient() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello! I'm FitAI, your personal fitness assistant. How can I help you today?",
    },
  ]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const userMessage: Message = { role: 'user', content: values.message };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    form.reset();

    try {
      const response = await chat({ history: newHistory });
      const modelMessage: Message = {
        role: 'model',
        content: response.message,
      };
      setHistory((prevHistory) => [...prevHistory, modelMessage]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an issue with the chat. Please try again.',
      });
      // remove the user message from history if there was an error
      setHistory(history);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-10rem)]">
      <CardHeader>
        <CardTitle>Chat with FitAI</CardTitle>
        <CardDescription>
          Your AI-powered fitness assistant.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            {history.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' && 'justify-end'
                )}
              >
                {message.role === 'model' && (
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-sm rounded-lg px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-9 w-9">
                     <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-3">
                 <Avatar className="h-9 w-9 border">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="max-w-sm rounded-lg px-4 py-3 bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-center space-x-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Ask about exercises, nutrition, etc."
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
