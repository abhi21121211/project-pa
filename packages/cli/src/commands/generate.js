import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { GeminiClient } from '../generators/gemini-client.js';
import { OpenRouterClient } from '../generators/openrouter-client.js';
import { analyzeProject } from '../analyzers/project-analyzer.js';

// Enhanced styling for better UX
const styles = {
    title: chalk.bold.cyan,
    subtitle: chalk.gray,
    success: chalk.bold.green,
    error: chalk.bold.red,
    warning: chalk.yellow,
    info: chalk.blue,
    highlight: chalk.magenta,
    dim: chalk.dim
};

// Print welcome banner
function printBanner() {
    console.log('\n' + chalk.bold.cyan('═'.repeat(60)));
    console.log(chalk.bold.cyan('   🚀 Project PA - Presentation Generator'));
    console.log(chalk.bold.cyan('═'.repeat(60)) + '\n');
}

// Print step header
function printStep(stepNum, title) {
    console.log(chalk.cyan(`┌─ Step ${stepNum}: ${title}`));
    console.log(chalk.cyan('└─' + '─'.repeat(50)) + '\n');
}

// Print selection summary
function printSummary(selections) {
    console.log('\n' + chalk.yellow('═'.repeat(60)));
    console.log(chalk.bold.yellow('   📋 Configuration Summary'));
    console.log(chalk.yellow('═'.repeat(60)));

    Object.entries(selections).forEach(([key, value]) => {
        console.log(chalk.gray(`   ${key.padEnd(20)}: `) + chalk.white(value));
    });

    console.log(chalk.yellow('═'.repeat(60)) + '\n');
}

export async function generateCommand(options) {
    let spinner;

    try {
        printBanner();

        let provider = 'gemini';
        let model = 'gemini-2.0-flash-exp';
        let apiKey = null;
        const selections = {};

        // Check if API key was provided via command line flag
        const hasApiKeyFlag = Boolean(options.apiKey);

        // STEP 1: Select Provider (skip if API key provided via flag)
        if (!hasApiKeyFlag) {
            printStep(1, 'Select Your LLM Provider');

            const providerAnswer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'provider',
                    message: 'Choose your AI provider:',
                    choices: [
                        {
                            name: '🔷 Google Gemini ' + chalk.gray('(Free tier: 1,500 requests/day)'),
                            value: 'gemini',
                            short: 'Gemini'
                        },
                        {
                            name: '🌐 OpenRouter ' + chalk.gray('(Access to multiple models)'),
                            value: 'openrouter',
                            short: 'OpenRouter'
                        }
                    ],
                    default: 'gemini'
                }
            ]);

            provider = providerAnswer.provider;
            selections['Provider'] = provider === 'gemini' ? 'Google Gemini' : 'OpenRouter';

            console.log(chalk.green(`   ✓ Selected: ${selections['Provider']}\n`));

            // STEP 2: Get API Key
            if (provider === 'gemini') {
                // Try environment variable first
                apiKey = process.env.GEMINI_API_KEY;

                if (!apiKey) {
                    printStep(2, 'Enter Gemini API Key');
                    console.log(chalk.gray('   Get your free key: ') + chalk.cyan('https://aistudio.google.com/apikey\n'));

                    const keyAnswer = await inquirer.prompt([{
                        type: 'password',
                        name: 'key',
                        message: 'Gemini API Key:',
                        mask: '*',
                        validate: input => {
                            if (!input || input.length === 0) return chalk.red('✖ API Key is required!');
                            if (!input.startsWith('AIza')) return chalk.yellow('⚠ Warning: Gemini keys usually start with "AIza"');
                            return true;
                        }
                    }]);

                    apiKey = keyAnswer.key;
                    console.log(chalk.green('   ✓ API Key configured\n'));
                } else {
                    console.log(chalk.green('   ✓ Using GEMINI_API_KEY from environment\n'));
                }

                selections['API Key'] = '••••••••' + apiKey.slice(-4);

            } else if (provider === 'openrouter') {
                // Try environment variable first
                apiKey = process.env.OPENROUTER_API_KEY;

                if (!apiKey) {
                    printStep(2, 'Enter OpenRouter API Key');
                    console.log(chalk.gray('   Get your key: ') + chalk.cyan('https://openrouter.ai/keys\n'));

                    const keyAnswer = await inquirer.prompt([{
                        type: 'password',
                        name: 'key',
                        message: 'OpenRouter API Key:',
                        mask: '*',
                        validate: input => {
                            if (!input || input.length === 0) return chalk.red('✖ API Key is required!');
                            return true;
                        }
                    }]);

                    apiKey = keyAnswer.key;
                    console.log(chalk.green('   ✓ API Key configured\n'));
                } else {
                    console.log(chalk.green('   ✓ Using OPENROUTER_API_KEY from environment\n'));
                }

                selections['API Key'] = '••••••••' + apiKey.slice(-4);

                // STEP 3: Select Model Type
                printStep(3, 'Select Model Type');

                const typeAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'type',
                        message: 'Choose model pricing tier:',
                        choices: [
                            {
                                name: '💚 Free Models ' + chalk.gray('(Community-funded, no cost)'),
                                value: 'free',
                                short: 'Free'
                            },
                            {
                                name: '💰 Paid Models ' + chalk.gray('(Premium performance, pay-per-use)'),
                                value: 'paid',
                                short: 'Paid'
                            },
                            {
                                name: '🔧 Custom Model ' + chalk.gray('(Enter specific model ID)'),
                                value: 'custom',
                                short: 'Custom'
                            }
                        ],
                        default: 'free'
                    }
                ]);

                const tierName = typeAnswer.type === 'free' ? 'Free Models' : typeAnswer.type === 'paid' ? 'Paid Models' : 'Custom Model';
                console.log(chalk.green(`   ✓ Selected: ${tierName}\n`));

                // STEP 4: Select Specific Model
                printStep(4, 'Select AI Model');

                if (typeAnswer.type === 'free') {
                    const modelAnswer = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'model',
                            message: 'Choose your AI model:',
                            choices: [
                                {
                                    name: '🔷 Gemini 2.0 Flash ' + chalk.gray('(Google • Fast & Efficient)'),
                                    value: 'google/gemini-2.0-flash-exp:free',
                                    short: 'Gemini 2.0 Flash'
                                },
                                {
                                    name: '🦙 Llama 3.2 11B Vision ' + chalk.gray('(Meta • Multimodal)'),
                                    value: 'meta-llama/llama-3.2-11b-vision-instruct:free',
                                    short: 'Llama 3.2'
                                },
                                {
                                    name: 'φ Phi-3 Medium ' + chalk.gray('(Microsoft • 128K context)'),
                                    value: 'microsoft/phi-3-medium-128k-instruct:free',
                                    short: 'Phi-3'
                                },
                                {
                                    name: '🔥 Qwen 2.5 7B ' + chalk.gray('(Alibaba • Multilingual)'),
                                    value: 'qwen/qwen-2-7b-instruct:free',
                                    short: 'Qwen 2'
                                },
                                {
                                    name: '⚡ Mistral 7B ' + chalk.gray('(Mistral AI • Balanced)'),
                                    value: 'mistralai/mistral-7b-instruct:free',
                                    short: 'Mistral 7B'
                                }
                            ],
                            default: 'google/gemini-2.0-flash-exp:free',
                            pageSize: 10
                        }
                    ]);

                    model = modelAnswer.model;
                    selections['Model'] = modelAnswer.model.split('/')[1].split(':')[0];
                    selections['Pricing'] = 'Free';

                } else if (typeAnswer.type === 'paid') {
                    const modelAnswer = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'model',
                            message: 'Choose your AI model:',
                            choices: [
                                {
                                    name: '🧠 Claude 3.5 Sonnet ' + chalk.gray('(Anthropic • $3/$15 per 1M)'),
                                    value: 'anthropic/claude-3.5-sonnet',
                                    short: 'Claude 3.5 Sonnet'
                                },
                                {
                                    name: '🤖 GPT-4o ' + chalk.gray('(OpenAI • $2.50/$10 per 1M)'),
                                    value: 'openai/gpt-4o',
                                    short: 'GPT-4o'
                                },
                                {
                                    name: '💎 Gemini 1.5 Pro ' + chalk.gray('(Google • $1.25/$5 per 1M)'),
                                    value: 'google/gemini-pro-1.5',
                                    short: 'Gemini Pro 1.5'
                                }
                            ],
                            default: 'anthropic/claude-3.5-sonnet'
                        }
                    ]);

                    model = modelAnswer.model;
                    selections['Model'] = modelAnswer.model.split('/')[1];
                    selections['Pricing'] = 'Paid';

                } else {
                    console.log(chalk.gray('   Enter the full model ID from OpenRouter docs\n'));

                    const customModel = await inquirer.prompt([{
                        type: 'input',
                        name: 'id',
                        message: 'Model ID (e.g., provider/model-name):',
                        validate: input => {
                            if (!input || input.length === 0) return chalk.red('✖ Model ID is required!');
                            if (!input.includes('/')) return chalk.yellow('⚠ Format should be: provider/model-name');
                            return true;
                        }
                    }]);

                    model = customModel.id;
                    selections['Model'] = customModel.id;
                    selections['Pricing'] = 'Custom';
                }

                console.log(chalk.green(`   ✓ Selected: ${selections['Model']}\n`));
            }
        } else {
            // API key provided via flag - use Gemini as default
            apiKey = options.apiKey;
            provider = 'gemini';
            selections['Provider'] = 'Gemini (via --api-key flag)';
            selections['API Key'] = '••••••••' + apiKey.slice(-4);
            console.log(chalk.green('   ✓ Using API key from command line flag\n'));
        }

        // Validate that we have an API key
        if (!apiKey) {
            throw new Error('No API key provided. Use --api-key flag or set environment variable.');
        }

        // Print configuration summary
        printSummary(selections);

        // Confirm before proceeding
        const { confirm } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Proceed with generation?',
                default: true
            }
        ]);

        if (!confirm) {
            console.log(chalk.yellow('\n⚠ Generation cancelled by user\n'));
            process.exit(0);
        }

        // Start generation with spinner
        console.log('\n' + chalk.cyan('═'.repeat(60)));
        console.log(chalk.bold.cyan('   ⚙️  Starting Generation Process'));
        console.log(chalk.cyan('═'.repeat(60)) + '\n');

        spinner = ora({
            text: 'Scanning project files...',
            spinner: 'dots',
            color: 'cyan'
        }).start();

        // 2. Analyze Project
        const projectData = await analyzeProject(process.cwd());

        spinner.succeed(chalk.green('Project analyzed successfully'));
        spinner.start('Extracting code structure...');

        // Small delay for visual feedback
        await new Promise(resolve => setTimeout(resolve, 500));

        const routeCount = projectData.routes?.length || 0;
        const componentCount = projectData.components?.length || 0;

        spinner.succeed(chalk.green(`Found ${routeCount} routes and ${componentCount} components`));

        // 3. Generate Presentation
        let client;
        let modelDisplayName;

        if (provider === 'openrouter') {
            modelDisplayName = selections['Model'] || model;
            spinner = ora({
                text: `Generating presentation with ${modelDisplayName}...`,
                spinner: 'dots',
                color: 'cyan'
            }).start();
            client = new OpenRouterClient(apiKey, model);
        } else {
            modelDisplayName = 'Gemini 2.0 Flash';
            spinner = ora({
                text: `Generating presentation with ${modelDisplayName}...`,
                spinner: 'dots',
                color: 'cyan'
            }).start();
            client = new GeminiClient(apiKey);
        }

        const presentation = await client.generatePresentation(projectData);

        const stepCount = presentation.steps?.length || 0;
        spinner.succeed(chalk.green(`Generated ${stepCount} presentation steps`));

        // 4. Save to file
        spinner = ora('Saving presentation.json...').start();

        const outputPath = path.join(process.cwd(), 'presentation.json');

        // Check if exists and warn
        try {
            await fs.access(outputPath);
            spinner.info(chalk.yellow('Overwriting existing presentation.json'));
            spinner = ora('Writing file...').start();
        } catch {
            // File doesn't exist - no warning needed
        }

        await fs.writeFile(outputPath, JSON.stringify(presentation, null, 2));

        spinner.succeed(chalk.bold.green('Presentation generated successfully! 🎉'));

        // Final success message
        console.log('\n' + chalk.green('═'.repeat(60)));
        console.log(chalk.bold.green('   ✅ Generation Complete!'));
        console.log(chalk.green('═'.repeat(60)));
        console.log(chalk.gray('\n   File: ') + chalk.cyan(outputPath));
        console.log(chalk.gray('   Steps: ') + chalk.white(stepCount));
        console.log(chalk.gray('   Project: ') + chalk.white(presentation.meta?.project || 'Unknown'));
        console.log(chalk.green('\n═'.repeat(60)));
        console.log(chalk.blue('\n   Next steps:'));
        console.log(chalk.gray('   1. Review: ') + chalk.white('cat presentation.json'));
        console.log(chalk.gray('   2. Preview: ') + chalk.white('pa preview'));
        console.log(chalk.gray('   3. Deploy: ') + chalk.white('pa deploy'));
        console.log(chalk.green('\n═'.repeat(60)) + '\n');

    } catch (error) {
        if (spinner) {
            spinner.fail();
        }

        console.log('\n' + chalk.red('═'.repeat(60)));
        console.log(chalk.bold.red('   ❌ Generation Failed'));
        console.log(chalk.red('═'.repeat(60)));
        console.log(chalk.gray('\n   Error: ') + chalk.red(error.message));

        if (error.message.includes('RATE_LIMIT') || error.message.includes('rate_limit')) {
            console.log(chalk.yellow('\n   💡 Tip: You may have exceeded your API rate limit.'));
            console.log(chalk.gray('      Wait 24 hours or try a different API key.\n'));
        } else if (error.message.includes('API') && error.message.includes('KEY')) {
            console.log(chalk.yellow('\n   💡 Tip: Check that your API key is valid.'));
            console.log(chalk.gray('      Get a new key from the provider\'s website.'));
            console.log(chalk.gray('      Gemini: https://aistudio.google.com/apikey'));
            console.log(chalk.gray('      OpenRouter: https://openrouter.ai/keys\n'));
        } else if (error.message.includes('JSON')) {
            console.log(chalk.yellow('\n   💡 Tip: The AI returned invalid JSON.'));
            console.log(chalk.gray('      Try running the command again.\n'));
        }

        console.log(chalk.red('═'.repeat(60)) + '\n');
        process.exit(1);
    }
}