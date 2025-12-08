import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiClient {
  constructor(apiKey, modelName = 'gemini-2.0-flash') {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.4,  // Balance creativity with consistency
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      }
    });
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

${projectData.authConfig?.hasProtectedRoutes ? `
═══════════════════════════════════════════════════════════════════
🔐 PROTECTED ROUTES - READ CAREFULLY
═══════════════════════════════════════════════════════════════════
- Has Protected Routes: YES
- Auth Token Provided: ${projectData.authConfig.authToken ? 'YES ✓' : 'NO ✗'}
- User Role: ${projectData.authConfig.userRole || 'Not specified'}

${!projectData.authConfig.authToken ? `
⛔ CRITICAL - NO AUTH TOKEN PROVIDED:
Protected routes include: /admin, /dashboard, /settings, /profile, /account, /panel, /manage, /protected, /private, /user

YOU MUST FOLLOW THESE RULES:
1. NEVER use "type": "navigate" for protected routes
2. NEVER use "type": "click" on links to protected routes  
3. NEVER try to redirect to admin/dashboard/settings pages
4. ONLY use "type": "popup" to MENTION protected features exist

CORRECT EXAMPLE (popup only, no navigation):
{
  "id": "mention-admin",
  "type": "popup",
  "page": "/",
  "target": "body",
  "content": "The application includes a secure Admin Dashboard with user management, analytics, and settings - accessible after authentication.",
  "duration": 8000
}

WRONG (DO NOT DO THIS):
{
  "id": "go-to-admin",
  "type": "navigate",  // ❌ WRONG - will cause redirect loop!
  "page": "/admin",     // ❌ WRONG - protected route!
  ...
}
` : `
✓ Auth token provided - you CAN include protected pages for role: ${projectData.authConfig.userRole}
You may use "navigate" type for protected routes.
`}
` : ''}

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

🎨 CONTENT EXAMPLES:

❌ BAD (Generic, boring):
"This is the login page where users can sign in."

✅ GOOD (Technical + Engaging):
"Secure authentication powered by bcrypt hashing and JWT tokens, ensuring user data stays protected throughout the session."

❌ BAD (Vague selector):
"target": "button"

✅ GOOD (Specific selector):
"target": "#login-submit-btn"
OR
"target": "button[type='submit'].auth-button"

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
      "target": "#specific-element-id OR .specific-class",
      "content": "Engaging 15-25 word explanation highlighting technical value and user benefit",
      "duration": 8000
    }
  ]
}

OPTIONAL FIELDS (use only when needed):
- "parent": "#container-id" - Only if target is inside a specific container
- "actions": [{"do": "click", "selector": "#btn"}] - Only for "click" type steps

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
EXAMPLE OUTPUT (Reference only)
═══════════════════════════════════════════════════════════════════

{
  "meta": {
    "project": "TaskMaster Pro",
    "author": "Developer",
    "description": "A modern task management platform with real-time collaboration",
    "techStack": ["React", "Firebase", "Material-UI"],
    "entryUrl": "/"
  },
  "steps": [
    {
      "id": "intro",
      "type": "popup",
      "page": "/",
      "target": "body",
      "content": "TaskMaster Pro revolutionizes team productivity with real-time task synchronization and intelligent priority sorting powered by Firebase Cloud Functions.",
      "duration": 11000
    },
    {
      "id": "navbar-highlight",
      "type": "highlight",
      "page": "/",
      "target": "#main-navigation",
      "content": "Our responsive navigation adapts seamlessly across devices, providing instant access to projects, teams, and analytics dashboards.",
      "duration": 9000
    },
    {
      "id": "add-task-click",
      "type": "click",
      "page": "/",
      "target": "#create-task-btn",
      "content": "The quick-action button leverages React hooks for optimistic UI updates, ensuring tasks appear instantly before server confirmation.",
      "duration": 9500,
      "actions": [
        {
          "do": "click",
          "selector": "#create-task-btn"
        }
      ]
    }
  ]
}

═══════════════════════════════════════════════════════════════════
NOW GENERATE THE PRESENTATION JSON
═══════════════════════════════════════════════════════════════════`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

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
        console.error('Failed to parse Gemini response as JSON');
        console.error('Raw response:', text);
        throw new Error('Invalid JSON response from Gemini. Try regenerating.');
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

    // Auto-fix and filter steps instead of throwing errors
    presentation.steps = presentation.steps.filter((step, index) => {
      // Skip steps missing required fields
      if (!step.id || !step.type || !step.content) {
        console.warn(`⚠️  Skipping step ${index}: missing required fields`);
        return false;
      }

      // Fix invalid step types
      if (!['popup', 'highlight', 'click', 'navigate'].includes(step.type)) {
        console.warn(`⚠️  Step ${index}: converting invalid type '${step.type}' to 'popup'`);
        step.type = 'popup';
      }

      // Fix missing targets - convert to popup type
      if (step.type !== 'popup' && !step.target) {
        console.warn(`⚠️  Step ${index}: no target found, converting to popup`);
        step.type = 'popup';
        step.target = 'body';
      }

      // Warn about potentially problematic selectors
      if (step.target && /^(div|span|button|a)$/.test(step.target)) {
        console.warn(`⚠️  Step ${step.id}: Generic selector "${step.target}" may not be specific enough`);
      }

      return true;
    });

    if (presentation.steps.length === 0) {
      throw new Error('No valid steps found in presentation');
    }

    console.log(`✅ Presentation validated: ${presentation.steps.length} steps`);
  }
}