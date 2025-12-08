import fs from 'fs';
import path from 'path';
import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

const BACKEND_URL = 'https://project-pa.onrender.com'; // Production Backend
const CONFIG_FILE = '.pa-config.json';

export async function deployCommand() {
    const spinner = ora('Deploying presentation...').start();

    try {
        const presentationPath = path.join(process.cwd(), 'presentation.json');
        const configPath = path.join(process.cwd(), CONFIG_FILE);

        if (!fs.existsSync(presentationPath)) {
            spinner.fail('presentation.json not found in current directory.');
            return;
        }

        const presentationData = JSON.parse(fs.readFileSync(presentationPath, 'utf-8'));

        // Load or create project config
        let config = {};
        if (fs.existsSync(configPath)) {
            config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        }

        // Get or generate project ID (persistent per project folder)
        let projectId = config.projectId;

        if (!projectId) {
            const projectName = presentationData.meta?.project?.toLowerCase().replace(/\s+/g, '-') || 'project';
            const randomSuffix = Math.random().toString(36).substring(2, 8);
            projectId = `${projectName}-${randomSuffix}`;

            // Save to local config file
            config.projectId = projectId;
            config.createdAt = new Date().toISOString();
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

            console.log(chalk.blue(`\nℹ️  Created new Project ID: ${projectId}`));
            console.log(chalk.gray(`   Saved to ${CONFIG_FILE} (add to .gitignore)`));
        } else {
            console.log(chalk.blue(`\nℹ️  Using existing Project ID: ${projectId}`));
        }

        // Also store in presentation.json for reference
        presentationData.meta.uniqueId = projectId;
        fs.writeFileSync(presentationPath, JSON.stringify(presentationData, null, 2));

        // Upload to backend
        spinner.text = 'Uploading to server...';
        const response = await axios.post(`${BACKEND_URL}/api/presentations`, {
            projectId,
            data: presentationData
        });

        if (response.data.success) {
            spinner.succeed(chalk.green('Presentation deployed successfully! 🚀'));

            console.log(chalk.cyan(`\n📦 Project ID: ${projectId}`));

            if (response.data.historyCount > 0) {
                console.log(chalk.gray(`   History: ${response.data.historyCount} previous version(s) saved`));
            }

            console.log(chalk.white('\n📝 To use this presentation, add this script to your website:'));
            console.log(chalk.yellow(`\n<script type="module" src="https://unpkg.com/@abhi21121211/project-pa-runtime@latest/dist/project-pa.min.js" data-project-id="${projectId}"></script>`));

            console.log(chalk.gray('\n💡 Tip: Run `pa deploy` again to update - your Project ID stays the same!'));
        } else {
            spinner.fail('Deployment failed.');
        }

    } catch (error) {
        spinner.fail('Error deploying presentation.');
        if (error.code === 'ECONNREFUSED') {
            console.error(chalk.red('Could not connect to backend server. Is it running?'));
        } else {
            console.error(chalk.red(error.message));
        }
    }
}
