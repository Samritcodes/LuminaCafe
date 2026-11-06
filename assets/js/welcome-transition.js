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

    // 6) The Bamboo Steamer & Dynamic Dumpling Spill Spatial Transition (Fully Reversible)
    const steamer = document.getElementById('welcome-steamer-element') || document.getElementById('welcome-cup-element');
    const lid = document.getElementById('steamer-lid-element');
    const steam = document.getElementById('steamerSteam');
    const card1 = document.querySelector('.dumpling-card-1') || document.querySelector('.spatial-card-tl');
    const card2 = document.querySelector('.dumpling-card-2') || document.querySelector('.spatial-card-tr');
    const card3 = document.querySelector('.dumpling-card-3') || document.querySelector('.spatial-card-bl');
    const card4 = document.querySelector('.dumpling-card-4') || document.querySelector('.spatial-card-br');
    const sauce = document.getElementById('spillSauce');
    const garnish = document.getElementById('spillGarnish');
    const hint = document.querySelector('.steamer-scroll-hint');
    const targetSection = document.getElementById('atmospheres-loop');

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let ticking = false;

    function updateScrollMotion() {
        if (isDragging || !steamer) {
            ticking = false;
            return;
        }

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = 620;
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

        if (progress > 0) {
            // Central Bamboo Steamer Tilts Forward to Spill
            const tiltX = 44 * progress;
            const tiltZ = -14 * progress;
            const posY = progress * 190;
            const scale = 1 + progress * 0.14;
            const op = Math.max(0, 1 - Math.pow(progress, 1.35));

            steamer.style.transform = `translate3d(0, ${posY}px, 0) rotateX(${tiltX}deg) rotateZ(${tiltZ}deg) scale(${scale})`;
            steamer.style.opacity = op;

            // Bamboo Lid flips and slides back dynamically
            if (lid) {
                lid.style.transform = `translate3d(${progress * 95}px, ${-progress * 135}px, 70px) rotate(${progress * 40}deg) rotateX(${progress * 25}deg)`;
                lid.style.opacity = Math.max(0, 1 - progress * 1.6);
            }

            // Fragrant Steam Wisps disperse
            if (steam) {
                steam.style.opacity = Math.max(0, 1 - progress * 2.2);
            }

            // 4 Dumpling Flight Cards Spill Across Screen Margins (Ballistic 3D Flight Paths)
            const cardOpacity = Math.max(0, 1 - Math.pow(progress, 1.35));

            if (card1) {
                // Truffle Xiao Long Bao: Launches towards top-left
                const dx1 = -progress * 260;
                const dy1 = -progress * 130 + (progress * progress * 35);
                const rot1 = -progress * 18;
                card1.style.transform = `translate3d(${dx1}px, ${dy1}px, 80px) rotate(${rot1}deg) scale(${1 + progress * 0.10})`;
                card1.style.opacity = cardOpacity;
            }

            if (card2) {
                // Crisp Golden Gyoza: Bursts towards top-right
                const dx2 = progress * 270;
                const dy2 = -progress * 120 + (progress * progress * 30);
                const rot2 = progress * 18;
                card2.style.transform = `translate3d(${dx2}px, ${dy2}px, 90px) rotate(${rot2}deg) scale(${1 + progress * 0.10})`;
                card2.style.opacity = cardOpacity;
            }

            if (card3) {
                // Sichuan Chili Wontons: Tumbles across floor bottom-left
                const dx3 = -progress * 230;
                const dy3 = progress * 150;
                const rot3 = -progress * 12;
                card3.style.transform = `translate3d(${dx3}px, ${dy3}px, 60px) rotate(${rot3}deg) scale(${1 + progress * 0.08})`;
                card3.style.opacity = cardOpacity;
            }

            if (card4) {
                // Steamed Shiitake Bao: Rolls across floor bottom-right
                const dx4 = progress * 240;
                const dy4 = progress * 160;
                const rot4 = progress * 14;
                card4.style.transform = `translate3d(${dx4}px, ${dy4}px, 70px) rotate(${rot4}deg) scale(${1 + progress * 0.08})`;
                card4.style.opacity = cardOpacity;
            }

            // Spilling Accents: Chili Oil Dish & Garnishes
            if (sauce) {
                sauce.style.transform = `translate3d(${-progress * 150}px, ${progress * 90}px, 30px)`;
                sauce.style.opacity = Math.max(0, 1 - progress * 1.5);
            }
            if (garnish) {
                garnish.style.transform = `scale(${1 + progress * 0.4})`;
                garnish.style.opacity = Math.max(0, 1 - progress * 1.6);
            }
            if (hint) {
                hint.style.opacity = Math.max(0, 1 - progress * 2.5);
            }
        } else {
            // 100% Fully Restored when user scrolls back to the top
            steamer.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg) scale(1)';
            steamer.style.opacity = '1';

            if (lid) { lid.style.transform = 'none'; lid.style.opacity = '1'; }
            if (steam) { steam.style.opacity = '1'; }

            if (card1) { card1.style.transform = 'translate3d(0, 0, 50px) rotate(-3deg)'; card1.style.opacity = '1'; }
            if (card2) { card2.style.transform = 'translate3d(0, 0, 65px) rotate(3deg)'; card2.style.opacity = '1'; }
            if (card3) { card3.style.transform = 'translate3d(0, 0, 45px) rotate(-2deg)'; card3.style.opacity = '1'; }
            if (card4) { card4.style.transform = 'translate3d(0, 0, 70px) rotate(2deg)'; card4.style.opacity = '1'; }

            if (sauce) { sauce.style.transform = 'none'; sauce.style.opacity = '1'; }
            if (garnish) { garnish.style.transform = 'none'; garnish.style.opacity = '1'; }
            if (hint) { hint.style.opacity = '1'; }
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
        if (!steamer) return;
        isDragging = true;
        startX = x - currentX;
        startY = y - currentY;
        steamer.style.transition = 'none';
        steamer.style.cursor = 'grabbing';
    }

    function onDrag(x, y) {
        if (!isDragging || !steamer) return;

        currentX = x - startX;
        currentY = y - startY;

        const distance = Math.hypot(currentX, currentY);
        const rotX = -currentY * 0.12;
        const rotY = currentX * 0.14;
        const rotZ = currentX * 0.05;
        const scale = Math.max(0.92, 1 - distance * 0.0007);

        steamer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;

        if (distance > 110 || currentY > 80 || currentY < -70) {
            endDrag();
            const targetY = targetSection ? targetSection.offsetTop - 20 : window.innerHeight * 0.85;
            gentleScrollTo(targetY, 1050);
            window.showToast?.('🥢 Steamer Uncovered! Welcome to Lumina\'s all-day kitchen & dining sanctuary.', 'info');
        }
    }

    function endDrag() {
        if (!isDragging || !steamer) return;
        isDragging = false;
        steamer.style.cursor = 'grab';

        steamer.style.transition = 'transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        steamer.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)';
        currentX = 0;
        currentY = 0;
    }

    function onClickSteamer() {
        if (!steamer) return;
        steamer.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
        steamer.style.transform = 'scale(0.96) rotateX(8deg)';

        setTimeout(() => {
            steamer.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            steamer.style.transform = 'scale(1) rotateX(0deg)';

            const targetY = targetSection ? targetSection.offsetTop - 20 : window.innerHeight * 0.85;
            gentleScrollTo(targetY, 1050);
            window.showToast?.('🥢 Steamer Uncovered! Welcome to Lumina\'s all-day kitchen & dining sanctuary.', 'info');
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

    // 11) Dynamic Section Background Color Morphing (Smooth Bezier Morph on Scroll)
    function initBackgroundColorMorph() {
        const sections = document.querySelectorAll('section[data-bg-color]');
        if (!sections.length || !('IntersectionObserver' in window)) return;

        let activeColor = '';
        const observer = new IntersectionObserver((entries) => {
            let bestEntry = null;
            let maxRatio = 0;

            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    bestEntry = entry;
                }
            });

            if (bestEntry && maxRatio > 0.18) {
                const targetColor = bestEntry.target.getAttribute('data-bg-color');
                if (targetColor && targetColor !== activeColor) {
                    activeColor = targetColor;
                    document.body.style.backgroundColor = targetColor;
                }
            }
        }, {
            threshold: [0.15, 0.35, 0.55, 0.75],
            rootMargin: '-10% 0px -10% 0px'
        });

        sections.forEach((sec) => observer.observe(sec));
    }

    // 12) Bind Event Listeners
    if (steamer) {
        steamer.addEventListener('dragstart', (e) => e.preventDefault());

        steamer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startDrag(e.clientX, e.clientY);
        });
        window.addEventListener('mousemove', (e) => onDrag(e.clientX, e.clientY));
        window.addEventListener('mouseup', () => endDrag());

        steamer.addEventListener('touchstart', (e) => {
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

        steamer.addEventListener('click', () => {
            if (Math.abs(currentX) < 15 && Math.abs(currentY) < 15) {
                onClickSteamer();
            }
        });
    }

    window.addEventListener('scroll', onNativeScroll, { passive: true });

    // 13) Bootstrap on DOMContentLoaded
    function init() {
        initWordSplit();
        initPetals();
        initGlass();
        initSpatialTilt();
        initLoopAccordion();
        initStatsObserver();
        initAnchorSmoothScroll();
        initBackgroundColorMorph();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
