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

  // Create Menu
  const menu = document.createElement('div');
  menu.className = 'pa-widget-menu';
  menu.innerHTML = `
        <button class="pa-menu-item" data-mode="full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Start Full Tour
        </button>
        <button class="pa-menu-item" data-mode="page">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Explain This Page
        </button>
    `;

  // Toggle Menu
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('pa-visible');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('pa-visible');
    }
  });

  // Handle Menu Selection
  menu.querySelectorAll('.pa-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const mode = item.getAttribute('data-mode');
      menu.classList.remove('pa-visible');
      onStart(mode);
    });
  });

  document.body.appendChild(btn);
  document.body.appendChild(menu);
  return { btn, menu };
}
