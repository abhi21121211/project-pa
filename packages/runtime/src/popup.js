export class Popup {
  constructor() {
    this.element = this.createPopup();
    this.onNext = null;
    this.onPrev = null;
    this.onClose = null;
  }

  createPopup() {
    const div = document.createElement('div');
    div.className = 'pa-popup';
    div.innerHTML = `
      <div class="pa-popup-header">
        <span class="pa-step-title">Project Tour</span>
        <div class="pa-header-controls">
          <button class="pa-popup-mute" title="Toggle Sound">🔊</button>
          <button class="pa-popup-close" title="Close">×</button>
        </div>
      </div>
      <div class="pa-popup-content"></div>
      <div class="pa-popup-controls">
        <button class="pa-btn pa-btn-prev">Previous</button>
        <span class="pa-step-counter"></span>
        <button class="pa-btn pa-btn-primary pa-btn-next">Next</button>
      </div>
    `;

    // Bind events
    div.querySelector('.pa-popup-close').onclick = () => this.onClose?.();
    div.querySelector('.pa-popup-mute').onclick = (e) => {
      const isMuted = this.onMuteToggle?.();
      e.target.textContent = isMuted ? '🔇' : '🔊';
    };
    div.querySelector('.pa-btn-prev').onclick = () => this.onPrev?.();
    div.querySelector('.pa-btn-next').onclick = () => this.onNext?.();

    document.body.appendChild(div);
    return div;
  }

  show(content, stepIndex, totalSteps) {
    const contentEl = this.element.querySelector('.pa-popup-content');
    const counterEl = this.element.querySelector('.pa-step-counter');
    const prevBtn = this.element.querySelector('.pa-btn-prev');
    const nextBtn = this.element.querySelector('.pa-btn-next');

    contentEl.textContent = content;
    counterEl.textContent = `${stepIndex + 1} / ${totalSteps}`;

    prevBtn.disabled = stepIndex === 0;
    nextBtn.textContent = stepIndex === totalSteps - 1 ? 'Finish' : 'Next';

    this.element.classList.add('pa-visible');
  }

  hide() {
    this.element.classList.remove('pa-visible');
  }
}
