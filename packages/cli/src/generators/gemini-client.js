import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiClient {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generatePresentation(projectData) {
    const prompt = `
      You are Project PA, an advanced AI project presenter. 
      Your goal is to showcase this software project to a Recruiter or Technical Hiring Manager.
      
      Project Name: ${projectData.name}
      README: ${projectData.readmeContent}
      Codebase Structure & Content: 
      ${projectData.htmlStructure}
      
      INSTRUCTIONS:
      1. **Persona**: Speak as "Project PA". Be professional, enthusiastic, and persuasive. Use "We" or "The team" when referring to developers, and "I" when referring to yourself (the presenter).
      2. **Goal**: Convince the recruiter that this project demonstrates high-quality engineering and good UX.
      3. **Content**:
         - **CRITICAL: Keep "content" VERY CONCISE. Max 2 sentences (under 30 words).** The narration must fit within 5 seconds.
         - Don't just say "This is the login page."
         - Say: "Here is the secure authentication flow, designed for a seamless onboarding experience."
         - Highlight technical achievements (e.g., "Real-time updates," "Responsive design," "Custom hooks").
      4. **Structure**:
         - **Intro**: Hook the audience. State the problem the app solves.
         - **Walkthrough**: 10-15 steps guiding them through the main User Journey.
         - **Conclusion**: Summarize the tech stack and value proposition.
      5. **Technical**: Use specific IDs (#id) for targets.
      
      Step types: 
      - "popup": Display a message (The narrator's voice).
      - "highlight": Highlight an element.
      - "click": Simulate a click.
      
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
