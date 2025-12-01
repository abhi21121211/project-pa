# @abhi21121211/project-pa-cli

[![npm version](https://img.shields.io/npm/v/@abhi21121211/project-pa-cli.svg)](https://www.npmjs.com/package/@abhi21121211/project-pa-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official Command Line Interface for **Project PA** (Project Personal Assistant). This tool empowers you to generate AI-powered guided tours for your web projects, preview them locally, and deploy them to the cloud.

## Features

- 🚀 **Init**: Instantly scaffold a new presentation configuration.
- 🧠 **Generate**: Leverage Google Gemini AI to analyze your codebase and create a professional, recruiter-ready presentation script.
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

**New in v1.1.22+**: Interactive setup with support for **Google Gemini** and **OpenRouter**!

```bash
pa generate
```

The CLI will guide you through a beautiful interactive menu:

1.  **Select Provider**:
    *   **Google Gemini** (Free tier available)
    *   **OpenRouter** (Access to Llama 3, Claude 3.5, GPT-4o, etc.)
2.  **API Key**:
    *   Enter your key securely (masked input).
    *   Or set environment variables: `GEMINI_API_KEY` or `OPENROUTER_API_KEY`.
3.  **Select Model**:
    *   **Free Models**: Gemini 2.0 Flash, Llama 3.2, Phi-3, Mistral 7B, Qwen 2.5.
    *   **Paid Models**: Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro.
    *   **Custom**: Enter any OpenRouter model ID (e.g., `openai/gpt-4-turbo`).

**Non-Interactive Mode:**
You can still pass an API key directly (defaults to Gemini):

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

The CLI uses `presentation.json` to store your tour steps. You can manually edit this file to tweak the content, selectors, or timing.

```json
{
  "meta": {
    "project": "My App",
    "entryUrl": "/"
  },
  "steps": [
    {
      "type": "popup",
      "target": "#hero-section",
      "content": "Welcome to the app!",
      "duration": 5000
    }
  ]
}
```

## License

MIT
