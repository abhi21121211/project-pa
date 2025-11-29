# Project PA (Project Presenter Agent) 🚀

**Project PA** is an AI-powered tool that automatically generates and presents interactive walkthroughs for your web projects. It analyzes your codebase, creates a guided tour script, and provides a lightweight runtime widget to present it to your users.

![Project PA Demo](https://via.placeholder.com/800x400?text=Project+PA+Demo+Placeholder)

## 📦 Packages

- **[@abhi21121211/runtime](https://www.npmjs.com/package/@abhi21121211/runtime)**: The client-side widget that runs the guided tour.
- **[@abhi21121211/cli](https://www.npmjs.com/package/@abhi21121211/cli)**: The command-line tool to initialize, generate, and deploy presentations.

---

## 🛠️ CLI Installation & Usage

The CLI is your main interface for managing Project PA.

### 1. Install Globally
```bash
npm install -g @abhi21121211/cli
```

### 2. Initialize Project
Navigate to your web project's root directory and run:
```bash
pa init
```
This creates a default `presentation.json` file in your directory.

### 3. Generate Presentation (AI-Powered) 🧠
Let AI analyze your project and write the tour for you! You'll need a [Google Gemini API Key](https://aistudio.google.com/app/apikey).
```bash
pa generate --api-key YOUR_GEMINI_API_KEY
```
This command:
- Scans your HTML/React/Vue/Svelte files.
- Sends the structure to Gemini AI.
- Generates a `presentation.json` with steps highlighting key features.

### 4. Preview Locally
Test your presentation locally without deploying.
```bash
pa preview
```
This starts a local server (default port 3000) to avoid CORS issues with `file://` protocols.

### 5. Deploy to Cloud ☁️
Upload your presentation to the Project PA Cloud Backend. This allows you to update the tour without redeploying your website.
```bash
pa deploy
```
*Note: Requires a running backend instance (see below).*

---

## 💻 Runtime Integration

The runtime is the widget that your users see. You can integrate it in two ways:

### Option A: CDN (Easiest)
Add this script tag to your `index.html` (or `public/index.html` for React/Vue):

```html
<script type="module" src="https://unpkg.com/@abhi21121211/runtime@latest/dist/project-pa.min.js"></script>
```
Ensure your `presentation.json` is in the same directory (e.g., `public/presentation.json`).

### Option B: NPM Package
Install the package:
```bash
npm install @abhi21121211/runtime
```
Import and initialize it in your entry file (e.g., `main.jsx`, `main.js`):
```javascript
import '@abhi21121211/runtime';
```

---

## 📄 presentation.json Structure

You can manually edit the `presentation.json` file to fine-tune your tour.

```json
{
  "meta": {
    "project": "My Awesome App",
    "description": "A guided tour of my app"
  },
  "steps": [
    {
      "id": "welcome",
      "title": "Welcome!",
      "content": "This is the main dashboard.",
      "target": "#dashboard-header", // CSS Selector to highlight
      "action": "none",
      "duration": 5000 // Auto-advance after 5s
    },
    {
      "id": "feature-1",
      "title": "Cool Feature",
      "content": "Click here to see magic.",
      "target": ".feature-btn",
      "action": "click" // Simulates a click
    }
  ]
}
```

---

## ☁️ Cloud Backend (Optional)

Project PA includes an optional backend service to host your presentations.

1.  **Deploy Backend**: Use the provided `render.yaml` to deploy the `packages/backend` to [Render](https://render.com).
2.  **Configure**: Set `MONGODB_URI` environment variable on Render.
3.  **Use**: The `pa deploy` command will upload your script to this backend.

---

## 📂 Examples

Check out the `examples/` directory:
- **`react-ecommerce`**: A full React + Vite e-commerce app with multi-page tour.
- **`abhi-ai-portfolio`**: A portfolio website integration.

## 📄 License

MIT
