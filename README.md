# Project PA (Project Personal Assistant) 🚀

**Project PA** is an AI-powered SaaS tool that automatically generates and hosts interactive walkthroughs for your web projects.

![Project PA Demo](https://via.placeholder.com/800x400?text=Project+PA+Demo+Placeholder)

## 📦 Packages

- **[@abhi21121211/project-pa-runtime](https://www.npmjs.com/package/@abhi21121211/project-pa-runtime)**: The client-side widget.
- **[@abhi21121211/project-pa-cli](https://www.npmjs.com/package/@abhi21121211/project-pa-cli)**: The command-line tool.
- **@abhi21121211/project-pa-backend**: The cloud service for storing presentations.

## 🚀 Quick Start

### 1. Install the CLI

```bash
npm install -g @abhi21121211/project-pa-cli
```

### 2. Initialize in your project

```bash
cd my-web-project
pa init
```

### 3. Generate a Presentation

```bash
# Interactive mode (Recommended) - Supports Gemini & OpenRouter
pa generate

# Or pass key directly
pa generate --api-key YOUR_API_KEY
```

### 4. Preview

```bash
pa preview
```

### 5. Deploy

```bash
pa deploy
```

## 📦 Installation (Runtime)

If you just want to add the widget to your site manually:

```html
<script type="module" src="https://unpkg.com/@abhi21121211/project-pa-runtime@latest/dist/project-pa.min.js" data-project-id="YOUR_PROJECT_ID"></script>
```

That's it! Your tour is now live and hosted on our cloud. You can update it anytime by running `pa deploy` again.

---

## 🛠️ CLI Commands

- `pa init`: Create a new presentation file.
- `pa generate`: AI-powered script generation.
- `pa preview`: Test locally before deploying.
- `pa deploy`: Upload to cloud and get your embed code.

## 📚 Developer Guide & Best Practices

To get the best results from Project PA's AI generation, follow our **[Developer Best Practices](BEST_PRACTICES.md)**.

Key tips include:
*   Adding meaningful `id` attributes to interactive elements.
*   Using semantic HTML (`<nav>`, `<main>`).
*   Writing a descriptive `README.md`.

## 📄 License

MIT
