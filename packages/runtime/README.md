# @abhi21121211/runtime

[![npm version](https://img.shields.io/npm/v/@abhi21121211/runtime.svg)](https://www.npmjs.com/package/@abhi21121211/runtime)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The lightweight runtime widget for **Project PA** (Project Presenter Agent). This zero-dependency library injects a floating "Start Tour" widget, a guided tour popup, and an element highlighter into any web application.

## Features

- 🎯 **Smart Highlighting**: Visually focuses on elements using CSS selectors.
- 💬 **Guided Tour**: Step-by-step popup with professional narration.
- 🗣️ **Text-to-Speech**: Built-in voice narration for accessibility and engagement.
- ⏩ **Auto-Advance**: Seamlessly moves to the next step after a set duration.
- 🔄 **State Persistence**: Remembers the current step across page reloads and redirects.
- 📱 **Responsive**: Fully optimized for desktop and mobile devices.

## Installation & Usage

### Option 1: CDN (Recommended)
Simply add this script tag to your `index.html` `<body>`. This is the easiest way to integrate Project PA.

```html
<script 
  type="module" 
  src="https://unpkg.com/@abhi21121211/runtime@latest/dist/project-pa.min.js"
  data-project-id="YOUR_PROJECT_ID">
</script>
```

*   Replace `YOUR_PROJECT_ID` with the ID you received from `pa deploy`.
*   If testing locally with a `presentation.json` file, you can omit `data-project-id`.

### Option 2: NPM
If you prefer to bundle it with your application:

```bash
npm install @abhi21121211/runtime
```

Then import it in your entry file (e.g., `main.js`, `App.tsx`):

```javascript
import '@abhi21121211/runtime';
```

## Configuration

The runtime is driven by a `presentation.json` file (fetched from the cloud via `data-project-id` or locally).

### Structure

```json
{
  "meta": {
    "project": "My Awesome App",
    "entryUrl": "/"
  },
  "steps": [
    {
      "id": "step-1",
      "type": "highlight", 
      "target": "#login-btn",
      "content": "Click here to sign in securely.",
      "duration": 5000
    },
    {
      "id": "step-2",
      "type": "popup",
      "target": "body",
      "content": "This is the main dashboard where you can see your stats.",
      "page": "/dashboard"
    }
  ]
}
```

### Step Options

| Property | Type | Description |
|----------|------|-------------|
| `type` | `string` | `highlight` (focus element), `popup` (message only), `click` (simulate click). |
| `target` | `string` | CSS selector of the element to interact with (e.g., `#my-id`, `.my-class`). |
| `content` | `string` | The text to display and narrate. |
| `duration` | `number` | Time in milliseconds before auto-advancing (default: 5000). |
| `page` | `string` | (Optional) The URL path this step belongs to. Runtime waits for this page match. |
| `actions` | `array` | (Optional) List of actions to perform, e.g., `[{"do": "click", "selector": "#btn"}]`. |

## License

MIT
