# Project PA (Project Presenter Agent)

**Project PA** is an AI-powered tool that automatically generates and presents interactive walkthroughs for your web projects. It consists of a CLI to analyze your code and generate a script, and a lightweight runtime widget to present it.

## Packages

- **[@project-pa/runtime](./packages/runtime)**: The client-side widget that runs the guided tour.
- **[@project-pa/cli](./packages/cli)**: The command-line tool to initialize and generate presentations using Google Gemini.

## Getting Started

1.  **Install the CLI**:
    ```bash
    npm install -g @project-pa/cli
    ```

2.  **Initialize your project**:
    ```bash
    cd my-web-project
    pa init
    ```

3.  **Generate a presentation**:
    ```bash
    pa generate --api-key YOUR_GEMINI_KEY
    ```

4.  **Preview**:
    ```bash
    pa preview
    ```

## Examples

Check out the `examples/` directory for sample projects:
- `react-ecommerce`: A full React-based e-commerce demo.
- `abhi-ai-portfolio`: An integration with a portfolio site.

## License

MIT
