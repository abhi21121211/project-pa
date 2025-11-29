import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { analyzeProject } from '../analyzers/project-analyzer.js';
import { GeminiClient } from '../generators/gemini-client.js';

export async function generateCommand(options) {
    const apiKey = process.env.GEMINI_API_KEY || options.apiKey;

    if (!apiKey) {
        console.error(chalk.red('Error: GEMINI_API_KEY is required. Set it in env or pass --api-key.'));
        return;
    }

    const spinner = ora('Analyzing project...').start();

    try {
        // 1. Analyze
        const projectData = await analyzeProject(process.cwd());
        spinner.text = 'Generating presentation with Gemini...';

        // 2. Generate
        const client = new GeminiClient(apiKey);
        const presentation = await client.generatePresentation(projectData);

        // 3. Save
        await fs.writeFile(
            path.join(process.cwd(), 'presentation.json'),
            JSON.stringify(presentation, null, 2)
        );

        spinner.succeed(chalk.green('✅ Generated presentation.json'));

    } catch (err) {
        spinner.fail(chalk.red('Generation failed'));
        console.error(err);
    }
}
