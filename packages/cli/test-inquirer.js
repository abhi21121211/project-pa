import inquirer from 'inquirer';

// Test if inquirer returns name or value
const choices = [
    { name: 'Llama 3.3', value: 'meta-llama/llama-3.3-70b-instruct:free' },
    { name: 'Mistral 7B', value: 'mistralai/mistral-7b-instruct:free' }
];

async function test() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'model',
            message: 'Select model:',
            choices: choices
        }
    ]);

    console.log('\n=== RESULT ===');
    console.log('answer.model:', answer.model);
    console.log('Type:', typeof answer.model);
    console.log('\nExpected: meta-llama/llama-3.3-70b-instruct:free');
    console.log('Match:', answer.model === 'meta-llama/llama-3.3-70b-instruct:free');
}

test();
