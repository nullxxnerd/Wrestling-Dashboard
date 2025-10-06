"use client";

import { useState } from "react";
import {
  ChatMessage,
  ChatInput,
  ChatWelcome,
  ChatLoadingIndicator,
} from "./components";
import { ChatMessage as ChatMessageType } from "./types";
import { createMessage, sendChatMessage } from "./utils";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageContent: string) => {
    const userMessage = createMessage(messageContent, "user");
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await sendChatMessage(messageContent);
      const assistantMessage = createMessage(
        data.response,
        "assistant",
        (Date.now() + 1).toString()
      );
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = createMessage(
        "Sorry, I encountered an error. Please try again.",
        "assistant",
        (Date.now() + 1).toString()
      );
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          دستیار هوش مصنوعی
        </h1>
        <p className="text-sm text-gray-600">
          در مورد تمرین، تغذیه یا مشاوره شخصی‌سازی شده سوال بپرسید.
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-3">
        {messages.length === 0 ? (
          <ChatWelcome />
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}

        {isLoading && <ChatLoadingIndicator />}
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
