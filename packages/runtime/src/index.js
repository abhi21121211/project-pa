import styles from './styles.css';
import { createWidget } from './widget.js';
import { StepRunner } from './step-runner.js';

// Inject Styles
const styleTag = document.createElement('style');
styleTag.textContent = styles;
document.head.appendChild(styleTag);

// Initialize
const runner = new StepRunner();

// Auto-start if resuming
if (runner.hasSavedState()) {
    runner.start();
}

// Add widget
createWidget(() => {
    runner.start();
});

console.log('Project PA Runtime Ready');
