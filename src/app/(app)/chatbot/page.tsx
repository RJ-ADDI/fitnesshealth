import { PageHeader } from "@/components/page-header";
import { ChatClient } from "./components/chat-client";

export default function ChatbotPage() {
  return (
    <div className="space-y-8">
      <ChatClient />
    </div>
  );
}
