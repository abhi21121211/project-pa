import { Popup } from './popup.js';
import { Highlighter } from './highlighter.js';
import { Narrator } from './narrator.js';

export class StepRunner {
    constructor(configOrData = 'presentation.json') {
        if (typeof configOrData === 'string') {
            this.configUrl = configOrData;
            this.data = null;
        } else {
            this.configUrl = null;
            this.data = configOrData;
        }

        this.steps = [];
        this.currentStep = 0;
        this.mode = 'full'; // Store current mode
        this.popup = new Popup();
        this.highlighter = new Highlighter();
        this.narrator = new Narrator();
        this.isActive = false;
        this.STORAGE_KEY = 'project-pa-step';
        this.MODE_KEY = 'project-pa-mode';

        // Bind popup events
        this.popup.onNext = () => this.next();
        this.popup.onPrev = () => this.prev();
        this.popup.onClose = () => this.stop();
        this.popup.onMuteToggle = () => this.narrator.toggleMute();
    }

    async start(mode = 'full') {
        try {
            let allSteps = [];
            let entryUrl = '/';
            
            if (this.data) {
                allSteps = this.data.steps;
                entryUrl = this.data.meta?.entryUrl || '/';
            } else if (this.configUrl) {
                const response = await fetch(this.configUrl);
                if (!response.ok) throw new Error('Failed to load presentation');
                const data = await response.json();
                allSteps = data.steps;
                entryUrl = data.meta?.entryUrl || '/';
            } else {
                throw new Error('No configuration provided');
            }

            // Filter steps based on mode
            if (mode === 'page') {
                const currentPath = window.location.pathname;
                const currentHash = window.location.hash;
                
                // Get current page identifier (handle both pathname and hash routes)
                const currentPage = currentHash ? currentHash.replace('#', '') : currentPath;
                
                console.log(`Project PA: Page Mode - Current page: "${currentPage}"`);
                
                this.steps = allSteps.filter(step => {
                    // Normalize paths (remove leading/trailing slashes)
                    const stepPage = (step.page || '/').replace(/^\/|\/$/g, '');
                    const normalizedCurrent = currentPage.replace(/^\/|\/$/g, '');
                    
                    // Check if current page is root
                    const isCurrentRoot = normalizedCurrent === '' || normalizedCurrent === 'index.html';
                    // Check if step is for root
                    const isStepForRoot = stepPage === '' || stepPage === 'index.html';
                    
                    // EXACT match only (or both are root)
                    const isMatch = (isCurrentRoot && isStepForRoot) || (stepPage === normalizedCurrent);
                    
                    console.log(`  Step "${step.id}": page="${step.page}" -> ${isMatch ? '✓' : '✗'}`);
                    
                    return isMatch;
                });
                
                console.log(`Project PA: Filtered ${this.steps.length}/${allSteps.length} steps for "${currentPage}"`);
            } else {
                // FULL MODE - Redirect to entry/home page first if not already there
                this.steps = allSteps;
                console.log(`Project PA: Full Mode - ${this.steps.length} total steps`);
                
                // Check if we need to redirect to entry page
                const currentPath = window.location.pathname;
                const currentHash = window.location.hash;
                const currentPage = currentHash ? currentHash.replace('#', '') : currentPath;
                const normalizedCurrent = currentPage.replace(/^\/|\/$/g, '');
                const normalizedEntry = entryUrl.replace(/^\/|\/$/g, '');
                
                const isOnEntryPage = (normalizedCurrent === '' && normalizedEntry === '') ||
                                       normalizedCurrent === normalizedEntry ||
                                       normalizedCurrent === 'index.html';
                
                // Only redirect if not resuming from saved state
                const savedStep = localStorage.getItem(this.STORAGE_KEY);
                
                if (!isOnEntryPage && savedStep === null) {
                    console.log(`Project PA: Redirecting to entry page "${entryUrl}" first...`);
                    // Save mode before redirect so it continues after page load
                    localStorage.setItem(this.MODE_KEY, mode);
                    localStorage.setItem(this.STORAGE_KEY, '0');
                    window.location.href = entryUrl;
                    return; // Stop execution, will resume after redirect
                }
            }

            // Save mode for page reloads
            this.mode = mode;
            localStorage.setItem(this.MODE_KEY, mode);

            // Check for persisted step (ONLY for full mode)
            const savedStep = localStorage.getItem(this.STORAGE_KEY);
            if (mode === 'full' && savedStep !== null) {
                this.currentStep = parseInt(savedStep, 10);
                // Validate index
                if (this.currentStep >= this.steps.length) {
                    this.currentStep = 0;
                }
            } else {
                this.currentStep = 0;
            }

            if (this.steps.length === 0) {
                console.warn('Project PA: No steps found for this mode');
                alert('No tour steps found for this page.');
                return;
            }

            this.isActive = true;
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
        localStorage.removeItem(this.MODE_KEY);
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

        console.log(`Project PA: Showing Step ${this.currentStep + 1}/${this.steps.length}`, step);

        // Handle Redirect - ONLY in full mode
        if (this.mode === 'full' && step.page) {
            const currentPath = window.location.pathname;
            const currentHash = window.location.hash;
            const currentPage = currentHash ? currentHash.replace('#', '') : currentPath;
            const targetPage = step.page.replace(/^\//, '');
            const normalizedCurrent = currentPage.replace(/^\//, '');

            // Check if we need to navigate
            const isOnCorrectPage = targetPage === normalizedCurrent || 
                                     normalizedCurrent.includes(targetPage) ||
                                     (targetPage === '' && normalizedCurrent === '');

            if (!isOnCorrectPage) {
                console.log(`Project PA: Navigating to ${step.page}...`);
                window.location.href = step.page;
                return; // Stop execution to allow redirect
            }
        }

        // Small delay to ensure DOM is ready (especially after navigation)
        setTimeout(() => {
            // Highlight target
            if (step.target && step.target !== 'body') {
                const targetEl = document.querySelector(step.target);
                if (targetEl) {
                    this.highlighter.highlight(step.target, step.parent);
                } else {
                    console.warn(`Project PA: Target "${step.target}" not found on page`);
                    this.highlighter.hide();
                }
            } else {
                this.highlighter.hide();
            }

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
        }, 100);

        // Auto-advance
        if (this.timer) clearTimeout(this.timer);
        const duration = step.duration || 5000; // Default 5s

        this.timer = setTimeout(() => {
            if (this.isActive && this.currentStep < this.steps.length - 1) {
                this.next();
            } else if (this.isActive && this.currentStep === this.steps.length - 1) {
                this.stop();
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
