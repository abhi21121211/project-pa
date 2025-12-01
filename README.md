# Project PA (Project Presenter Agent) 🚀

**Project PA** is an AI-powered SaaS tool that automatically generates and hosts interactive walkthroughs for your web projects.

![Project PA Demo](https://via.placeholder.com/800x400?text=Project+PA+Demo+Placeholder)

## 📦 Packages

- **[@abhi21121211/runtime](https://www.npmjs.com/package/@abhi21121211/runtime)**: The client-side widget.
- **[@abhi21121211/cli](https://www.npmjs.com/package/@abhi21121211/cli)**: The command-line tool.

---

## � Quick Start Guide

### 1. Install CLI
```bash
npm install -g @abhi21121211/cli
```

### 2. Initialize & Generate
Go to your project folder:
```bash
pa init
pa generate --api-key YOUR_GEMINI_API_KEY
```
This creates a `presentation.json` file locally.

### 3. Deploy to Cloud ☁️
Upload your presentation to our cloud:
```bash
pa deploy
```
This will give you a **Project ID** and a script tag.

### 4. Add to Website
Copy the script tag provided by the deploy command and add it to your `index.html`:

```html
<script type="module" src="https://unpkg.com/@abhi21121211/runtime@latest/dist/project-pa.min.js" data-project-id="YOUR_PROJECT_ID"></script>
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
