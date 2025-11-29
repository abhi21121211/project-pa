# Project PA - Technical Architecture Document

**Project Name:** Project PA (Project Presenter AI)  
**Version:** 1.0 (Free Stack Edition)  
**Document Type:** Technical Specification  
**Last Updated:** November 29, 2025

---

## 1. Technology Stack (FINAL - 100% FREE)

### 1.1 Frontend Runtime (Embed Widget)

| Component | Technology | Version | Cost | Purpose |
|-----------|-----------|---------|------|---------|
| **Core Language** | Vanilla JavaScript | ES2022+ | FREE | Widget runtime execution |
| **Module System** | ES Modules (ESM) | Native | FREE | Import/export management |
| **Bundler** | esbuild | 0.19.x | FREE | Ultra-fast bundling |
| **Minification** | esbuild (built-in) | - | FREE | Code compression |
| **Styling** | Pure CSS3 | - | FREE | Animations and layouts |
| **Animation** | Web Animations API | Native | FREE | Smooth transitions |
| **Speech** | Web Speech API | Native | FREE | Text-to-speech narration |

**NO paid tools. NO frameworks. NO build complexity.**

---

### 1.2 CLI Generator Tool

| Component | Technology | Version | Cost | Purpose |
|-----------|-----------|---------|------|---------|
| **Runtime** | Node.js | 20.x LTS | FREE | CLI execution environment |
| **Language** | JavaScript | ES2022+ | FREE | CLI scripting |
| **CLI Framework** | Commander.js | 11.x | FREE | Command parsing |
| **File System** | Node fs/promises | Native | FREE | File operations |
| **Code Parser** | Acorn | 8.x | FREE | JavaScript AST parsing |
| **HTML Parser** | node-html-parser | 6.x | FREE | HTML structure analysis |
| **CSS Parser** | css-tree | 2.x | FREE | CSS selector extraction |
| **Path Handling** | Node path | Native | FREE | Cross-platform paths |
| **HTTP Client** | Node fetch | Native (20.x) | FREE | LLM API calls |
| **JSON Validation** | ajv | 8.x | FREE | Schema validation |

**NO paid dependencies. Pure open source.**

---

### 1.3 AI/LLM Integration (100% FREE)

| Component | Technology | Version | Cost | Limits | Purpose |
|-----------|-----------|---------|------|--------|---------|
| **Primary LLM** | Google Gemini 2.0 Flash | gemini-2.0-flash-exp | **FREE** | 1500 RPD | Presentation generation |
| **API Client** | @google/generative-ai | 0.21.x | FREE | - | Official Gemini SDK |
| **API Key** | Google AI Studio | - | FREE | Free tier | API access |
| **Fallback LLM** | Gemini 1.5 Flash | gemini-1.5-flash | **FREE** | 1500 RPD | Secondary option |
| **Prompt Templates** | JSON files | - | FREE | - | Structured prompts |
| **Rate Limiter** | bottleneck | 2.x | FREE | - | Respect API limits |

**Cost: $0/month forever** (within free tier: 1500 requests/day = 50 projects/day)

---

### 1.4 Data Storage (Local-First)

| Component | Technology | Cost | Purpose |
|-----------|-----------|------|---------|
| **Config Storage** | JSON files | FREE | presentation.json, config.json |
| **Audio Storage** | MP3 files | FREE | Pre-generated narration |
| **Asset Storage** | Local /assets folder | FREE | Images, mascot GIF |
| **Cache** | .pa-cache/ folder | FREE | Parsed code cache |

**NO cloud storage. NO databases. Pure local files.**

---

### 1.5 Development Tools (All Free)

| Tool | Technology | Version | Cost | Purpose |
|------|-----------|---------|------|---------|
| **Package Manager** | npm | 10.x | FREE | Dependency management |
| **Linting** | ESLint | 9.x | FREE | Code quality |
| **Testing** | Node native test | Native | FREE | Unit testing |
| **Git** | Git | 2.x | FREE | Version control |
| **Editor** | VS Code | Latest | FREE | Development |

---

## 2. Project Structure

```
project-pa/
├── packages/
│   ├── runtime/                    # Frontend widget
│   │   ├── src/
│   │   │   ├── index.js           # Entry point
│   │   │   ├── widget.js          # Floating button
│   │   │   ├── popup.js           # Presentation popup
│   │   │   ├── highlighter.js     # Element highlighting
│   │   │   ├── step-runner.js     # Step execution engine
│   │   │   ├── narrator.js        # TTS controller
│   │   │   └── styles.css         # All styles
│   │   ├── build.js               # esbuild config
│   │   ├── package.json
│   │   └── dist/
│   │       └── project-pa.min.js  # Final bundle
│   │
│   └── cli/                        # CLI generator
│       ├── bin/
│       │   └── pa.js              # CLI entry
│       ├── src/
│       │   ├── commands/
│       │   │   ├── init.js        # pa init
│       │   │   ├── generate.js    # pa generate
│       │   │   └── preview.js     # pa preview
│       │   ├── analyzers/
│       │   │   ├── html-analyzer.js
│       │   │   ├── js-analyzer.js
│       │   │   └── route-analyzer.js
│       │   ├── generators/
│       │   │   ├── prompt-builder.js
│       │   │   ├── gemini-client.js
│       │   │   └── json-generator.js
│       │   └── utils/
│       │       ├── file-reader.js
│       │       ├── secret-scanner.js
│       │       ├── rate-limiter.js
│       │       └── logger.js
│       └── package.json
│
├── examples/                       # Sample projects
│   ├── ecommerce-demo/
│   └── portfolio-site/
│
├── docs/                          # Documentation
│   ├── api.md
│   ├── cli-usage.md
│   └── integration-guide.md
│
└── package.json                   # Root workspace
```

---

## 3. Core Architecture

### 3.1 Runtime Widget Architecture

```
┌─────────────────────────────────────────────────┐
│           Developer's Website (Any Stack)        │
│                                                  │
│  <script src="https://cdn.../project-pa.min.js" │
│          data-config="./presentation.json">      │
└──────────────────────┬──────────────────────────┘
                       │
                       │ Loads & Initializes
                       ▼
┌─────────────────────────────────────────────────┐
│              ProjectPA Runtime                   │
│                                                  │
│  ┌──────────────────────────────────────────┐  │
│  │  Widget Controller                        │  │
│  │  - Floating button                        │  │
│  │  - Event listeners                        │  │
│  └────────────┬─────────────────────────────┘  │
│               │                                  │
│  ┌────────────▼─────────────────────────────┐  │
│  │  Presentation Engine                      │  │
│  │  ┌──────────────┐  ┌──────────────────┐  │  │
│  │  │ Step Runner  │  │  Popup Manager   │  │  │
│  │  └──────┬───────┘  └────────┬─────────┘  │  │
│  │         │                   │             │  │
│  │  ┌──────▼───────┐  ┌────────▼─────────┐  │  │
│  │  │ Highlighter  │  │    Narrator      │  │  │
│  │  └──────────────┘  └──────────────────┘  │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                       │
                       │ Reads
                       ▼
┌─────────────────────────────────────────────────┐
│           presentation.json                      │
│  {                                               │
│    "meta": {...},                                │
│    "steps": [...]                                │
│  }                                               │
└─────────────────────────────────────────────────┘
```

---

### 3.2 CLI Generator Architecture

```
┌─────────────────────────────────────────────────┐
│                User runs: pa generate            │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│               CLI Controller                     │
│            (Commander.js)                        │
└──────────────────────┬──────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
┌────────────┐  ┌────────────┐  ┌──────────────┐
│   HTML     │  │     JS     │  │    Route     │
│  Analyzer  │  │  Analyzer  │  │   Analyzer   │
└─────┬──────┘  └─────┬──────┘  └──────┬───────┘
      │               │                 │
      └───────────────┼─────────────────┘
                      │
                      │ Extracted Data
                      ▼
┌─────────────────────────────────────────────────┐
│            Prompt Builder                        │
│  - Combines code structure                       │
│  - Adds context from README                      │
│  - Creates structured prompt                     │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│           Gemini Client (FREE)                   │
│  - Calls Google Gemini 2.0 Flash API             │
│  - Rate limited: 1500/day                        │
│  - Retry logic with backoff                      │
└──────────────────────┬──────────────────────────┘
                       │
                       │ Returns JSON
                       ▼
┌─────────────────────────────────────────────────┐
│           JSON Generator                         │
│  - Validates Gemini output                       │
│  - Formats presentation.json                     │
│  - Generates narration text                      │
└──────────────────────┬──────────────────────────┘
                       │
                       │ Writes to disk
                       ▼
┌─────────────────────────────────────────────────┐
│          presentation.json (Output)              │
└─────────────────────────────────────────────────┘
```

---

## 4. Google Gemini Integration (FREE API)

### 4.1 API Setup

```javascript
// gemini-client.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Get FREE API key from: https://aistudio.google.com/app/apikey
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-exp",  // FREE tier
  generationConfig: {
    temperature: 0.3,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  }
});
```

### 4.2 Rate Limiting (FREE tier: 1500 RPD)

```javascript
// rate-limiter.js
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 2000,        // 2 seconds between requests
  reservoir: 1500,       // 1500 requests
  reservoirRefreshAmount: 1500,
  reservoirRefreshInterval: 24 * 60 * 60 * 1000  // per day
});

export const rateLimitedGenerate = limiter.wrap(async (prompt) => {
  return await model.generateContent(prompt);
});
```

### 4.3 Prompt Structure for Gemini

```javascript
// prompt-builder.js
function buildGeminiPrompt(projectData) {
  return `You are a technical presentation generator for web projects.
Generate a structured JSON presentation script.

CRITICAL: Output ONLY valid JSON. No markdown, no explanations.

Project Information:
- Name: ${projectData.name}
- Tech Stack: ${projectData.techStack.join(', ')}
- Entry Point: ${projectData.entryUrl}

HTML Structure:
${projectData.htmlStructure}

Routes/Pages:
${projectData.routes.join('\n')}

Key Components:
${projectData.components.join('\n')}

README Summary:
${projectData.readmeContent}

Generate a presentation with 6-10 steps that:
1. Introduces the project (popup on entry)
2. Highlights navigation elements
3. Demonstrates 2-3 key features with highlights
4. Shows user flows with click actions
5. Ends with tech stack summary

Output JSON Schema:
{
  "meta": {
    "project": "string",
    "author": "string",
    "description": "string",
    "techStack": ["string"],
    "entryUrl": "string"
  },
  "steps": [
    {
      "id": "string",
      "type": "popup|highlight|click|navigate",
      "target": "CSS selector",
      "content": "Explanation text for narration",
      "duration": 5000,
      "actions": [{"do": "click", "selector": "string"}]
    }
  ]
}

Generate the JSON now:`;
}
```

### 4.4 Response Handling

```javascript
// json-generator.js
async function generatePresentation(projectData) {
  const prompt = buildGeminiPrompt(projectData);
  
  try {
    // Rate-limited call to Gemini
    const result = await rateLimitedGenerate(prompt);
    const response = result.response;
    const rawText = response.text();
    
    // Clean response (remove markdown if present)
    let cleaned = rawText.trim();
    cleaned = cleaned.replace(/```json\n?|\n?```/g, '');
    cleaned = cleaned.replace(/^[^{]*/, ''); // Remove text before first {
    cleaned = cleaned.replace(/[^}]*$/, ''); // Remove text after last }
    
    // Parse JSON
    const presentation = JSON.parse(cleaned);
    
    // Validate schema
    const valid = validatePresentation(presentation);
    if (!valid) {
      throw new Error('Invalid presentation schema');
    }
    
    return presentation;
    
  } catch (error) {
    if (error.message.includes('RATE_LIMIT')) {
      console.error('Rate limit hit. Wait 24h or use different API key.');
      throw new Error('Gemini rate limit exceeded');
    }
    throw error;
  }
}
```

---

## 5. Build System (esbuild - FREE & FAST)

### 5.1 Runtime Build Script

```javascript
// packages/runtime/build.js
import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2022'],
  format: 'iife',
  globalName: 'ProjectPA',
  outfile: 'dist/project-pa.min.js',
  banner: {
    js: '/*! Project PA v1.0.0 | MIT License */'
  }
});

console.log('✅ Build complete: dist/project-pa.min.js');
```

### 5.2 Build Command

```json
// package.json
{
  "scripts": {
    "build": "node build.js",
    "dev": "node build.js --watch",
    "test": "node --test"
  }
}
```

---

## 6. Data Flow

### 6.1 Generation Flow with Gemini

```
Developer                CLI              Gemini API (FREE)    File System
    │                     │                    │                   │
    │─ pa generate ──────>│                    │                   │
    │                     │                    │                   │
    │                     │── Check cache ────>│                   │
    │                     │                    │                   │
    │                     │── Scan files ──────│                   │
    │                     │<── File data ──────│                   │
    │                     │                    │                   │
    │                     │─── Rate limited ──>│                   │
    │                     │    Gemini request  │                   │
    │                     │                    │                   │
    │                     │<── JSON response ──│                   │
    │                     │    (FREE tier)     │                   │
    │                     │                    │                   │
    │                     │─── Write presentation.json ───────────>│
    │                     │                    │                   │
    │                     │─── Cache result ───│──────────────────>│
    │                     │                    │                   │
    │<─── Complete ───────│                    │                   │
    │   (0 cost)          │                    │                   │
```

---

## 7. API Specifications

### 7.1 presentation.json Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["meta", "steps"],
  "properties": {
    "meta": {
      "type": "object",
      "required": ["project", "author", "entryUrl"],
      "properties": {
        "project": {"type": "string"},
        "author": {"type": "string"},
        "description": {"type": "string"},
        "techStack": {"type": "array", "items": {"type": "string"}},
        "entryUrl": {"type": "string"},
        "version": {"type": "string", "default": "1.0"}
      }
    },
    "steps": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "type", "content"],
        "properties": {
          "id": {"type": "string"},
          "type": {"enum": ["popup", "highlight", "click", "navigate", "wait"]},
          "target": {"type": "string"},
          "content": {"type": "string"},
          "duration": {"type": "integer", "minimum": 0},
          "audio": {"type": "string"},
          "actions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "do": {"enum": ["click", "scroll", "input", "hover"]},
                "selector": {"type": "string"},
                "value": {"type": "string"}
              }
            }
          }
        }
      }
    }
  }
}
```

---

### 7.2 CLI Commands

```bash
# Initialize project
pa init
  --config <path>       # Custom config path
  --force              # Overwrite existing

# Generate presentation (FREE - uses Gemini)
pa generate
  --input <dir>        # Project directory (default: .)
  --output <file>      # Output file (default: ./presentation.json)
  --api-key <key>      # Gemini API key (or use GEMINI_API_KEY env)
  --model <model>      # gemini-2.0-flash-exp (default, FREE)
  --depth <level>      # Analysis depth: basic|standard|deep
  --no-cache          # Skip cache
  --force             # Regenerate even if cached

# Preview
pa preview
  --file <path>        # presentation.json path
  --port <number>      # Dev server port (default: 3000)

# Validate
pa validate
  --file <path>        # Validate presentation.json

# Check API quota
pa quota
  --api-key <key>      # Check remaining requests

# Version
pa --version

# Help
pa --help
```

---

## 8. Environment Variables

```bash
# Required - Get FREE key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=AIza...

# Optional
GEMINI_MODEL=gemini-2.0-flash-exp    # Default FREE model
PA_CACHE_DIR=./.pa-cache             # Cache directory
PA_LOG_LEVEL=info                    # Logging: debug|info|warn|error
PA_MAX_RETRIES=3                     # API retry count
PA_TIMEOUT=30000                     # API timeout (ms)
```

---

## 9. Getting FREE Gemini API Key

### Steps:
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Set environment variable:
   ```bash
   export GEMINI_API_KEY="AIza..."
   ```

### FREE Tier Limits:
- **1,500 requests per day** (RPD)
- **4 million tokens per day**
- **32,000 tokens per request**
- **No credit card required**
- **Forever free** (as of 2025)

---

## 10. Dependencies (Final List - All FREE)

### Runtime (Zero external dependencies)
```json
{
  "name": "@project-pa/runtime",
  "version": "1.0.0",
  "dependencies": {},
  "devDependencies": {
    "esbuild": "^0.19.11"
  }
}
```

### CLI (All FREE open source)
```json
{
  "name": "@project-pa/cli",
  "version": "1.0.0",
  "dependencies": {
    "commander": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "acorn": "^8.11.3",
    "node-html-parser": "^6.1.12",
    "css-tree": "^2.3.1",
    "bottleneck": "^2.19.5",
    "ajv": "^8.12.0",
    "chalk": "^5.3.0",
    "ora": "^8.0.1"
  },
  "devDependencies": {
    "eslint": "^9.0.0"
  }
}
```

**Total Cost: $0/month**

---

## 11. Performance Requirements

| Metric | Target | Critical |
|--------|--------|----------|
| Widget Load Time | < 300ms | < 500ms |
| Bundle Size | < 30KB | < 50KB |
| Memory Usage | < 8MB | < 15MB |
| CLI Generation Time | < 20s | < 40s |
| Gemini API Response | < 10s | < 20s |

---

## 12. Error Handling

### 12.1 Gemini-Specific Errors

```javascript
class GeminiError extends Error {
  constructor(code, message, details) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

// Error codes
const GEMINI_ERRORS = {
  RATE_LIMIT: 'GEMINI_001',
  QUOTA_EXCEEDED: 'GEMINI_002',
  INVALID_KEY: 'GEMINI_003',
  MALFORMED_RESPONSE: 'GEMINI_004',
  NETWORK_ERROR: 'GEMINI_005'
};

// Handle rate limits
function handleGeminiError(error) {
  if (error.message.includes('RATE_LIMIT_EXCEEDED')) {
    console.error('❌ Gemini rate limit: 1500 requests/day exceeded');
    console.log('💡 Solutions:');
    console.log('   1. Wait 24 hours for reset');
    console.log('   2. Use a different Google account');
    console.log('   3. Use cached results (--cache)');
    process.exit(1);
  }
}
```

---

## 13. Caching Strategy (Reduce API Calls)

```javascript
// cache-manager.js
import { createHash } from 'crypto';
import { readFile, writeFile } from 'fs/promises';

function getCacheKey(projectData) {
  const hash = createHash('md5')
    .update(JSON.stringify(projectData))
    .digest('hex');
  return `${projectData.name}-${hash}.json`;
}

async function getCached(projectData) {
  const key = getCacheKey(projectData);
  const path = `.pa-cache/${key}`;
  
  try {
    const data = await readFile(path, 'utf8');
    console.log('✅ Using cached presentation (FREE)');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function setCache(projectData, presentation) {
  const key = getCacheKey(projectData);
  const path = `.pa-cache/${key}`;
  await writeFile(path, JSON.stringify(presentation, null, 2));
}
```

---

## 14. Free Hosting Options

### 14.1 CDN Hosting (FREE)

```bash
# Option 1: jsDelivr (FREE CDN)
https://cdn.jsdelivr.net/gh/username/project-pa@version/dist/project-pa.min.js

# Option 2: unpkg (FREE CDN)
https://unpkg.com/@project-pa/runtime@1.0.0/dist/project-pa.min.js

# Option 3: GitHub Pages (FREE)
https://username.github.io/project-pa/dist/project-pa.min.js
```

### 14.2 Demo Site Hosting

```bash
# FREE options:
- Vercel (free tier)
- Netlify (free tier)
- GitHub Pages (always free)
- Cloudflare Pages (always free)
```

---

## 15. Cost Breakdown

| Component | Service | Cost |
|-----------|---------|------|
| **LLM API** | Google Gemini 2.0 Flash | **$0** (1500/day free) |
| **Code Hosting** | GitHub | **$0** (public repos) |
| **CDN** | jsDelivr / unpkg | **$0** (unlimited) |
| **Development** | VS Code + Node.js | **$0** |
| **Testing** | Node native test | **$0** |
| **Build Tool** | esbuild | **$0** |
| **Domain** | GitHub Pages subdomain | **$0** |
| **CI/CD** | GitHub Actions | **$0** (2000 min/month) |

**TOTAL MONTHLY COST: $0** ✅

---

## 16. Quota Management

```javascript
// quota-tracker.js
class QuotaTracker {
  constructor() {
    this.daily = 1500;
    this.used = 0;
    this.resetTime = null;
  }
  
  async track() {
    this.used++;
    console.log(`📊 Gemini API: ${this.used}/${this.daily} used today`);
    
    if (this.used >= this.daily) {
      console.warn('⚠️  Approaching daily limit!');
    }
  }
  
  canMakeRequest() {
    return this.used < this.daily;
  }
}
```

---

## 17. Alternative FREE Models (Backup)

| Model | Provider | Free Tier | RPD |
|-------|----------|-----------|-----|
| **Gemini 2.0 Flash** | Google | Primary | 1500 |
| **Gemini 1.5 Flash** | Google | Fallback | 1500 |
| **Gemini 1.5 Pro** | Google | Deep mode | 50 |

---

## Appendix: Why This Stack is FREE Forever

### ✅ Free Components:

1. **Gemini API**: Google's free tier is permanent, not a trial
2. **Node.js**: Open source, always free
3. **esbuild**: Open source, MIT license
4. **All npm packages**: Open source, free to use
5. **GitHub**: Free for public repos
6. **CDN**: jsDelivr/unpkg free forever
7. **Web APIs**: Native browser features

### 🚫 No Hidden Costs:

- No credit card required
- No trial periods that expire
- No freemium upsells
- No bandwidth charges
- No storage fees

**This stack is 100% FREE and will remain FREE.**

---

**END OF FREE STACK TECHNICAL DOCUMENT**