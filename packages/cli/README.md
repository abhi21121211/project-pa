# @abhi21121211/project-pa-cli

[![npm version](https://img.shields.io/npm/v/@abhi21121211/project-pa-cli.svg)](https://www.npmjs.com/package/@abhi21121211/project-pa-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official Command Line Interface for **Project PA** (Project Personal Assistant). This tool empowers you to generate AI-powered guided tours for your web projects, preview them locally, and deploy them to the cloud.

## Features

- 🚀 **Init**: Instantly scaffold a new presentation configuration.
- 🧠 **Generate**: Leverage AI to analyze your codebase and create a professional, recruiter-ready presentation script.
- 🌐 **Preview**: Run a local server to test your tour with the runtime widget injected.
- ☁️ **Deploy**: Upload your presentation to the Project PA cloud and get a shareable embed code.

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

? Select your LLM Provider (Gemini / OpenRouter): 
  ❯ Gemini
    OpenRouter

? Select model (Gemini 2.0 Flash / Gemini 1.5 Pro):
  ❯ Gemini 2.0 Flash
    Gemini 1.5 Pro
```

#### Supported Providers & Models

| Provider | Free Models | Paid Models |
|----------|-------------|-------------|
| **Gemini** | Gemini 2.0 Flash | Gemini 1.5 Pro |
| **OpenRouter** | Grok 4.1 Fast, Qwen3 Coder, DeepSeek R1T, GLM 4.5 Air | Claude 3.5 Sonnet, GPT-4o, Gemini Pro 1.5 |

#### Environment Variables
Set API keys to skip manual entry:
```bash
export GEMINI_API_KEY=your_key_here
export OPENROUTER_API_KEY=your_key_here
```

#### Non-Interactive Mode
Pass API key directly (defaults to Gemini):
```bash
pa generate --api-key YOUR_KEY
```

### 3. Preview
Test your presentation locally. This starts a server and injects the runtime widget into your app.

```bash
pa preview --port 3000
```

### 4. Deploy
Ready to share? Deploy your presentation to the cloud.

```bash
pa deploy
```

On success, you will receive a **Project ID** and a script tag to embed in your live site.

## Configuration

The CLI generates `presentation.json` to store your tour steps. You can manually edit this file to tweak the content, selectors, or timing.

```json
{
  "meta": {
    "project": "My App",
    "author": "Developer",
    "description": "A brief description of the project",
    "techStack": ["React", "Tailwind CSS"],
    "entryUrl": "/"
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

## Links

- 📦 [Runtime Package](https://www.npmjs.com/package/@abhi21121211/project-pa-runtime)
- 🐙 [GitHub Repository](https://github.com/abhi21121211/project-pa)

## License

MIT
