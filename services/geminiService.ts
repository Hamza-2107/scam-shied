
import { GoogleGenAI, Type } from "@google/genai";
import { ScamAnalysis } from "../types";

const SYSTEM_INSTRUCTION = `Act as a Cyber-Forensic Psychologist. Analyze the input for "Cognitive Warfare" tactics—specifically how it attempts to hijack "System 1" (Fast/Emotional) thinking to bypass "System 2" (Slow/Logical) thinking. Detect triggers for the Amygdala (Fear) and Ventral Striatum (Greed).

You must detect if the text is English, Urdu, or Roman Urdu. Analyze visual patterns if an image is provided.
Focus on neural threat vectors and logic bypass mechanisms.

Output ONLY a raw JSON object with the specified schema.`;

export async function analyzeScam(text: string, imageBase64?: string): Promise<ScamAnalysis> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const contents: any[] = [{ text }];
  if (imageBase64) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64.split(',')[1] || imageBase64
      }
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: contents.length === 1 ? contents[0].text : { parts: contents },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verdict: { type: Type.STRING, description: "SAFE | SUSPICIOUS | DANGEROUS" },
          safetyScore: { type: Type.INTEGER, description: "0-100" },
          system1Score: { type: Type.INTEGER, description: "0-100 (Logic Bypass factor)" },
          summary: { type: Type.STRING, description: "Clinical forensic summary of the neural threat vector." },
          language: { type: Type.STRING, description: "English | Roman Urdu | Urdu" },
          tricks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Psychological Trigger" },
                description: { type: Type.STRING, description: "Where it appears" },
                psychologyExplanation: { type: Type.STRING, description: "How it exploits cognitive bias" }
              }
            }
          },
          fearFactor: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING, description: "LOW | MEDIUM | HIGH | CRITICAL" },
              threatType: { type: Type.STRING, description: "Financial Loss | Legal Action | Social Shame | Physical Threat" },
              amygdalaTrigger: { type: Type.STRING, description: "Exact phrase designed to trigger panic" }
            }
          },
          recommendation: { type: Type.STRING, description: "Tactical defensive step to restore logical baseline." },
          counterScripts: {
            type: Type.OBJECT,
            properties: {
              timeWaster: { type: Type.STRING },
              legalThreat: { type: Type.STRING },
              ghost: { type: Type.STRING }
            }
          },
          highlights: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["verdict", "safetyScore", "system1Score", "summary", "language", "tricks", "fearFactor", "recommendation", "counterScripts", "highlights"]
      }
    }
  });

  const analysis = JSON.parse(response.text) as ScamAnalysis;
  return {
    ...analysis,
    originalText: text,
    timestamp: Date.now()
  };
}
