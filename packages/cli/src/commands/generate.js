import fs from 'fs/promises';
import path from 'path';
import ora from 'ora';
import inquirer from 'inquirer';
import { GeminiClient } from '../generators/gemini-client.js';
import { OpenRouterClient } from '../generators/openrouter-client.js';
import { analyzeProject } from '../analyzers/project-analyzer.js';

export async function generateCommand(options) {
    let spinner;

    try {
        let provider = 'gemini';
        let model = 'gemini-2.0-flash-exp';
        let apiKey = null;

        console.log('\n🚀 Project PA - Presentation Generator\n');

        // Read API key from flag if provided
        const apiKeyFromFlag =
            typeof options.apiKey === 'string' && options.apiKey.trim().length > 0
                ? options.apiKey.trim()
                : null;

        if (apiKeyFromFlag) {
            apiKey = apiKeyFromFlag;
        }

        // 1. Select Provider
        const providerAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'provider',
                message: 'Select your LLM Provider (Gemini / OpenRouter):',
                choices: ['Gemini', 'OpenRouter'],
                default: 'Gemini'
            }
        ]);
        provider = providerAnswer.provider.toLowerCase();

        // 2. Enter API Key
        if (!apiKey) {
            if (provider === 'gemini') {
                apiKey = process.env.GEMINI_API_KEY || null;
            } else {
                apiKey = process.env.OPENROUTER_API_KEY || null;
            }

            if (!apiKey) {
                const keyHint = provider === 'gemini' 
                    ? 'Get your key at: https://aistudio.google.com/apikey'
                    : 'Get your key at: https://openrouter.ai/keys';
                
                console.log(keyHint);
                
                const keyAnswer = await inquirer.prompt([
                    {
                        type: 'password',
                        name: 'key',
                        message: 'Enter your API Key:',
                        mask: '*',
                        validate: input => {
                            if (!input || input.length === 0) return 'API Key is required';
                            if (input.length < 10) return 'API Key seems too short';
                            return true;
                        }
                    }
                ]);
                apiKey = keyAnswer.key;
            } else {
                console.log('Using API key from environment variable');
            }
        }

        // 3. Select Model Type (Free/Paid) - Only for OpenRouter
        let modelType = 'free';
        if (provider === 'openrouter') {
            const typeAnswer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'type',
                    message: 'Select model tier (Free / Paid):',
                    choices: ['Free', 'Paid'],
                    default: 'Free'
                }
            ]);
            modelType = typeAnswer.type.toLowerCase();
        }

        // 4. Select Model
        let modelChoices = [];
        let modelMessage = '';
        
        if (provider === 'gemini') {
            modelChoices = ['Gemini 2.0 Flash', 'Gemini 1.5 Pro'];
            modelMessage = 'Select model (Gemini 2.0 Flash / Gemini 1.5 Pro):';
        } else {
            // OpenRouter models - Updated December 2025
            if (modelType === 'free') {
                modelChoices = ['Grok 4.1 Fast', 'Qwen3 Coder', 'DeepSeek R1T', 'GLM 4.5 Air'];
                modelMessage = 'Select model (Grok 4.1 Fast / Qwen3 Coder / DeepSeek R1T / GLM 4.5 Air):';
            } else {
                modelChoices = ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini Pro 1.5'];
                modelMessage = 'Select model (Claude 3.5 Sonnet / GPT-4o / Gemini Pro 1.5):';
            }
        }

        const modelAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'model',
                message: modelMessage,
                choices: modelChoices
            }
        ]);
        
        // Map selected model name to actual model ID
        const modelMap = {
            // Gemini Direct
            'Gemini 2.0 Flash': 'gemini-2.0-flash-exp',
            'Gemini 1.5 Pro': 'gemini-1.5-pro',
            // OpenRouter Free
            'Grok 4.1 Fast': 'x-ai/grok-4.1-fast:free',
            'Qwen3 Coder': 'qwen/qwen3-coder:free',
            'DeepSeek R1T': 'tngtech/deepseek-r1t-chimera:free',
            'GLM 4.5 Air': 'z-ai/glm-4.5-air:free',
            // OpenRouter Paid
            'Claude 3.5 Sonnet': 'anthropic/claude-3.5-sonnet',
            'GPT-4o': 'openai/gpt-4o',
            'Gemini Pro 1.5': 'google/gemini-pro-1.5'
        };
        
        model = modelMap[modelAnswer.model] || modelAnswer.model;

        // Start Generation
        spinner = ora('Scanning project files...').start();

        // Analyze Project
        const projectData = await analyzeProject(process.cwd());
        spinner.succeed('Project analyzed');

        // Generate Presentation
        spinner = ora('Generating presentation with ' + modelAnswer.model + '...').start();

        let client;
        if (provider === 'openrouter') {
            client = new OpenRouterClient(apiKey, model);
        } else if (provider === 'gemini') {
            client = new GeminiClient(apiKey, model);
        } else {
            throw new Error("Invalid provider selected: " + provider + ". Please select 'gemini' or 'openrouter'.");
        }

        console.log('Project Data:', projectData);

        const presentation = await client.generatePresentation(projectData);
        spinner.succeed('Presentation generated');

        // Save to file
        const outputPath = path.join(process.cwd(), 'presentation.json');
        await fs.writeFile(outputPath, JSON.stringify(presentation, null, 2));

        console.log('\nSaved to: ' + outputPath);

    } catch (error) {
        if (spinner) spinner.fail('Failed');
        console.error('Error: ' + error.message);
        process.exit(1);
    }
}
