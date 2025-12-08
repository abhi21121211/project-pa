# @abhi21121211/project-pa-cli

[![npm version](https://img.shields.io/npm/v/@abhi21121211/project-pa-cli.svg)](https://www.npmjs.com/package/@abhi21121211/project-pa-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official Command Line Interface for **Project PA** (Project Personal Assistant). This tool empowers you to generate AI-powered guided tours for your web projects, preview them locally, and deploy them to the cloud.

## ✨ Features

- 🚀 **Init**: Instantly scaffold a new presentation configuration.
- 🧠 **Generate**: Leverage AI to analyze your codebase and create a professional, recruiter-ready presentation script.
- 🔐 **Protected Routes**: Optional auth token support for projects with authenticated pages.
- 🌐 **Preview**: Run a local server to test your tour with the runtime widget injected.
- ☁️ **Deploy**: Upload your presentation to the cloud with version history.
- 📦 **Persistent Project ID**: Same project always uses the same ID across deployments.
- 📜 **Version History**: Keeps last 3 versions of your presentation automatically.

## Installation

Install globally via npm:

```bash
npm install -g @abhi21121211/project-pa-cli
```

## Usage

### 1. Initialize
Run this in your project root to create a basic configuration:

```bash
pa init
```

### 2. Generate Presentation
Analyze your project files and generate a `presentation.json` using AI.

```bash
pa generate
```

The CLI will guide you through an interactive menu:

```
🚀 Project PA - Presentation Generator

? Select your LLM Provider (Gemini / OpenRouter): Gemini
? Enter your API Key: ***
? Select model (Gemini 2.0 Flash / Gemini 1.5 Flash / Gemini 1.5 Pro): Gemini 2.0 Flash
? Does your project have protected/authenticated routes? Yes
? Do you want to provide an auth token to access protected pages? No
ℹ Protected routes will be mentioned but not shown in detail.
✔ Project analyzed
✔ Presentation generated
```

#### Supported Providers & Models

| Provider | Free Models | Paid Models |
|----------|-------------|-------------|
| **Gemini** | Gemini 2.0 Flash, Gemini 1.5 Flash | Gemini 1.5 Pro |
| **OpenRouter** | Llama 3.3, Mistral 7B, Hermes 3 | Claude 3.5, GPT-4o, Gemini Pro |

#### Auto-Detection of API Key
The CLI automatically detects your provider from the API key format:
- Keys starting with `AIza` → Gemini
- Keys starting with `sk-or-` → OpenRouter

#### Environment Variables
Set API keys to skip manual entry:
```bash
export GEMINI_API_KEY=your_key_here
export OPENROUTER_API_KEY=your_key_here
```

#### Non-Interactive Mode
Pass API key directly:
```bash
pa generate --api-key YOUR_GEMINI_KEY
pa generate --api-key sk-or-YOUR_OPENROUTER_KEY
```

### 3. Protected Routes Support

If your project has authenticated pages (admin dashboard, user settings, etc.), the CLI offers special handling:

```
? Does your project have protected/authenticated routes? Yes
? Do you want to provide an auth token to access protected pages? Yes
? Enter your auth token: ***
? Does your project have multiple user roles? Yes
? Enter the role to present: admin
✓ Auth configured for role: admin
```

**Without auth token**: Protected routes are mentioned in the presentation but not navigated to (prevents redirect loops).

**With auth token**: Protected pages can be included in the tour based on the specified role.

### 4. Preview
Test your presentation locally. This starts a server and injects the runtime widget into your app.

```bash
pa preview --port 3000
```

### 5. Deploy
Ready to share? Deploy your presentation to the cloud.

```bash
pa deploy
```

#### Version History
- First deploy creates a new **Project ID** stored in `.pa-config.json`
- Subsequent deploys update the same Project ID
- Last **3 versions** are automatically saved
- 4th deployment removes the oldest version

```
📦 Project ID: myproject-abc123
   History: 2 previous version(s) saved

📝 To use this presentation, add this script to your website:
<script type="module" src="https://unpkg.com/@abhi21121211/project-pa-runtime@latest/dist/project-pa.min.js" data-project-id="myproject-abc123"></script>

💡 Tip: Run `pa deploy` again to update - your Project ID stays the same!
```

## Configuration

The CLI generates `presentation.json` to store your tour steps. You can manually edit this file to tweak the content, selectors, or timing.

```json
{
  "meta": {
    "project": "My App",
    "author": "Developer",
    "description": "A brief description of the project",
    "techStack": ["React", "Tailwind CSS"],
    "entryUrl": "/",
    "uniqueId": "myapp-abc123"
  },
  "steps": [
    {
      "id": "intro",
      "type": "popup",
      "page": "/",
      "target": "body",
      "content": "Welcome to the app! Built with React and Tailwind CSS.",
      "duration": 8000
    },
    {
      "id": "feature-1",
      "type": "highlight",
      "page": "/",
      "target": "#hero-section",
      "content": "This hero section showcases the main value proposition.",
      "duration": 7000
    }
  ]
}
```

### Step Types

| Type | Description |
|------|-------------|
| `popup` | Shows an overlay message (no specific element) |
| `highlight` | Highlights a specific element with a tooltip |
| `click` | Simulates clicking an element |
| `navigate` | Navigates to a different page/route |

## Files Created

| File | Purpose |
|------|---------|
| `presentation.json` | Your presentation configuration |
| `.pa-config.json` | Stores your Project ID (add to `.gitignore`) |

## Links

- 📦 [Runtime Package](https://www.npmjs.com/package/@abhi21121211/project-pa-runtime)
- 🐙 [GitHub Repository](https://github.com/abhi21121211/project-pa)

## Changelog

### v1.1.45
- ✨ Persistent Project ID with `.pa-config.json`
- 📜 Version history (keeps last 3 deployments)
- 🔐 Protected routes authentication support
- 🎯 Auto-detection of API key provider
- ✅ Auto-fix for invalid presentation steps
- 📊 Smarter project analyzer (limits context size)

## License

MIT
