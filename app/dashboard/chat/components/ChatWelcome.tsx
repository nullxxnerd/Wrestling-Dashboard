import { Bot } from "lucide-react";

export function ChatWelcome() {
  return (
    <div className="flex items-center justify-center h-full text-gray-500">
      <div className="text-center">
        <Bot className="h-10 w-10 mx-auto mb-3 text-gray-400" />
        <p className="text-base font-medium">به دستیار هوش مصنوعی خوش آمدید</p>
        <p className="text-xs">
          گفتگو را شروع کنید تا مشاوره تمرین و تغذیه شخصی‌سازی شده دریافت کنید.
        </p>
      </div>
    </div>
  );
}
