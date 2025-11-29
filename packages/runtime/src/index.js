import styles from './styles.css';
import { createWidget } from './widget.js';
import { StepRunner } from './step-runner.js';

// Inject Styles
const styleTag = document.createElement('style');
styleTag.textContent = styles;
document.head.appendChild(styleTag);

// Check for project ID in script tag
const scriptTag = document.querySelector('script[data-project-id]');
const projectId = scriptTag ? scriptTag.getAttribute('data-project-id') : null;

let presentationUrl = 'presentation.json';
if (projectId) {
    presentationUrl = `https://project-pa.onrender.com/api/presentations/${projectId}`;
}

// Fetch presentation data
fetch(presentationUrl)
    .then(response => {
        if (!response.ok) throw new Error('Failed to load presentation');
        return response.json();
    })
    .then(data => {
        console.log('Project PA: Presentation loaded', data);

        // Initialize StepRunner
        const stepRunner = new StepRunner(data);

        // Create Widget
        createWidget(() => {
            stepRunner.start();
        });

        // Check for saved state (auto-resume)
        if (stepRunner.hasSavedState()) {
            console.log('Project PA: Resuming from saved state');
            stepRunner.start();
        }
    })
    .catch(err => console.error('Project PA: Error loading presentation', err));

console.log('Project PA Runtime Ready');
