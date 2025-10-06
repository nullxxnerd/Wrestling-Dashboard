import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";

export function ChatLoadingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="flex gap-2 max-w-[80%]">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
          <Bot className="h-3 w-3 text-white" />
        </div>
        <Card className="p-2 bg-gray-50 border-gray-200">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
