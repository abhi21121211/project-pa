import fs from 'fs/promises';
import path from 'path';
import { parse } from 'node-html-parser';

async function scanDirectory(dir, fileList = []) {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
        const res = path.resolve(dir, file.name);
        if (file.isDirectory()) {
            if (file.name !== 'node_modules' && file.name !== '.git' && file.name !== 'dist') {
                await scanDirectory(res, fileList);
            }
        } else {
            fileList.push(res);
        }
    }
    return fileList;
}

export async function analyzeProject(dir) {
    const projectData = {
        name: path.basename(path.resolve(dir)),
        htmlStructure: '',
        routes: [],
        components: [],
        readmeContent: ''
    };

    try {
        // Read README
        try {
            projectData.readmeContent = await fs.readFile(path.join(dir, 'README.md'), 'utf8');
        } catch (e) {
            console.log('No README.md found');
        }

        // Scan all files
        const allFiles = await scanDirectory(dir);

        for (const filePath of allFiles) {
            const ext = path.extname(filePath);
            const relativePath = path.relative(dir, filePath);

            // HTML Files
            if (ext === '.html') {
                const content = await fs.readFile(filePath, 'utf8');
                const root = parse(content);
                const title = root.querySelector('title')?.text || relativePath;
                const nav = root.querySelector('nav')?.outerHTML || '';
                const main = root.querySelector('main')?.outerHTML || '';

                projectData.htmlStructure += `\n-- - File: ${relativePath} ---\nTitle: ${title} \n${nav} \n${main.substring(0, 500)}...\n`;
                projectData.routes.push(relativePath);
            }

            // React/Vue/Svelte Components
            else if (['.jsx', '.tsx', '.vue', '.svelte'].includes(ext)) {
                projectData.components.push(relativePath);

                // Simple content extraction (first 500 chars)
                const content = await fs.readFile(filePath, 'utf8');
                projectData.htmlStructure += `\n-- - Component: ${relativePath} ---\n${content.substring(0, 500)}...\n`;
            }
        }
    } catch (err) {
        console.error('Error analyzing project:', err);
    }

    return projectData;
}
