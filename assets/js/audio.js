/**
 * assets/js/audio.js
 * Cozy Cafe Ambient Audio Generator using Web Audio API
 * Generates Rain, Espresso Steam, and Vinyl Crackle soundscapes in real-time.
 */

class CafeSoundscape {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.rainGain = null;
        this.steamGain = null;
        this.vinylGain = null;
        this.masterGain = null;
    }

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // 1. Rain Synthesizer (Filtered Pink/Brown Noise)
        this.createRainNode();

        // 2. Vinyl Record Crackle Node
        this.createVinylNode();

        // 3. Gentle Steam Hiss
        this.createSteamNode();
    }

    createRainNode() {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            // Brown noise approximation
            data[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = data[i];
            data[i] *= 3.5;
        }

        const rainSource = this.ctx.createBufferSource();
        rainSource.buffer = buffer;
        rainSource.loop = true;

        const rainFilter = this.ctx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.setValueAtTime(700, this.ctx.currentTime);

        this.rainGain = this.ctx.createGain();
        this.rainGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

        rainSource.connect(rainFilter);
        rainFilter.connect(this.rainGain);
        this.rainGain.connect(this.masterGain);
        rainSource.start();
    }

    createVinylNode() {
        const bufferSize = this.ctx.sampleRate * 3;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            if (Math.random() < 0.0006) {
                data[i] = (Math.random() * 2 - 1) * 0.9; // Click/pop
            } else {
                data[i] = (Math.random() * 2 - 1) * 0.012; // Gentle surface hiss
            }
        }

        const vinylSource = this.ctx.createBufferSource();
        vinylSource.buffer = buffer;
        vinylSource.loop = true;

        const vinylFilter = this.ctx.createBiquadFilter();
        vinylFilter.type = 'highpass';
        vinylFilter.frequency.setValueAtTime(800, this.ctx.currentTime);

        this.vinylGain = this.ctx.createGain();
        this.vinylGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

        vinylSource.connect(vinylFilter);
        vinylFilter.connect(this.vinylGain);
        this.vinylGain.connect(this.masterGain);
        vinylSource.start();
    }

    createSteamNode() {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.3;
        }

        const steamSource = this.ctx.createBufferSource();
        steamSource.buffer = buffer;
        steamSource.loop = true;

        const steamFilter = this.ctx.createBiquadFilter();
        steamFilter.type = 'bandpass';
        steamFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);
        steamFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

        this.steamGain = this.ctx.createGain();
        this.steamGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

        steamSource.connect(steamFilter);
        steamFilter.connect(this.steamGain);
        this.steamGain.connect(this.masterGain);
        steamSource.start();
    }

    toggle() {
        if (!this.ctx) {
            this.init();
        }

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        this.isPlaying = !this.isPlaying;
        const now = this.ctx.currentTime;

        if (this.isPlaying) {
            this.rainGain.gain.setTargetAtTime(0.28, now, 0.4);
            this.vinylGain.gain.setTargetAtTime(0.18, now, 0.4);
            this.steamGain.gain.setTargetAtTime(0.09, now, 0.4);
        } else {
            this.rainGain.gain.setTargetAtTime(0.0, now, 0.3);
            this.vinylGain.gain.setTargetAtTime(0.0, now, 0.3);
            this.steamGain.gain.setTargetAtTime(0.0, now, 0.3);
        }

        return this.isPlaying;
    }

    setVolume(type, val) {
        if (!this.ctx) return;
        const gainNode = type === 'rain' ? this.rainGain : (type === 'vinyl' ? this.vinylGain : this.steamGain);
        if (gainNode) {
            gainNode.gain.setTargetAtTime(val, this.ctx.currentTime, 0.1);
        }
    }
}

window.cafeAudio = new CafeSoundscape();
