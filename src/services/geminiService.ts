import { GoogleGenAI, Type } from "@google/genai";

const MODEL_NAME = "gemini-3-flash-preview";

export interface ScriptPackage {
  instagram: { concept: string; script: string; strategy: string };
  tiktok: { concept: string; script: string; strategy: string };
  youtube: { concept: string; script: string; strategy: string };
}

export async function generateGrowthPlan(topic: string): Promise<ScriptPackage> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  
  const systemPrompt = `You are a high-level social media growth architect. 
  For the given topic, generate a comprehensive script package.
  Scripts must follow this exact formatting for each scene:
  
  SCENE 1:
  [Visual Action: Describe the shot]
  (Dialogue: Exactly what is said)
  [Overlay Text: Text appearing on screen]
  
  SCENE 2:
  ...and so on.
  
  Return EXACTLY this JSON structure:
  {
      "instagram": { "concept": "...", "script": "Full production script with SCENE markers", "strategy": "Why this works for IG" },
      "tiktok": { "concept": "...", "script": "Full production script with SCENE markers", "strategy": "Why this works for TikTok" },
      "youtube": { "concept": "...", "script": "Full production script with SCENE markers", "strategy": "Why this works for Shorts/Long-form" }
  }
  Keep scripts punchy, high-retention, and psychologically optimized. Ensure the script is ready for a video editor like CapCut.`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [{ parts: [{ text: `Topic: ${topic}` }] }],
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          instagram: {
            type: Type.OBJECT,
            properties: {
              concept: { type: Type.STRING },
              script: { type: Type.STRING },
              strategy: { type: Type.STRING },
            },
            required: ["concept", "script", "strategy"],
          },
          tiktok: {
            type: Type.OBJECT,
            properties: {
              concept: { type: Type.STRING },
              script: { type: Type.STRING },
              strategy: { type: Type.STRING },
            },
            required: ["concept", "script", "strategy"],
          },
          youtube: {
            type: Type.OBJECT,
            properties: {
              concept: { type: Type.STRING },
              script: { type: Type.STRING },
              strategy: { type: Type.STRING },
            },
            required: ["concept", "script", "strategy"],
          },
        },
        required: ["instagram", "tiktok", "youtube"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as ScriptPackage;
}
