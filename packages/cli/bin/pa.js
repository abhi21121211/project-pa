#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from '../src/commands/init.js';
import { generateCommand } from '../src/commands/generate.js';
import { previewCommand } from '../src/commands/preview.js';
import { deployCommand } from '../src/commands/deploy.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const program = new Command();

program
    .name('pa')
    .description('Project PA - AI Project Personal Assistant CLI')
    .version(pkg.version);

program
    .command('init')
    .description('Initialize Project PA in the current directory')
    .action(initCommand);

program
    .command('generate')
    .description('Generate presentation from project code')
    .option('--api-key <key>', 'Google Gemini API Key')
    .action((options) => generateCommand(options));

program
    .command('preview')
    .description('Preview project with local server')
    .option('-p, --port <number>', 'Port to run server on', '3000')
    .action((options) => previewCommand(options));

program
    .command('deploy')
    .description('Deploy presentation to cloud')
    .action(deployCommand);

program.parse();
