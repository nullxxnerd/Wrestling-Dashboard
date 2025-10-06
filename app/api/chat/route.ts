import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const metisApiKey = process.env.METIS_API_KEY;
    if (!metisApiKey) {
      return NextResponse.json(
        { error: "MetisAI API key not configured" },
        { status: 500 }
      );
    }

    // Initialize OpenAI client with MetisAI base URL
    const client = new OpenAI({
      apiKey: metisApiKey,
      baseURL: "https://api.metisai.ir/openai/v1",
    });

    // System prompt for wrestling/fitness context in Persian
    const systemPrompt = `شما یک دستیار هوش مصنوعی متخصص در کشتی، تمرینات قدرتی، تغذیه و عملکرد ورزشی هستید. شما مشاوره مبتنی بر شواهد در موارد زیر ارائه می‌دهید:

1. تکنیک‌های کشتی و برنامه‌های تمرینی
2. تقویت و آمادگی جسمانی برای ورزش‌های رزمی
3. تغذیه برای ورزشکاران، شامل کاهش وزن و عضله‌سازی
4. استراتژی‌های بهبودی و پیشگیری از آسیب
5. تجزیه و تحلیل و بهینه‌سازی عملکرد
6. راهنمایی مکمل‌ها بر اساس تحقیقات علمی

همیشه مشاوره عملی و قابل اجرا ارائه دهید و بر ایمنی تأکید کنید. هنگام بحث در مورد تغذیه یا مکمل‌ها، به کاربران یادآوری کنید که برای مشاوره پزشکی شخصی‌سازی شده با متخصصان بهداشت مشورت کنند.

به زبان فارسی و با لحنی مفید، تشویق‌کننده، دقیق و حرفه‌ای پاسخ دهید. از فرمت Markdown برای ساختار بندی پاسخ‌هایتان استفاده کنید:
- از **متن پررنگ** برای تأکیدات مهم استفاده کنید
- از لیست‌های شماره‌دار یا نقطه‌ای برای نکات مختلف استفاده کنید
- از ### برای عناوین فرعی استفاده کنید
- از > برای نقل‌قول‌های مهم استفاده کنید`;

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ];

    // Call MetisAI API using OpenAI client
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    if (!response.choices || response.choices.length === 0) {
      return NextResponse.json(
        { error: "No response from AI model" },
        { status: 500 }
      );
    }

    const aiResponse = response.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Chat API endpoint - use POST to send messages" },
    { status: 200 }
  );
}
