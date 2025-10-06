import { ChatMessage, ChatResponse } from "./types";

export const createMessage = (
  content: string,
  role: "user" | "assistant",
  id?: string
): ChatMessage => ({
  id: id || Date.now().toString(),
  content,
  role,
  timestamp: new Date(),
});

export const sendChatMessage = async (
  message: string
): Promise<ChatResponse> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
};

export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
