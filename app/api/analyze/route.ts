import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an expert facial analysis AI. Analyze the three provided photos (front, left profile, right profile) and return a detailed JSON assessment of the person's facial structure.

Return ONLY valid JSON with this exact structure:
{
  "overall_score": <integer 1-100>,
  "subscores": {
    "symmetry": <integer 1-100>,
    "jawline": <integer 1-100>,
    "skin": <integer 1-100>,
    "eye_area": <integer 1-100>,
    "facial_thirds": <integer 1-100>
  },
  "flaws": [
    {
      "name": "<flaw name>",
      "severity": "<low|medium|high>",
      "description": "<1-2 sentence description>"
    }
  ],
  "protocol": [
    {
      "title": "<protocol item title>",
      "description": "<actionable recommendation>"
    }
  ],
  "summary": "<2-3 sentence overall summary>"
}

Provide 3-6 flaws and 6-8 protocol items. Be specific, honest, and constructive. Base scores on objective facial harmony principles (golden ratio, symmetry, proportion).`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { front, left, right } = body as {
      front: string;
      left: string;
      right: string;
    };

    if (!front || !left || !right) {
      return Response.json(
        { error: "All three photos (front, left, right) are required" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: "image/jpeg", data: front },
            },
            { type: "text", text: "Front view" },
            {
              type: "image",
              source: { type: "base64", media_type: "image/jpeg", data: left },
            },
            { type: "text", text: "Left profile" },
            {
              type: "image",
              source: { type: "base64", media_type: "image/jpeg", data: right },
            },
            { type: "text", text: "Right profile" },
            {
              type: "text",
              text: "Analyze these three photos and provide your detailed facial assessment as JSON.",
            },
          ],
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json(
        { error: "Failed to parse analysis response" },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return Response.json(analysis);
  } catch (err) {
    console.error("Analysis error:", err);
    return Response.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
