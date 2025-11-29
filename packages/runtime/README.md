# @project-pa/runtime

The runtime widget for **Project PA** (Project Presenter Agent). This lightweight, zero-dependency (at runtime) library injects a floating widget, guided tour popup, and element highlighter into any web application.

## Features

- 🎯 **Element Highlighting**: Visually highlights elements on the page.
- 💬 **Guided Tour**: Step-by-step popup with descriptions.
- 🗣️ **Voice Narration**: Reads step content aloud (Text-to-Speech).
- ⏩ **Auto-Advance**: Automatically proceeds to the next step.
- 🔄 **Multi-page Support**: Persists state across page reloads and redirects.
- 📱 **Responsive**: Works on desktop and mobile.

## Installation

```bash
npm install @project-pa/runtime
```

## Usage

### Option 1: Direct Script Tag (Recommended for Static Sites)

Copy the `dist/project-pa.min.js` file to your project and include it:

```html
<script src="path/to/project-pa.min.js"></script>
```

### Option 2: ES Module Import

```javascript
import '@project-pa/runtime';
```

## Configuration

The runtime looks for a `presentation.json` file in the root of your web server (or relative to the current page).

### `presentation.json` Format

```json
{
  "meta": {
    "project": "My Project",
    "entryUrl": "index.html"
  },
  "steps": [
    {
      "id": "step1",
      "type": "highlight",
      "target": "#header",
      "content": "This is the header section.",
      "page": "index.html",
      "duration": 5000
    },
    {
      "id": "step2",
      "type": "click",
      "target": ".btn-primary",
      "content": "Clicking the button...",
      "actions": [
        { "do": "click", "selector": ".btn-primary" }
      ]
    }
  ]
}
```

## License

MIT
