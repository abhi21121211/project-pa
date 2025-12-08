# @abhi21121211/project-pa-runtime

[![npm version](https://img.shields.io/npm/v/@abhi21121211/project-pa-runtime.svg)](https://www.npmjs.com/package/@abhi21121211/project-pa-runtime)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The lightweight runtime widget for **Project PA** (Project Personal Assistant). This zero-dependency library injects a floating "Start Tour" widget, a guided tour popup, and an element highlighter into any web application.

## Features

- 🎯 **Smart Highlighting**: Visually focuses on elements using CSS selectors.
- 💬 **Guided Tour**: Step-by-step popup with professional narration.
- 🗣️ **Text-to-Speech**: Built-in voice narration for accessibility and engagement.
- ⏩ **Auto-Advance**: Seamlessly moves to the next step after a set duration.
- 🔄 **State Persistence**: Remembers the current step across page reloads and redirects.
- 📱 **Responsive**: Fully optimized for desktop and mobile devices.
- 🎭 **Two Modes**: Full project tour OR current page explanation only.

## Installation & Usage

### Option 1: CDN (Recommended)
Simply add this script tag to your `index.html` `<body>`. This is the easiest way to integrate Project PA.

```html
<script 
  type="module" 
  src="https://unpkg.com/@abhi21121211/project-pa-runtime@latest/dist/project-pa.min.js"
  data-project-id="YOUR_PROJECT_ID">
</script>
```

*   Replace `YOUR_PROJECT_ID` with the ID you received from `pa deploy`.
*   If testing locally with a `presentation.json` file, you can omit `data-project-id`.

### Option 2: NPM
If you prefer to bundle it with your application:

```bash
npm install @abhi21121211/project-pa-runtime
```

Then import it in your entry file (e.g., `main.js`, `App.tsx`):

```javascript
import '@abhi21121211/project-pa-runtime';
```

## Tour Modes

The widget provides two modes accessible via the floating button:

| Mode | Description |
|------|-------------|
| **Start Full Tour** | Navigates to home page and shows ALL steps across all pages |
| **Explain This Page** | Shows only steps for the CURRENT page (no navigation) |

## Configuration

The runtime is driven by a `presentation.json` file (fetched from the cloud via `data-project-id` or locally).

### Structure

```json
{
  "meta": {
    "project": "My Awesome App",
    "author": "Developer",
    "description": "Brief project description",
    "techStack": ["React", "Node.js"],
    "entryUrl": "/"
  },
  "steps": [
    {
      "id": "intro",
      "type": "popup",
      "page": "/",
      "target": "body",
      "content": "Welcome to the app! Built with React and Node.js.",
      "duration": 8000
    },
    {
      "id": "login-btn",
      "type": "highlight", 
      "page": "/",
      "target": "#login-btn",
      "content": "Click here to sign in securely with JWT authentication.",
      "duration": 7000
    },
    {
      "id": "dashboard",
      "type": "popup",
      "page": "/dashboard",
      "target": "body",
      "content": "This is the main dashboard where you can see your stats.",
      "duration": 8000
    }
  ]
}
```

### Step Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the step |
| `type` | `string` | ✅ | `popup`, `highlight`, `click`, or `navigate` |
| `page` | `string` | ✅ | URL path this step belongs to (e.g., `/`, `/about`) |
| `target` | `string` | ✅ | CSS selector (e.g., `#my-id`, `.my-class`). Use `body` for popups. |
| `content` | `string` | ✅ | Text to display and narrate (15-25 words recommended) |
| `duration` | `number` | ❌ | Time in ms before auto-advancing (default: 5000) |
| `actions` | `array` | ❌ | Actions to perform, e.g., `[{"do": "click", "selector": "#btn"}]` |

### Step Types

| Type | Description | Target |
|------|-------------|--------|
| `popup` | Shows a message popup | Use `body` |
| `highlight` | Highlights a UI element with overlay | Specific selector |
| `click` | Simulates a click action | Specific selector |
| `navigate` | Navigates to another page | Specific selector + `page` |

## Links

- 📦 [CLI Package](https://www.npmjs.com/package/@abhi21121211/project-pa-cli)
- 🐙 [GitHub Repository](https://github.com/abhi21121211/project-pa)

## License

MIT
