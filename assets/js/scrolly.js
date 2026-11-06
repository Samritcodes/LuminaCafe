/**
 * assets/js/scrolly.js - Apple-Style Interactive Scrollytelling Canvas
 * Features: High-DPI Canvas Rendering, Smooth Scroll Interpolation,
 * Spatial Zoom & Cross-Dissolve, Interactive Scrubber & Milestone Cards.
 */

class AppleScrollyStudio {
    constructor() {
        this.container = document.querySelector('.scrolly-container');
        this.canvas = document.getElementById('scroll-canvas');
        if (!this.container || !this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.progress = 0;
        this.targetProgress = 0;
        this.isPlaying = false;
        this.animFrameId = null;

        // Image Sources for the 4 Sequential Milestones
        this.imageUrls = [
            'assets/images/seq_1.jpg',
            'assets/images/seq_2.jpg',
            'assets/images/hero-dish.jpg',
            'assets/images/seq_3.jpg'
        ];

        this.images = [];
        this.imagesLoaded = 0;

        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Preload Images
        this.imageUrls.forEach((url, i) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this.imagesLoaded++;
                if (this.imagesLoaded === 1) {
                    this.render(0);
                }
            };
            img.onerror = () => {
                // High quality fallback if local generated file path is resolving
                if (i === 0) img.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80';
                if (i === 1) img.src = 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&auto=format&fit=crop&q=80';
                if (i === 2) img.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=80';
                if (i === 3) img.src = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=80';
            };
            this.images.push(img);
        });

        // Scroll Listener
        window.addEventListener('scroll', () => {
            if (!this.isPlaying) {
                this.updateFromScroll();
            }
        });

        // Interactive Slider Scrubber
        const slider = document.getElementById('scrolly-slider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                this.isPlaying = false;
                this.targetProgress = parseFloat(e.target.value) / 100;
                this.render(this.targetProgress);
                this.updateCards(this.targetProgress);
            });
        }

        // Play / Pause Button
        const playBtn = document.getElementById('scrolly-play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                this.togglePlay(playBtn);
            });
        }

        // Clickable Step Cards
        document.querySelectorAll('.scrolly-step-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.jumpToStep(index);
            });
        });

        // Animation Loop for Smooth Damped Progression
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    jumpToStep(stepIndex) {
        this.isPlaying = false;
        const targets = [0.08, 0.40, 0.68, 0.95];
        this.targetProgress = targets[stepIndex] ?? 0;
        this.progress = this.targetProgress;
        this.render(this.progress);
        this.updateCards(this.progress);
        const slider = document.getElementById('scrolly-slider');
        if (slider) slider.value = Math.round(this.progress * 100);
    }

    resizeCanvas() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.render(this.progress);
    }

    updateFromScroll() {
        const rect = this.container.getBoundingClientRect();
        const totalScrollable = this.container.clientHeight - window.innerHeight;
        if (totalScrollable <= 0) return;

        const currentScroll = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
        this.targetProgress = rawProgress;

        const slider = document.getElementById('scrolly-slider');
        if (slider) slider.value = Math.round(this.targetProgress * 100);
    }

    togglePlay(btn) {
        this.isPlaying = !this.isPlaying;
        const icon = btn.querySelector('i');
        const text = btn.querySelector('span');

        if (this.isPlaying) {
            if (icon) icon.setAttribute('data-lucide', 'pause');
            if (text) text.textContent = 'Pause';
            if (this.targetProgress >= 0.99) this.targetProgress = 0;
        } else {
            if (icon) icon.setAttribute('data-lucide', 'play');
            if (text) text.textContent = 'Auto Play';
        }
        if (window.lucide) window.lucide.createIcons();
    }

    loop() {
        requestAnimationFrame(this.loop);

        if (this.isPlaying) {
            this.targetProgress += 0.0035;
            if (this.targetProgress >= 1) {
                this.targetProgress = 0;
            }
            const slider = document.getElementById('scrolly-slider');
            if (slider) slider.value = Math.round(this.targetProgress * 100);
        }

        // Smooth damping interpolation
        this.progress += (this.targetProgress - this.progress) * 0.12;

        this.render(this.progress);
        this.updateCards(this.progress);
    }

    render(p) {
        if (!this.ctx || this.images.length === 0) return;

        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);

        // Determine which two milestone images we are between
        const totalStages = this.images.length - 1;
        const scaledProgress = p * totalStages;
        const idxA = Math.min(Math.floor(scaledProgress), totalStages);
        const idxB = Math.min(idxA + 1, totalStages);
        const stageProgress = scaledProgress - idxA;

        const imgA = this.images[idxA];
        const imgB = this.images[idxB];

        // Draw Base Image A with spatial zoom
        if (imgA && imgA.complete && imgA.naturalWidth) {
            this.drawImageCover(imgA, 1.0 + (p * 0.08), 1.0);
        }

        // Cross-dissolve Image B
        if (imgB && imgB.complete && imgB.naturalWidth && stageProgress > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = Math.min(1, Math.max(0, stageProgress));
            this.drawImageCover(imgB, 1.0 + ((p - 0.25) * 0.08), 1.0);
            this.ctx.restore();
        }

        // Cinematic Vignette Overlay
        const grad = this.ctx.createRadialGradient(w / 2, h / 2, h * 0.35, w / 2, h / 2, w * 0.7);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(18,16,14,0.65)');
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, w, h);
    }

    drawImageCover(img, scale = 1.0, alpha = 1.0) {
        const cw = this.canvas.width;
        const ch = this.canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalWidth ? img.naturalHeight : 1;

        const hRatio = cw / iw;
        const vRatio = ch / ih;
        const ratio = Math.max(hRatio, vRatio) * scale;

        const nw = iw * ratio;
        const nh = ih * ratio;
        const nx = (cw - nw) / 2;
        const ny = (ch - nh) / 2;

        this.ctx.drawImage(img, nx, ny, nw, nh);
    }

    updateCards(p) {
        const cards = document.querySelectorAll('.scrolly-step-card');
        let activeIndex = 0;

        if (p < 0.28) {
            activeIndex = 0;
        } else if (p < 0.55) {
            activeIndex = 1;
        } else if (p < 0.80) {
            activeIndex = 2;
        } else {
            activeIndex = 3;
        }

        cards.forEach((card, idx) => {
            if (idx === activeIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update Progress Tracker Callouts
        const fillBar = document.getElementById('scrolly-bar-fill');
        const pctText = document.getElementById('scrolly-pct');
        const pctVal = Math.round(p * 100);
        if (fillBar) fillBar.style.height = `${pctVal}%`;
        if (pctText) pctText.textContent = `${pctVal}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.scrolly-container')) {
        window.appleStudio = new AppleScrollyStudio();
    }
});
