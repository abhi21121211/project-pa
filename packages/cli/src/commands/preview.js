import http from 'http';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

export function previewCommand(options) {
    const port = options.port || 3000;
    const root = process.cwd();

    const server = http.createServer((req, res) => {
        console.log(`${req.method} ${req.url}`);

        // Handle root
        let filePath = path.join(root, req.url === '/' ? 'index.html' : req.url);

        // Prevent directory traversal
        if (!filePath.startsWith(root)) {
            res.statusCode = 403;
            res.end('Forbidden');
            return;
        }

        const ext = path.extname(filePath);
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.statusCode = 404;
                    res.end('Not Found');
                } else {
                    res.statusCode = 500;
                    res.end('Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });

    server.listen(port, () => {
        console.log(chalk.green(`\n🚀 Project PA Preview Server running at:`));
        console.log(chalk.cyan(`   http://localhost:${port}`));
        console.log(chalk.gray(`\nPress Ctrl+C to stop`));
    });
}
