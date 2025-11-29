import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiClient {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is required');
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    }

    async generatePresentation(projectData) {
        const prompt = `
      You are a technical presentation generator.
      Generate a JSON presentation script for a web project.
      
      Project Name: ${projectData.name}
      README: ${projectData.readmeContent.substring(0, 1000)}
      HTML Structure: ${projectData.htmlStructure.substring(0, 2000)}
      
      Create 4-6 steps.
      Step types: "popup", "highlight", "click".
      
      Output ONLY valid JSON matching this schema:
      {
        "meta": { "project": "string", "author": "string", "entryUrl": "/" },
        "steps": [
          {
            "id": "string",
            "type": "popup|highlight|click",
            "target": "css_selector",
            "content": "string",
            "duration": 5000,
            "actions": [{"do": "click", "selector": "string"}]
          }
        ]
      }
    `;

        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Cleanup markdown
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(text);
    }
}
