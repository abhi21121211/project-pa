import fs from 'fs/promises';
import path from 'path';
import { parse } from 'node-html-parser';

// Maximum total content size (~30K tokens = ~120K chars)
const MAX_TOTAL_CHARS = 100000;
const MAX_FILE_CHARS = 3000;
const MAX_FILES = 30;

async function scanDirectory(dir, fileList = [], depth = 0) {
    // Limit directory depth to avoid huge projects
    if (depth > 5 || fileList.length >= MAX_FILES * 2) return fileList;

    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
        const res = path.resolve(dir, file.name);
        if (file.isDirectory()) {
            // Skip common non-essential directories
            const skipDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '__pycache__', 'vendor', '.cache'];
            if (!skipDirs.includes(file.name)) {
                await scanDirectory(res, fileList, depth + 1);
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
        readmeContent: '',
        techStack: []
    };

    let totalChars = 0;
    let filesProcessed = 0;

    try {
        // Read README (limit to 5000 chars)
        try {
            const readme = await fs.readFile(path.join(dir, 'README.md'), 'utf8');
            projectData.readmeContent = readme.substring(0, 5000);
            totalChars += projectData.readmeContent.length;
        } catch (e) {
            // No README
        }

        // Detect tech stack from package.json
        try {
            const pkg = JSON.parse(await fs.readFile(path.join(dir, 'package.json'), 'utf8'));
            const deps = { ...pkg.dependencies, ...pkg.devDependencies };
            if (deps.react) projectData.techStack.push('React');
            if (deps.vue) projectData.techStack.push('Vue');
            if (deps.next) projectData.techStack.push('Next.js');
            if (deps.express) projectData.techStack.push('Express');
            if (deps.tailwindcss) projectData.techStack.push('Tailwind');
        } catch (e) {
            // No package.json
        }

        // Scan files
        const allFiles = await scanDirectory(dir);

        // Prioritize important file types
        const priorityExtensions = ['.html', '.jsx', '.tsx', '.vue', '.svelte'];
        const sortedFiles = allFiles.sort((a, b) => {
            const aExt = path.extname(a);
            const bExt = path.extname(b);
            const aPriority = priorityExtensions.includes(aExt) ? 0 : 1;
            const bPriority = priorityExtensions.includes(bExt) ? 0 : 1;
            return aPriority - bPriority;
        });

        for (const filePath of sortedFiles) {
            // Stop if we hit limits
            if (totalChars >= MAX_TOTAL_CHARS || filesProcessed >= MAX_FILES) break;

            const ext = path.extname(filePath);
            const relativePath = path.relative(dir, filePath);

            // HTML Files
            if (ext === '.html') {
                const content = await fs.readFile(filePath, 'utf8');
                const root = parse(content);
                const title = root.querySelector('title')?.text || relativePath;

                // Extract key elements only
                const ids = root.querySelectorAll('[id]').map(el => `#${el.getAttribute('id')}`).slice(0, 20);
                const classes = root.querySelectorAll('[class]').map(el => `.${el.getAttribute('class').split(' ')[0]}`).slice(0, 20);

                const excerpt = `\n--- ${relativePath} ---\nTitle: ${title}\nIDs: ${ids.join(', ')}\nClasses: ${classes.join(', ')}\n`;

                projectData.htmlStructure += excerpt;
                projectData.routes.push(relativePath);
                totalChars += excerpt.length;
                filesProcessed++;
            }

            // React/Vue/Svelte Components
            else if (priorityExtensions.slice(1).includes(ext)) {
                const content = await fs.readFile(filePath, 'utf8');
                const excerpt = content.substring(0, MAX_FILE_CHARS);

                projectData.components.push(relativePath);
                projectData.htmlStructure += `\n--- ${relativePath} ---\n${excerpt}\n`;
                totalChars += excerpt.length + 50;
                filesProcessed++;
            }
        }

        // Add summary
        projectData.htmlStructure = `[Analyzed ${filesProcessed} files, ${Math.round(totalChars / 1000)}K chars]\n` + projectData.htmlStructure;

    } catch (err) {
        console.error('Error analyzing project:', err.message);
    }

    return projectData;
}
