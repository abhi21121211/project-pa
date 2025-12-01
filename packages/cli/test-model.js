import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.argv[2];
if (!apiKey) {
    console.error('Please provide an API key');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
    console.log(`Testing model: ${modelName}...`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello, are you working?');
        const response = await result.response;
        console.log(`✅ ${modelName} is working! Response: ${response.text().substring(0, 50)}...`);
        return true;
    } catch (error) {
        console.error(`❌ ${modelName} failed:`, error.message);
        return false;
    }
}

async function listModels() {
    console.log('Fetching models via REST API...');
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch models: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error('Response:', text);
            return;
        }

        const data = await response.json();
        if (data.models) {
            console.log('Available models:');
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${m.name}`);
                }
            });

            // Try to test the first available one that looks like gemini
            const geminiModel = data.models.find(m => m.name.includes('gemini') && m.supportedGenerationMethods.includes('generateContent'));
            if (geminiModel) {
                const modelName = geminiModel.name.replace('models/', '');
                console.log(`\nTesting discovered model: ${modelName}`);
                await testModel(modelName);
            }
        } else {
            console.log('No models found in response');
        }
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}

async function run() {
    await testModel('gemini-2.0-flash');
}

run();
