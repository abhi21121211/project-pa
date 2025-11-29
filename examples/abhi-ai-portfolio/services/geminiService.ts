import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;
let currentSystemInstruction = "";

export const setSystemContext = (instruction: string) => {
  currentSystemInstruction = instruction;
  // Clear session to force re-creation with new instruction
  chatSession = null;
};

// Initialize the Gemini Client
export const initializeGemini = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key not found in environment variables.");
    return null;
  }
  
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const ai = initializeGemini();
    if (!ai) {
      return "ACCESS DENIED: API Key missing. Please configure environment.";
    }

    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: currentSystemInstruction,
          temperature: 0.7,
        },
      });
    }

    const result = await chatSession.sendMessage({ message });
    return result.text || "NULL RESPONSE. Rerouting...";
  } catch (error) {
    console.error("Gemini Error:", error);
    chatSession = null;
    return "SYSTEM ERROR: Neural link unstable. Retrying handshake...";
  }
};
