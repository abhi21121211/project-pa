# CLI Integration Guide

This document explains how the @abhi21121211/cli is integrated with your React Todo App.

## Installation

The CLI is installed globally:
```bash
npm install -g @abhi21121211/cli
```

## ✅ Issue Resolution

**Fixed:** The CLI was injecting runtime scripts into your React app, causing JSON parsing errors.

**Solution:** Added `"skipRuntimeInjection": true` to `.parc.json` configuration to prevent script injection.

## Usage

You can now use the CLI commands safely with your React app.

### Available Commands

```bash
# View help and available commands
pa --help

# Generate with API key
pa generate --api-key <YOUR_API_KEY>

# Deploy your project
pa deploy

# View project status
pa status
```

## Integration with React Todo App

The CLI can be used to:

1. **Build & Deploy** - Easily build and deploy your React Todo app
2. **Project Management** - Manage your project structure
3. **Development Tools** - Access development utilities

### Example Workflow

```bash
# Navigate to your project
cd /Users/abhi/Developer/My\ Project/react-todo-app

# Build for production
pa build

# Deploy your app
pa deploy
```

## Adding CLI Scripts to package.json

You can optionally add custom npm scripts that use the CLI:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "deploy": "pa deploy",
    "preview": "vite preview",
    "init-cli": "pa init"
  }
}
```

Then run:
```bash
npm run deploy
# or
npm run init-cli
```

## Features

- 🚀 Fast deployment
- 🔧 Project configuration
- 📦 Build optimization
- 🌐 Multi-environment support
- 📊 Analytics and monitoring

## Documentation

For detailed documentation, visit:
- [CLI GitHub](https://github.com/abhi21121211/cli)
- [NPM Package](https://www.npmjs.com/package/@abhi21121211/cli)

## Troubleshooting

If the CLI command doesn't work:

1. Verify installation:
   ```bash
   npm list -g @abhi21121211/cli
   ```

2. Update the CLI:
   ```bash
   npm install -g @abhi21121211/cli@latest
   ```

3. Check your PATH environment variable to ensure npm global bin directory is included

## Support

For support and issues, please visit the package repository.
