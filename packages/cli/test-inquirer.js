import inquirer from 'inquirer';

async function run() {
    const modelChoices = [
        { name: 'Gemini 2.0 Flash (Free)', value: 'google/gemini-2.0-flash-exp:free' },
        { name: 'Llama 3.2 (Free)', value: 'meta-llama/llama-3.2-11b-vision-instruct:free' },
        { name: 'Mistral 7B (Free)', value: 'mistralai/mistral-7b-instruct:free' }
    ];

    console.log('Choices:', modelChoices);

    const modelAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'model',
            message: `select your model ${modelChoices.map(c => c.name.split(' ')[0]).join('/')}`,
            choices: modelChoices
        }
    ]);

    console.log('Selected model:', modelAnswer.model);
}

run();
