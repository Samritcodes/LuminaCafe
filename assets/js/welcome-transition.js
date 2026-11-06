/**
 * assets/js/welcome-transition.js - Lumina Café & Kitchen
 * High-Fashion Full-Screen Graphic Motion Engine
 * Architecture: GSAP ScrollTrigger Pinned Viewport + 3D Dumpling Spill + Autonomous Physics
 */

(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1) Split Words Helper for Hero Typography
    function initWordSplit() {
        const title = document.querySelector('.editorial-title');
        if (!title || reduceMotion) return;

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(
                title,
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.1,
                    ease: 'power3.out'
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
        for (let i = 0; i < 16; i++) {
            const petal = document.createElement('span');
            const type = types[i % types.length];
            petal.className = `aroma-petal ${type}`;
            petal.style.left = (Math.random() * 100) + '%';
            const dx = (Math.random() * 160 - 80) + 'px';
            petal.style.setProperty('--dx', dx);
            petal.style.animationDuration = (9 + Math.random() * 8) + 's';
            petal.style.animationDelay = -(Math.random() * 12) + 's';
            const s = (0.7 + Math.random() * 0.5);
            petal.style.transform = `scale(${s}) translateZ(0)`;
            fragment.appendChild(petal);
        }
        container.appendChild(fragment);
    }

    // 3) 3D Spatial Mouse Parallax Tilt
    function initSpatialTilt() {
        const stage = document.getElementById('graphicStageContainer');
        const hero = document.getElementById('hero-sanctuary');
        if (!stage || !hero || reduceMotion || window.innerWidth <= 900) return;

        let targetRX = 0;
        let targetRY = 0;
        let currentRX = 0;
        let currentRY = 0;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            targetRX = -y * 12; // tilt X
            targetRY = x * 14;  // tilt Y
        });

        hero.addEventListener('mouseleave', () => {
            targetRX = 0;
            targetRY = 0;
        });

        function renderTilt() {
            currentRX += (targetRX - currentRX) * 0.08;
            currentRY += (targetRY - currentRY) * 0.08;

            stage.style.transform = `perspective(1200px) rotateX(${currentRX.toFixed(2)}deg) rotateY(${currentRY.toFixed(2)}deg)`;
            requestAnimationFrame(renderTilt);
        }
        requestAnimationFrame(renderTilt);
    }

    // 4) Transparent Glass Navbar Manager Over Hero
    function initNavbarManager() {
        const navbar = document.querySelector('.navbar-light');
        if (!navbar) return;

        function updateNavbar() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY < 120) {
                navbar.classList.add('navbar-on-hero');
            } else {
                navbar.classList.remove('navbar-on-hero');
            }
        }

        window.addEventListener('scroll', updateNavbar, { passive: true });
        updateNavbar();
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

    // 6) MASTER GRAPHIC MOTION & PINNED DUMPLING SPILL ENGINE
    const heroSection = document.getElementById('hero-sanctuary');
    const visualLayer = document.getElementById('heroVisualLayer');
    const steamer = document.getElementById('welcome-steamer-element');
    const lid = document.getElementById('steamer-lid-element');
    const steam = document.getElementById('steamerSteam');
    const preview = document.getElementById('cornerPreview');
    const leftCol = document.querySelector('.graphic-editorial-col.left-col');
    const rightCol = document.querySelector('.graphic-editorial-col.right-col');
    const indicator = document.querySelector('.graphic-scroll-indicator');
    const hudPills = document.querySelectorAll('.graphic-motion-hud .hud-pill');
    const card1 = document.querySelector('.spill-card-1');
    const card2 = document.querySelector('.spill-card-2');
    const card3 = document.querySelector('.spill-card-3');
    const card4 = document.querySelector('.spill-card-4');
    const sauce = document.getElementById('spillSauce');
    const targetSection = document.getElementById('atmospheres-loop');

    let currentProgress = 0;
    let confettiFired = false;
    let isProgrammaticScroll = false;
    let pinScrollTrigger = null;

    // Apply exact spatial 3D transform based on progress [0.0 -> 1.0]
    function applySpillTransform(progress) {
        currentProgress = Math.min(1, Math.max(0, progress));

        // Update HUD pill active state
        let activeStage = 0;
        if (currentProgress >= 0.75) {
            activeStage = 2;
        } else if (currentProgress >= 0.25) {
            activeStage = 1;
        }
        hudPills.forEach((pill) => {
            const stage = parseInt(pill.getAttribute('data-stage') || '0', 10);
            if (stage === activeStage) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });

        // Background Color Morphing
        if (visualLayer) {
            if (currentProgress < 0.35) {
                visualLayer.style.background = 'linear-gradient(135deg, #8C350F 0%, #C25E00 45%, #7C2D12 100%)';
            } else if (currentProgress < 0.75) {
                visualLayer.style.background = 'linear-gradient(135deg, #B45309 0%, #D97706 45%, #92400E 100%)';
            } else {
                visualLayer.style.background = 'linear-gradient(135deg, #292524 0%, #1C1917 50%, #44403C 100%)';
            }
        }

        if (currentProgress <= 0.02) {
            // Stage 0: 100% Upright Restored Steamer Basket
            if (steamer) {
                steamer.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg) scale(1)';
                steamer.style.opacity = '1';
                steamer.style.animation = 'floatBreathing 4s ease-in-out infinite';
            }
            if (lid) {
                lid.style.transform = 'none';
                lid.style.opacity = '1';
            }
            if (steam) steam.style.opacity = '1';
            if (preview) {
                preview.style.transform = 'translate(-50%, -50%) scale(0.85)';
                preview.style.opacity = '1';
            }
            if (leftCol) {
                leftCol.style.transform = 'none';
                leftCol.style.opacity = '1';
            }
            if (rightCol) {
                rightCol.style.transform = 'none';
                rightCol.style.opacity = '1';
            }
            if (indicator) indicator.style.opacity = '1';

            [card1, card2, card3, card4].forEach((c) => {
                if (c) {
                    c.style.opacity = '0';
                    c.style.pointerEvents = 'none';
                    c.style.transform = 'translate3d(0, 0, 0) scale(0.2)';
                }
            });
            if (sauce) {
                sauce.style.opacity = '0';
                sauce.style.transform = 'none';
            }
            confettiFired = false;
            return;
        }

        // Steamer is in active motion, stop breathing animation to let transform take over
        if (steamer) {
            steamer.style.animation = 'none';
        }

        // Phase 1: Bucket Tilts & Lid Pops Off [0.02 -> 0.35]
        const p1 = Math.min(1, currentProgress / 0.35);
        if (steamer) {
            const tiltX = 65 * p1;
            const tiltZ = -22 * p1;
            const posY = p1 * 180;
            const scale = 1 + p1 * 0.12;
            const op = currentProgress > 0.70 ? Math.max(0, 1 - (currentProgress - 0.70) * 3) : 1;
            steamer.style.transform = `translate3d(0, ${posY}px, 0) rotateX(${tiltX}deg) rotateZ(${tiltZ}deg) scale(${scale})`;
            steamer.style.opacity = op;
        }

        if (lid) {
            const lidX = p1 * 240;
            const lidY = -p1 * 220;
            const lidRot = p1 * 65;
            lid.style.transform = `translate3d(${lidX}px, ${lidY}px, 120px) rotate(${lidRot}deg) rotateX(${p1 * 35}deg)`;
            lid.style.opacity = Math.max(0, 1 - p1 * 1.8);
        }

        if (steam) steam.style.opacity = Math.max(0, 1 - p1 * 2.2);

        if (preview) {
            preview.style.transform = `translate(-50%, -50%) scale(${0.85 - p1 * 0.3}) translate3d(${p1 * 100}px, ${p1 * 80}px, 0)`;
            preview.style.opacity = Math.max(0, 1 - p1 * 1.8);
        }

        if (leftCol) {
            leftCol.style.transform = `translate3d(${-p1 * 120}px, 0, 0)`;
            leftCol.style.opacity = Math.max(0, 1 - p1 * 1.6);
        }
        if (rightCol) {
            rightCol.style.transform = `translate3d(${p1 * 120}px, 0, 0)`;
            rightCol.style.opacity = Math.max(0, 1 - p1 * 1.6);
        }
        if (indicator) indicator.style.opacity = Math.max(0, 1 - p1 * 3);

        // Phase 2: THE EXPLOSIVE DUMPLING SPILL [0.20 -> 0.85]
        const spillP = Math.min(1, Math.max(0, (currentProgress - 0.20) / 0.55));
        const spillOp = currentProgress < 0.70 
            ? Math.min(1, spillP * 2.2) 
            : Math.max(0, 1 - (currentProgress - 0.70) * 3.2);

        if (spillP > 0) {
            // Card 1: Truffle Xiao Long Bao (Top Left)
            if (card1) {
                const dx1 = -spillP * 340;
                const dy1 = -spillP * 140 + (spillP * spillP * 45);
                const s1 = 0.3 + spillP * 0.85;
                card1.style.transform = `translate3d(${dx1}px, ${dy1}px, 110px) rotate(${-spillP * 14}deg) scale(${s1})`;
                card1.style.opacity = spillOp;
                card1.style.pointerEvents = spillOp > 0.5 ? 'auto' : 'none';
            }

            // Card 2: Crisp Golden Gyoza (Top Right)
            if (card2) {
                const dx2 = spillP * 340;
                const dy2 = -spillP * 130 + (spillP * spillP * 40);
                const s2 = 0.3 + spillP * 0.85;
                card2.style.transform = `translate3d(${dx2}px, ${dy2}px, 110px) rotate(${spillP * 14}deg) scale(${s2})`;
                card2.style.opacity = spillOp;
                card2.style.pointerEvents = spillOp > 0.5 ? 'auto' : 'none';
            }

            // Card 3: Sichuan Chili Wontons (Bottom Left Floor)
            if (card3) {
                const dx3 = -spillP * 310;
                const dy3 = spillP * 200;
                const s3 = 0.3 + spillP * 0.8;
                card3.style.transform = `translate3d(${dx3}px, ${dy3}px, 80px) rotate(${-spillP * 8}deg) scale(${s3})`;
                card3.style.opacity = spillOp;
                card3.style.pointerEvents = spillOp > 0.5 ? 'auto' : 'none';
            }

            // Card 4: Steamed Wild Shiitake Bao (Bottom Right Floor)
            if (card4) {
                const dx4 = spillP * 310;
                const dy4 = spillP * 210;
                const s4 = 0.3 + spillP * 0.8;
                card4.style.transform = `translate3d(${dx4}px, ${dy4}px, 80px) rotate(${spillP * 10}deg) scale(${s4})`;
                card4.style.opacity = spillOp;
                card4.style.pointerEvents = spillOp > 0.5 ? 'auto' : 'none';
            }

            // Chili Sauce Splash onto floor
            if (sauce) {
                const sauceY = spillP * 150;
                const sauceS = 0.4 + spillP * 0.75;
                sauce.style.transform = `translate3d(0, ${sauceY}px, 50px) scale(${sauceS})`;
                sauce.style.opacity = spillOp;
            }

            // Trigger Golden Sesame & Chili Flake Confetti Burst
            if (spillP > 0.45 && !confettiFired && typeof confetti === 'function') {
                confettiFired = true;
                confetti({
                    particleCount: 35,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#F59E0B', '#FBBF24', '#DC2626', '#FEF3C7', '#B45309']
                });
            }
        }
    }

    // 7) Set Up GSAP ScrollTrigger Viewport Pinning
    function initPinnedSpillTrigger() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || !heroSection) {
            // Fallback to native window scroll calculation
            window.addEventListener('scroll', () => {
                if (isProgrammaticScroll) return;
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                const progress = Math.min(1, Math.max(0, scrollY / 700));
                applySpillTransform(progress);
            }, { passive: true });
            return;
        }

        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        } else {
            gsap.registerPlugin(ScrollTrigger);
        }

        pinScrollTrigger = ScrollTrigger.create({
            trigger: '#hero-sanctuary',
            start: 'top top',
            end: '+=1000',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
                if (isProgrammaticScroll) return;
                applySpillTransform(self.progress);
            }
        });
    }

    // 8) Public API for User Interaction & HUD Controller
    window.luminaMotion = {
        // Jump to any stage: 0 = Steamer Bucket, 1 = Spill Explosion, 2 = Full Café
        jumpToStage: function (stageIndex) {
            if (stageIndex === 0) {
                // Return to top
                isProgrammaticScroll = true;
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onUpdate: () => applySpillTransform(0),
                        onComplete: () => {
                            isProgrammaticScroll = false;
                            applySpillTransform(0);
                        }
                    });
                } else {
                    gentleScrollTo(0, 700);
                    applySpillTransform(0);
                    isProgrammaticScroll = false;
                }
            } else if (stageIndex === 1) {
                // Jump to Mid-Spill Explosion
                isProgrammaticScroll = true;
                const pinEnd = pinScrollTrigger ? pinScrollTrigger.start + 550 : 550;
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: pinEnd,
                        duration: 0.9,
                        ease: 'power2.inOut',
                        onUpdate: () => applySpillTransform(0.55),
                        onComplete: () => {
                            isProgrammaticScroll = false;
                            applySpillTransform(0.55);
                        }
                    });
                } else {
                    gentleScrollTo(pinEnd, 800);
                    applySpillTransform(0.55);
                    isProgrammaticScroll = false;
                }
            } else if (stageIndex === 2) {
                // Reveal the Full Café Platform
                const targetY = targetSection ? targetSection.offsetTop - 40 : 1200;
                isProgrammaticScroll = true;
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: targetY,
                        duration: 1.0,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            isProgrammaticScroll = false;
                            applySpillTransform(1);
                        }
                    });
                } else {
                    gentleScrollTo(targetY, 900);
                    isProgrammaticScroll = false;
                }
            }
        },

        // Play the complete cinematic spill motion from 0 to 1 smoothly
        playCinematicSpill: function () {
            isProgrammaticScroll = true;
            window.showToast?.('🥟 Tilting Steamer! Watch the Dumpling Spill & Welcome to Lumina!', 'info');

            // Quick bucket jiggle before launching
            if (steamer) {
                steamer.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
                steamer.style.transform = 'scale(0.95) rotateX(10deg)';
            }

            setTimeout(() => {
                const targetY = targetSection ? targetSection.offsetTop - 20 : 1200;
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: targetY,
                        duration: 1.4,
                        ease: 'power2.inOut',
                        onUpdate: function () {
                            const prog = this.progress();
                            applySpillTransform(prog);
                        },
                        onComplete: () => {
                            isProgrammaticScroll = false;
                            applySpillTransform(1);
                        }
                    });
                } else {
                    gentleScrollTo(targetY, 1200);
                    isProgrammaticScroll = false;
                }
            }, 200);
        }
    };

    // 9) Interactive Drag & Spring Physics on Steamer
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    function startDrag(x, y) {
        if (!steamer) return;
        isDragging = true;
        startX = x - currentX;
        startY = y - currentY;
        steamer.style.animation = 'none';
        steamer.style.transition = 'none';
        steamer.style.cursor = 'grabbing';
    }

    function onDrag(x, y) {
        if (!isDragging || !steamer) return;

        currentX = x - startX;
        currentY = y - startY;

        const distance = Math.hypot(currentX, currentY);
        const rotX = -currentY * 0.14;
        const rotY = currentX * 0.16;
        const rotZ = currentX * 0.06;
        const scale = Math.max(0.90, 1 - distance * 0.0008);

        steamer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;

        // If dragged past threshold, trigger spill and reveal cafe
        if (distance > 120 || currentY > 90) {
            endDrag();
            window.luminaMotion.playCinematicSpill();
        }
    }

    function endDrag() {
        if (!isDragging || !steamer) return;
        isDragging = false;
        steamer.style.cursor = 'grab';

        steamer.style.transition = 'transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        steamer.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)';
        steamer.style.animation = 'floatBreathing 4s ease-in-out infinite';
        currentX = 0;
        currentY = 0;
    }

    if (steamer) {
        steamer.addEventListener('dragstart', (e) => e.preventDefault());
        steamer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startDrag(e.clientX, e.clientY);
        });
        window.addEventListener('mousemove', (e) => onDrag(e.clientX, e.clientY));
        window.addEventListener('mouseup', () => endDrag());

        steamer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        window.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length === 1) onDrag(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        window.addEventListener('touchend', () => endDrag());

        steamer.addEventListener('click', () => {
            if (Math.abs(currentX) < 15 && Math.abs(currentY) < 15) {
                window.luminaMotion.playCinematicSpill();
            }
        });
    }

    // 10) Petalyx-style Interactive 3-Atmospheres Loop Accordion
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

    // 11) Zero-Cost Stats Counters
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

    // 12) Smooth In-Page Anchor Links
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

    // 13) Bootstrap on DOMContentLoaded
    function init() {
        initWordSplit();
        initPetals();
        initSpatialTilt();
        initNavbarManager();
        initPinnedSpillTrigger();
        initLoopAccordion();
        initStatsObserver();
        initAnchorSmoothScroll();

        // Initial State
        applySpillTransform(0);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();