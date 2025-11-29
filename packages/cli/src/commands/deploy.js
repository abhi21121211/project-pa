import fs from 'fs';
import path from 'path';
import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

const BACKEND_URL = 'https://project-pa.onrender.com'; // Production Backend

export async function deployCommand() {
    const spinner = ora('Deploying presentation...').start();

    try {
        const presentationPath = path.join(process.cwd(), 'presentation.json');

        if (!fs.existsSync(presentationPath)) {
            spinner.fail('presentation.json not found in current directory.');
            return;
        }

        const presentationData = JSON.parse(fs.readFileSync(presentationPath, 'utf-8'));
        const projectId = presentationData.meta?.project?.toLowerCase().replace(/\s+/g, '-') || 'default-project';

        // Upload to backend
        const response = await axios.post(`${BACKEND_URL}/api/presentations`, {
            projectId,
            data: presentationData
        });

        if (response.data.success) {
            spinner.succeed(chalk.green('Presentation deployed successfully! 🚀'));
            console.log(chalk.cyan(`\nProject ID: ${projectId}`));
            console.log(chalk.white('\nTo use this presentation, add this script to your website:'));
            console.log(chalk.yellow(`\n<script type="module" src="https://unpkg.com/@abhi21121211/runtime@latest/dist/project-pa.min.js" data-project-id="${projectId}"></script>`));
            console.log(chalk.gray('\n(You can remove the local presentation.json file from your public folder now)'));
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
