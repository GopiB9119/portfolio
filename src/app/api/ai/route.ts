import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import data from "@/content/site-data";

export async function POST(req: Request) {
  try {
    const { message, history, userName } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "AI unavailable" }, { status: 503 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const context = `You are an assistant for the portfolio of ${data.name} (${data.title}). Location: ${data.location}. Email: ${data.email}.
Skills: ${(data.skills || []).join(", ")}
Projects: ${(data.projects || []).map((p) => `${p.name}: ${p.description}`).join(" | ")}

Style guide:
- Keep replies concise, warm, and supportive.
- Use up to 3 relevant emojis to enhance tone (e.g., 🙂 ✨ 🙌 💡 🔗 📧), and place them naturally (start/end of lines).
- Prefer short paragraphs or bullet points.
- If asked to email, request their email and purpose; do not send emails automatically.`;

    const contents = [
      { role: "user", parts: [{ text: context }] },
      ...(Array.isArray(history) ? history : []),
      { role: "user", parts: [{ text: userName ? `User name: ${userName}. ${message}` : message }] },
    ];

    const result = await model.generateContent({ contents });
    const text = result.response?.text?.() || "";
    return NextResponse.json({ reply: text });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

