import { Popup } from './popup.js';
import { Highlighter } from './highlighter.js';
import { Narrator } from './narrator.js';

export class StepRunner {
    constructor(configUrl = 'presentation.json') {
        this.configUrl = configUrl;
        this.steps = [];
        this.currentStep = 0;
        this.popup = new Popup();
        this.highlighter = new Highlighter();
        this.narrator = new Narrator();
        this.isActive = false;
        this.STORAGE_KEY = 'project-pa-step';

        // Bind popup events
        this.popup.onNext = () => this.next();
        this.popup.onPrev = () => this.prev();
        this.popup.onClose = () => this.stop();
        this.popup.onMuteToggle = () => this.narrator.toggleMute();
    }

    async start() {
        try {
            const response = await fetch(this.configUrl);
            if (!response.ok) throw new Error('Failed to load presentation');

            const data = await response.json();
            this.steps = data.steps;

            // Check for persisted step
            const savedStep = localStorage.getItem(this.STORAGE_KEY);
            if (savedStep !== null) {
                this.currentStep = parseInt(savedStep, 10);
                // Validate index
                if (this.currentStep >= this.steps.length) {
                    this.currentStep = 0;
                }
            } else {
                this.currentStep = 0;
            }

            if (this.steps.length === 0) {
                console.warn('Project PA: No steps found');
                return;
            }

            this.isActive = true;
            this.currentStep = 0;
            this.showCurrentStep();

        } catch (err) {
            console.error('Project PA Error:', err);
            alert('Could not load presentation.json');
        }
    }

    stop() {
        this.clearAutoAdvance();
        this.isActive = false;
        this.popup.hide();
        this.highlighter.hide();
        this.narrator.stop();
        localStorage.removeItem(this.STORAGE_KEY);
    }

    next() {
        this.clearAutoAdvance();
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            localStorage.setItem(this.STORAGE_KEY, this.currentStep);
            this.showCurrentStep();
        } else {
            this.stop();
        }
    }

    prev() {
        this.clearAutoAdvance();
        if (this.currentStep > 0) {
            this.currentStep--;
            localStorage.setItem(this.STORAGE_KEY, this.currentStep);
            this.showCurrentStep();
        }
    }

    showCurrentStep() {
        const step = this.steps[this.currentStep];
        if (!step) return;

        console.log(`Project PA: Showing Step ${this.currentStep}`, step);

        // Handle Redirect
        if (step.page) {
            const currentUrl = window.location.href;
            const targetPage = step.page;

            console.log(`Project PA: Checking redirect. Current: ${currentUrl}, Target: ${targetPage}`);

            // Check if we are already on the target page
            // We check if the current URL ends with the target page string
            // This handles both "index.html" and "index.html#/route"
            if (!currentUrl.endsWith(targetPage)) {
                console.log(`Project PA: Redirecting to ${targetPage}...`);
                window.location.href = targetPage;
                return; // Stop execution to allow redirect/reload
            } else {
                console.log('Project PA: Already on target page.');
            }
        }

        // Highlight target
        this.highlighter.highlight(step.target);

        // Show popup
        this.popup.show(step.content, this.currentStep, this.steps.length);

        // Speak
        this.narrator.speak(step.content);

        // Execute actions (simple click for now)
        if (step.actions) {
            step.actions.forEach(action => {
                if (action.do === 'click' && action.selector) {
                    const el = document.querySelector(action.selector);
                    if (el) el.click();
                }
            });
        }

        // Auto-advance
        if (this.timer) clearTimeout(this.timer);
        const duration = step.duration || 5000; // Default 5s

        this.timer = setTimeout(() => {
            if (this.isActive && this.currentStep < this.steps.length - 1) {
                this.next();
            } else if (this.isActive && this.currentStep === this.steps.length - 1) {
                this.stop(); // Auto-finish on last step? Or just stop auto-advance? Let's stop.
            }
        }, duration);
    }

    clearAutoAdvance() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    hasSavedState() {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }
}
