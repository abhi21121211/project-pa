export class Highlighter {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'pa-highlight-overlay';
        this.overlay.style.display = 'none';
        document.body.appendChild(this.overlay);
    }

    highlight(selector, parentSelector = null) {
        if (!selector || selector === 'body') {
            this.hide();
            return;
        }

        let element;
        if (parentSelector) {
            const parent = document.querySelector(parentSelector);
            if (parent) {
                element = parent.querySelector(selector);
            } else {
                console.warn(`Project PA: Parent element not found: ${parentSelector}`);
            }
        }

        // Fallback to global search if no parent or parent not found (or element not found in parent)
        if (!element) {
            element = document.querySelector(selector);
        }

        if (!element) {
            console.warn(`Project PA: Element not found: ${selector} (Parent: ${parentSelector})`);
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
