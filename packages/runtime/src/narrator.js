export class Narrator {
    constructor() {
        this.synth = window.speechSynthesis;
        this.isMuted = false;
        this.voice = null;

        // Load voices when available
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.loadVoices();
        }
        this.loadVoices();
    }

    loadVoices() {
        const voices = this.synth.getVoices();
        // Prefer Google voices or natural sounding ones
        this.voice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en'))
            || voices.find(v => v.lang.startsWith('en'))
            || voices[0];
    }

    speak(text) {
        if (this.isMuted || !this.synth) return;

        // Cancel current speech
        this.stop();

        const utterance = new SpeechSynthesisUtterance(text);
        if (this.voice) {
            utterance.voice = this.voice;
        }
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        this.synth.speak(utterance);
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stop();
        }
        return this.isMuted;
    }
}
