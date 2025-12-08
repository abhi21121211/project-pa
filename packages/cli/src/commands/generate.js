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
            // Auto-detect provider from API key format
            if (apiKey.startsWith('AIza')) {
                provider = 'gemini';
                console.log('✓ Detected Gemini API key');
            } else if (apiKey.startsWith('sk-or-')) {
                provider = 'openrouter';
                console.log('✓ Detected OpenRouter API key');
            } else {
                // Ask user to confirm provider if format is unknown
                const providerAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'provider',
                        message: 'Could not auto-detect provider. Select your LLM Provider:',
                        choices: ['Gemini', 'OpenRouter'],
                        default: 'Gemini'
                    }
                ]);
                provider = providerAnswer.provider.toLowerCase();
            }
        } else {
            // 1. Select Provider (only when no API key provided)
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
        }

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

        // 4. Select Model - Use simple strings, then map to model IDs
        let modelChoices = [];
        let modelMessage = '';
        let modelMap = {};

        if (provider === 'gemini') {
            modelChoices = ['Gemini 2.0 Flash', 'Gemini 1.5 Flash', 'Gemini 1.5 Pro'];
            modelMessage = 'Select model (Gemini 2.0 Flash / Gemini 1.5 Flash / Gemini 1.5 Pro):';
            modelMap = {
                'Gemini 2.0 Flash': 'gemini-2.0-flash',
                'Gemini 1.5 Flash': 'gemini-1.5-flash',
                'Gemini 1.5 Pro': 'gemini-1.5-pro'
            };
        } else {
            // OpenRouter models - VERIFIED WORKING (tested Dec 2024)
            if (modelType === 'free') {
                modelChoices = ['Llama 3.3', 'Mistral 7B', 'Hermes 3'];
                modelMessage = 'Select model (Llama 3.3 / Mistral 7B / Hermes 3):';
                modelMap = {
                    'Llama 3.3': 'meta-llama/llama-3.3-70b-instruct:free',
                    'Mistral 7B': 'mistralai/mistral-7b-instruct:free',
                    'Hermes 3': 'nousresearch/hermes-3-llama-3.1-405b:free'
                };
            } else {
                modelChoices = ['Claude 3.5', 'GPT-4o', 'Gemini Pro'];
                modelMessage = 'Select model (Claude 3.5 / GPT-4o / Gemini Pro):';
                modelMap = {
                    'Claude 3.5': 'anthropic/claude-3.5-sonnet',
                    'GPT-4o': 'openai/gpt-4o',
                    'Gemini Pro': 'google/gemini-pro-1.5'
                };
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

        // Map the selected display name to actual model ID
        const selectedDisplayName = modelAnswer.model;
        model = modelMap[selectedDisplayName];

        if (!model) {
            throw new Error(`Unknown model selected: ${selectedDisplayName}`);
        }

        // 5. Optional: Protected Routes Authentication
        let authConfig = {
            hasProtectedRoutes: false,
            authToken: null,
            userRole: null
        };

        const protectedRoutesAnswer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'hasProtected',
                message: 'Does your project have protected/authenticated routes?',
                default: false
            }
        ]);

        if (protectedRoutesAnswer.hasProtected) {
            const wantToProvideToken = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'provideToken',
                    message: 'Do you want to provide an auth token to access protected pages?',
                    default: false
                }
            ]);

            if (wantToProvideToken.provideToken) {
                // Get token
                const tokenAnswer = await inquirer.prompt([
                    {
                        type: 'password',
                        name: 'token',
                        message: 'Enter your auth token (JWT/Bearer token):',
                        mask: '*'
                    }
                ]);

                authConfig.hasProtectedRoutes = true;
                authConfig.authToken = tokenAnswer.token;

                // Ask about roles (optional)
                const hasRolesAnswer = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'hasRoles',
                        message: 'Does your project have multiple user roles (admin/user/etc)?',
                        default: false
                    }
                ]);

                if (hasRolesAnswer.hasRoles) {
                    const roleAnswer = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'role',
                            message: 'Enter the role to present (e.g., admin, user, manager):',
                            default: 'user'
                        }
                    ]);
                    authConfig.userRole = roleAnswer.role;
                    console.log(`✓ Auth configured for role: ${authConfig.userRole}`);
                } else {
                    console.log('✓ Auth token configured');
                }
            } else {
                authConfig.hasProtectedRoutes = true;
                console.log('ℹ Protected routes will be mentioned but not shown in detail.');
            }
        }

        // Start Generation
        spinner = ora('Scanning project files...').start();

        // Analyze Project
        const projectData = await analyzeProject(process.cwd());

        // Add auth config to project data
        projectData.authConfig = authConfig;

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
