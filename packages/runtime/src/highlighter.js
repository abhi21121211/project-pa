export class Highlighter {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'pa-highlight-overlay';
        this.overlay.style.display = 'none';
        document.body.appendChild(this.overlay);
    }

    highlight(selector) {
        if (!selector || selector === 'body') {
            this.hide();
            return;
        }

        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Project PA: Element not found: ${selector}`);
            this.hide();
            return;
        }

        // Scroll into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Get coordinates
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // Position overlay
        this.overlay.style.width = `${rect.width + 8}px`;
        this.overlay.style.height = `${rect.height + 8}px`;
        this.overlay.style.top = `${rect.top + scrollTop - 4}px`;
        this.overlay.style.left = `${rect.left + scrollLeft - 4}px`;
        this.overlay.style.display = 'block';
    }

    hide() {
        this.overlay.style.display = 'none';
    }
}
