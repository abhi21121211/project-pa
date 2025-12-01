import axios from 'axios';

export class OpenRouterClient {
    constructor(apiKey, model) {
        if (!apiKey) {
            throw new Error('OPENROUTER_API_KEY is required');
        }
        this.apiKey = apiKey;
        this.model = model;
        this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    }

    async generatePresentation(projectData) {
        const prompt = `You are Project PA (Project Personal Assistant), an expert AI presentation generator for software projects.

Your mission: Create an engaging, technically impressive presentation for recruiters and hiring managers.

═══════════════════════════════════════════════════════════════════
PROJECT INFORMATION
═══════════════════════════════════════════════════════════════════

Project Name: ${projectData.name}
Entry URL: ${projectData.entryUrl || '/'}
Tech Stack: ${projectData.techStack?.join(', ') || 'Not specified'}

README Content:
${projectData.readmeContent || 'No README provided'}

Codebase Structure:
${projectData.htmlStructure}

Available Routes/Pages:
${projectData.routes?.join('\n') || 'No routes detected'}

Key Components Found:
${projectData.components?.join('\n') || 'No components listed'}

═══════════════════════════════════════════════════════════════════
CRITICAL INSTRUCTIONS - FOLLOW EXACTLY
═══════════════════════════════════════════════════════════════════

🎯 TARGET ELEMENT ACCURACY:
- Use EXACT selectors from the codebase structure above
- Prefer IDs: #login-button, #navbar, #hero-section
- Fallback to specific classes: .auth-form, .product-card
- Use data attributes if available: [data-testid="submit-btn"]
- NEVER use generic selectors like "button" or "div"
- TEST mentally: "Does this selector exist in the HTML structure above?"

📝 CONTENT QUALITY (Explanations):
- Length: 15-25 words per step (readable in 5-8 seconds)
- Tone: Professional + Enthusiastic (like a confident product demo)
- Focus: Technical value + User benefit
- Avoid: "This is...", "Here we have...", "Now we see..."
- **CRITICAL: DO NOT use raw CSS selectors (like #id or .class) in the text.** Use natural names (e.g., "The due date field" instead of "The #todo-duedate field").
- Instead: "Our secure authentication uses JWT tokens for seamless login"
- Highlight: Specific tech choices (React hooks, API integration, responsive design)

⏱️ TIMING CALCULATION (Critical for narration):
FORMULA: duration = (word_count × 400) + 2000
Examples:
- 15 words = 15 × 400 + 2000 = 8000ms (8 seconds)
- 20 words = 20 × 400 + 2000 = 10000ms (10 seconds)
- 25 words = 25 × 400 + 2000 = 12000ms (12 seconds)

Minimum duration: 6000ms (for very short text)
Maximum duration: 15000ms (for detailed explanations)

🎭 PRESENTATION FLOW:
1. INTRO (1 step): Hook with the problem + solution in 20 words
2. NAVIGATION (1-2 steps): Show main menu/navbar with specific highlights
3. KEY FEATURES (6-10 steps): 
   - Each major feature gets its own step
   - Use "highlight" for UI elements
   - Use "click" sparingly (only for critical flows)
4. USER JOURNEY (2-4 steps): Show 1 complete workflow (e.g., login → dashboard)
5. CONCLUSION (1 step): Tech stack recap + value proposition

📊 STEP TYPE RULES:
- "popup": Intro, transitions, explanations (no target needed, use "body")
- "highlight": Show specific UI elements (MUST have accurate target)
- "click": Trigger interactions (use sparingly, add to "actions" array)
- "navigate": Change pages (include "page" field with route)

═══════════════════════════════════════════════════════════════════
OUTPUT FORMAT - JSON ONLY
═══════════════════════════════════════════════════════════════════

Generate ONLY valid JSON. No markdown, no code blocks, no explanations.

Schema:
{
  "meta": {
    "project": "Project name",
    "author": "Developer name (extract from README or use 'Developer')",
    "description": "One-sentence project description",
    "techStack": ["React", "Node.js", "MongoDB"],
    "entryUrl": "/"
  },
  "steps": [
    {
      "id": "unique-step-id",
      "type": "popup|highlight|click|navigate",
      "page": "/current-page-route",
      "parent": "#optional-parent-container-id",
      "target": "#specific-element-id OR .specific-class",
      "content": "Engaging 15-25 word explanation highlighting technical value and user benefit",
      "duration": 8000,
      "actions": [
        {
          "do": "click|scroll|hover",
          "selector": "#element-to-interact",
          "value": "optional-input-value"
        }
      ]
    }
  ]
}

═══════════════════════════════════════════════════════════════════
VALIDATION CHECKLIST (Before outputting)
═══════════════════════════════════════════════════════════════════

Before returning JSON, verify:
✓ Every "target" selector exists in the HTML structure above
✓ Every "content" is 15-25 words
✓ Every "duration" is calculated: (word_count × 400) + 2000
✓ Steps flow logically (intro → features → journey → conclusion)
✓ No generic selectors (button, div, span)
✓ No boring phrases ("This is...", "Here we have...")
✓ Tech stack mentioned in explanations
✓ Total steps: 10-15 (not too short, not too long)

═══════════════════════════════════════════════════════════════════
NOW GENERATE THE PRESENTATION JSON
═══════════════════════════════════════════════════════════════════`;

        try {
            const response = await axios.post(
                this.apiUrl,
                {
                    model: this.model,
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.4,
                    top_p: 0.95,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'HTTP-Referer': 'https://project-pa.com', // Required by OpenRouter
                        'X-Title': 'Project PA', // Optional
                        'Content-Type': 'application/json'
                    }
                }
            );

            let text = response.data.choices[0].message.content;

            // Enhanced cleanup for various markdown formats
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // Remove any leading/trailing text before first { and after last }
            const firstBrace = text.indexOf('{');
            const lastBrace = text.lastIndexOf('}');

            if (firstBrace !== -1 && lastBrace !== -1) {
                text = text.substring(firstBrace, lastBrace + 1);
            }

            // Parse and validate
            const presentation = JSON.parse(text);

            // Post-process: Recalculate durations based on content length
            if (presentation.steps) {
                presentation.steps = presentation.steps.map(step => {
                    if (step.content) {
                        const wordCount = step.content.split(/\s+/).length;
                        const calculatedDuration = (wordCount * 400) + 2000;

                        // Apply min/max bounds
                        step.duration = Math.max(6000, Math.min(15000, calculatedDuration));
                    }
                    return step;
                });
            }

            // Validate critical fields
            this._validatePresentation(presentation);

            return presentation;

        } catch (error) {
            if (error instanceof SyntaxError) {
                console.error('Failed to parse OpenRouter response as JSON');
                throw new Error('Invalid JSON response from OpenRouter. Try regenerating.');
            }
            if (error.response) {
                console.error('OpenRouter API Error:', error.response.data);
                throw new Error(`OpenRouter API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    _validatePresentation(presentation) {
        if (!presentation.meta || !presentation.steps) {
            throw new Error('Invalid presentation structure: missing meta or steps');
        }

        if (!Array.isArray(presentation.steps) || presentation.steps.length === 0) {
            throw new Error('Presentation must contain at least one step');
        }

        // Validate each step
        presentation.steps.forEach((step, index) => {
            if (!step.id || !step.type || !step.content) {
                throw new Error(`Step ${index} missing required fields: id, type, or content`);
            }

            if (!['popup', 'highlight', 'click', 'navigate'].includes(step.type)) {
                throw new Error(`Step ${index} has invalid type: ${step.type}`);
            }

            if (step.type !== 'popup' && !step.target) {
                throw new Error(`Step ${index} of type '${step.type}' requires a target selector`);
            }
        });

        console.log(`✅ Presentation validated: ${presentation.steps.length} steps generated`);
    }
}
