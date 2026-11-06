/**
 * assets/js/welcome-transition.js - Lumina Café & Kitchen
 * 3D Spatial Hero Constellation & Interactive Loop Accordion
 * Hardware-accelerated, zero-lag, continuous bidirectional restore
 */

(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1) Split Words Helper for Hero Typography
    function initWordSplit() {
        const title = document.getElementById('welcomeTitle');
        if (!title) return;

        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const segments = text.split(/(\s+)/);
                const frag = document.createDocumentFragment();
                for (const seg of segments) {
                    if (!seg) continue;
                    if (/^\s+$/.test(seg)) {
                        frag.appendChild(document.createTextNode(seg));
                    } else {
                        const span = document.createElement('span');
                        span.className = 'w';
                        span.textContent = seg;
                        frag.appendChild(span);
                    }
                }
                node.parentNode.replaceChild(frag, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'BR') return;
                Array.from(node.childNodes).forEach(processNode);
            }
        }
        Array.from(title.childNodes).forEach(processNode);

        if (typeof gsap !== 'undefined' && !reduceMotion) {
            const words = title.querySelectorAll('.w');
            gsap.fromTo(
                words,
                { opacity: 0, y: 22, filter: 'blur(8px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.85,
                    stagger: 0.04,
                    ease: 'power2.out',
                    onComplete: () => {
                        words.forEach((w) => (w.style.filter = 'none'));
                    }
                }
            );
        }
    }

    // 2) Ambient Floating Petals (GPU Compositor Layer)
    function initPetals() {
        const container = document.getElementById('welcomePetals');
        if (!container || reduceMotion) return;

        const types = ['petal-jasmine', 'petal-amber', 'petal-coffee'];
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 14; i++) {
            const petal = document.createElement('span');
            const type = types[i % types.length];
            petal.className = `aroma-petal ${type}`;
            petal.style.left = (Math.random() * 100) + '%';
            const dx = (Math.random() * 140 - 70) + 'px';
            petal.style.setProperty('--dx', dx);
            petal.style.animationDuration = (10 + Math.random() * 8) + 's';
            petal.style.animationDelay = -(Math.random() * 12) + 's';
            const s = (0.7 + Math.random() * 0.5);
            petal.style.transform = `scale(${s}) translateZ(0)`;
            fragment.appendChild(petal);
        }
        container.appendChild(fragment);
    }

    // 3) Floating Glass Accents
    function initGlass() {
        const container = document.getElementById('welcomeGlass');
        if (!container || reduceMotion) return;

        const coords = [
            [5, 65], [7, 78], [85, 66], [88, 80]
        ];
        const fragment = document.createDocumentFragment();
        coords.forEach(([x, y]) => {
            const sq = document.createElement('div');
            sq.className = 'glass';
            sq.style.left = x + '%';
            sq.style.top = y + '%';
            sq.style.width = 'clamp(34px, 4vw, 50px)';
            sq.style.aspectRatio = '1';
            fragment.appendChild(sq);
        });
        container.appendChild(fragment);
    }

    // 4) 3D Spatial Mouse Parallax Tilt
    function initSpatialTilt() {
        const constellation = document.getElementById('spatialConstellation');
        const hero = document.getElementById('hero-sanctuary');
        if (!constellation || !hero || reduceMotion || window.innerWidth <= 900) return;

        let targetRX = 0;
        let targetRY = 0;
        let currentRX = 0;
        let currentRY = 0;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            targetRX = -y * 12; // tilt X
            targetRY = x * 15;  // tilt Y
        });

        hero.addEventListener('mouseleave', () => {
            targetRX = 0;
            targetRY = 0;
        });

        function renderTilt() {
            currentRX += (targetRX - currentRX) * 0.08;
            currentRY += (targetRY - currentRY) * 0.08;

            constellation.style.transform = `perspective(1200px) rotateX(${currentRX.toFixed(2)}deg) rotateY(${currentRY.toFixed(2)}deg)`;
            requestAnimationFrame(renderTilt);
        }
        requestAnimationFrame(renderTilt);
    }

    // 5) Gentle Smooth Scroll Helper
    function gentleScrollTo(targetY, duration = 1000) {
        const startY = window.pageYOffset || document.documentElement.scrollTop;
        const diff = targetY - startY;
        if (Math.abs(diff) < 2) return;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            window.scrollTo(0, startY + diff * ease);

            if (t < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    // 6) The Bloom & Part Spatial Scroll Transition (Fully Reversible)
    const cup = document.getElementById('welcome-cup-element');
    const cardTL = document.querySelector('.spatial-card-tl');
    const cardTR = document.querySelector('.spatial-card-tr');
    const cardBL = document.querySelector('.spatial-card-bl');
    const cardBR = document.querySelector('.spatial-card-br');
    const targetSection = document.getElementById('atmospheres-loop');

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let ticking = false;

    function updateScrollMotion() {
        if (isDragging || !cup) {
            ticking = false;
            return;
        }

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = 650;
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

        if (progress > 0) {
            // Central cup lifts gracefully
            const translateY = -progress * 220;
            const scale = 1 + progress * 0.12;
            cup.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            cup.style.opacity = Math.max(0, 1 - Math.pow(progress, 1.2));

            // Floating food & work cards bloom and part outward like a luxury gate
            const cardOpacity = Math.max(0, 1 - progress * 1.35);

            if (cardTL) {
                cardTL.style.transform = `translate3d(${-progress * 160}px, ${-progress * 80}px, 40px) rotate(${-progress * 10}deg)`;
                cardTL.style.opacity = cardOpacity;
            }
            if (cardTR) {
                cardTR.style.transform = `translate3d(${progress * 160}px, ${-progress * 80}px, 60px) rotate(${progress * 10}deg)`;
                cardTR.style.opacity = cardOpacity;
            }
            if (cardBL) {
                cardBL.style.transform = `translate3d(${-progress * 140}px, ${progress * 60}px, 50px) rotate(${-progress * 6}deg)`;
                cardBL.style.opacity = cardOpacity;
            }
            if (cardBR) {
                cardBR.style.transform = `translate3d(${progress * 140}px, ${progress * 60}px, 70px) rotate(${progress * 6}deg)`;
                cardBR.style.opacity = cardOpacity;
            }
        } else {
            // 100% Restored when at the top
            cup.style.transform = 'translate3d(0, 0, 0) scale(1)';
            cup.style.opacity = '1';

            if (cardTL) { cardTL.style.transform = 'translate3d(0, 0, 40px)'; cardTL.style.opacity = '1'; }
            if (cardTR) { cardTR.style.transform = 'translate3d(0, 0, 60px)'; cardTR.style.opacity = '1'; }
            if (cardBL) { cardBL.style.transform = 'translate3d(0, 0, 50px)'; cardBL.style.opacity = '1'; }
            if (cardBR) { cardBR.style.transform = 'translate3d(0, 0, 70px)'; cardBR.style.opacity = '1'; }
        }

        ticking = false;
    }

    function onNativeScroll() {
        if (!ticking) {
            requestAnimationFrame(updateScrollMotion);
            ticking = true;
        }
    }

    // 7) Interactive Drag & Spring Physics
    function startDrag(x, y) {
        isDragging = true;
        startX = x - currentX;
        startY = y - currentY;
        cup.style.transition = 'none';
        cup.style.cursor = 'grabbing';
    }

    function onDrag(x, y) {
        if (!isDragging) return;

        currentX = x - startX;
        currentY = y - startY;

        const distance = Math.hypot(currentX, currentY);
        const rotation = Math.min(18, Math.max(-18, currentX * 0.07));
        const scale = Math.max(0.92, 1 - distance * 0.0008);

        cup.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotation}deg) scale(${scale})`;

        if (distance > 110 || currentY < -70) {
            endDrag();
            const targetY = targetSection ? targetSection.offsetTop - 20 : window.innerHeight * 0.85;
            gentleScrollTo(targetY, 1050);
            window.showToast?.('Welcome to Lumina! Explore our 3 rhythms & dining below.', 'info');
        }
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        cup.style.cursor = 'grab';

        cup.style.transition = 'transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        cup.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
        currentX = 0;
        currentY = 0;
    }

    function onClickCup() {
        cup.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
        cup.style.transform = 'scale(0.96)';

        setTimeout(() => {
            cup.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            cup.style.transform = 'scale(1)';

            const targetY = targetSection ? targetSection.offsetTop - 20 : window.innerHeight * 0.85;
            gentleScrollTo(targetY, 1050);
            window.showToast?.('Welcome to Lumina! Explore our 3 rhythms & dining below.', 'info');
        }, 180);
    }

    // 8) Petalyx-style Interactive 3-Atmospheres Loop Accordion
    function initLoopAccordion() {
        const track = document.getElementById('loopTrack');
        if (!track) return;
        const panels = track.querySelectorAll('.loop-panel');

        panels.forEach((panel) => {
            const activate = () => {
                panels.forEach((p) => p.classList.remove('active'));
                panel.classList.add('active');
            };

            panel.addEventListener('mouseenter', activate);
            panel.addEventListener('click', activate);
        });
    }

    // 9) Zero-Cost Stats Counters
    function initStatsObserver() {
        const statEls = document.querySelectorAll('.stat-counter');
        if (!statEls.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    obs.unobserve(el);

                    const targetVal = parseFloat(el.getAttribute('data-to') || '0');
                    const decimals = parseInt(el.getAttribute('data-dec') || '0', 10);
                    const suffix = el.getAttribute('data-suf') || '';
                    const duration = 1400;
                    const startTime = performance.now();

                    function countStep(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(1, elapsed / duration);
                        const ease = 1 - Math.pow(1 - progress, 3);
                        const current = targetVal * ease;
                        el.textContent = current.toFixed(decimals) + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(countStep);
                        } else {
                            el.textContent = targetVal.toFixed(decimals) + suffix;
                        }
                    }
                    requestAnimationFrame(countStep);
                }
            });
        }, { threshold: 0.3 });

        statEls.forEach((el) => observer.observe(el));
    }

    // 10) Smooth In-Page Anchor Links
    function initAnchorSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId.length > 1) {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        gentleScrollTo(targetEl.offsetTop - 20, 1000);
                    }
                }
            });
        });
    }

    // 11) Bind Event Listeners
    if (cup) {
        cup.addEventListener('dragstart', (e) => e.preventDefault());

        cup.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startDrag(e.clientX, e.clientY);
        });
        window.addEventListener('mousemove', (e) => onDrag(e.clientX, e.clientY));
        window.addEventListener('mouseup', () => endDrag());

        cup.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length === 1) {
                onDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchend', () => endDrag());

        cup.addEventListener('click', () => {
            if (Math.abs(currentX) < 15 && Math.abs(currentY) < 15) {
                onClickCup();
            }
        });
    }

    window.addEventListener('scroll', onNativeScroll, { passive: true });

    // 12) Bootstrap on DOMContentLoaded
    function init() {
        initWordSplit();
        initPetals();
        initGlass();
        initSpatialTilt();
        initLoopAccordion();
        initStatsObserver();
        initAnchorSmoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
