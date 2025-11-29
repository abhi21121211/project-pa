export function createWidget(onStart) {
    // Create button
    const btn = document.createElement('button');
    btn.className = 'pa-widget-btn';
    btn.innerHTML = `
    <svg class="pa-widget-icon" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
  `;

    // Add tooltip/title
    btn.title = 'Start Project Tour';

    // Click handler
    btn.addEventListener('click', () => {
        onStart();
    });

    document.body.appendChild(btn);
    return btn;
}
