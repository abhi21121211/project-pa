import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

export async function initCommand() {
    const targetFile = path.join(process.cwd(), 'presentation.json');

    try {
        await fs.access(targetFile);
        console.log(chalk.yellow('presentation.json already exists. Use --force to overwrite.'));
        return;
    } catch {
        // File doesn't exist, proceed
    }

    const template = {
        meta: {
            project: "My Project",
            author: "Me",
            entryUrl: "/"
        },
        steps: [
            {
                id: "intro",
                type: "popup",
                target: "body",
                content: "Welcome to my project!",
                duration: 5000
            }
        ]
    };

    await fs.writeFile(targetFile, JSON.stringify(template, null, 2));
    console.log(chalk.green('✅ Created presentation.json'));
}
