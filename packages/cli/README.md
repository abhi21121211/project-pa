# @project-pa/cli

The Command Line Interface for **Project PA** (Project Presenter Agent). This tool helps you initialize, generate, and preview AI-powered project presentations.

## Features

- 🚀 **Init**: Quickly set up a new presentation project.
- 🧠 **Generate**: Use Google Gemini AI to analyze your codebase and generate a presentation script automatically.
- 🌐 **Preview**: Serve your project locally to test the presentation without CORS issues.

## Installation

```bash
npm install -g @project-pa/cli
```

## Usage

### Initialize a Project

```bash
pa init
```

### Generate a Presentation

Analyze your project and generate `presentation.json` using AI:

```bash
pa generate --api-key YOUR_GEMINI_API_KEY
```

Or set the environment variable `GEMINI_API_KEY`.

### Preview Project

Start a local server to view your project with the runtime injected (if configured):

```bash
pa preview --port 3000
```

## License

MIT
