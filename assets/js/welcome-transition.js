/**
 * assets/js/welcome-transition.js - Lumina Café & Kitchen
 * High-Fashion Cinematic Food Commercial Hero Stage
 * 4-Stage Scroll-Driven Dumpling Spill Engine with Hardware-Accelerated 3D Physics
 */

(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1) Split Words & Cinematic Title Entrance
    function initCinematicHeader() {
        const title = document.querySelector('.cinematic-main-title');
        const eyebrow = document.querySelector('.cinematic-eyebrow');
        const sub = document.querySelector('.cinematic-main-sub');
        if (!title || reduceMotion) return;

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(
                [eyebrow, title, sub],
                { opacity: 0, y: 24, filter: 'blur(8px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    stagger: 0.12,
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

    // 6) MASTER 4-STAGE CINEMATIC DUMPLING SPILL ENGINE
    const heroSection = document.getElementById('hero-sanctuary');
    const visualLayer = document.getElementById('heroVisualLayer');
    const cinematicHeader = document.getElementById('cinematicHeader');
    const steamer = document.getElementById('welcome-steamer-element');
    const lid = document.getElementById('steamer-lid-element');
    const steam = document.getElementById('steamerSteam');
    const floorShadow = document.getElementById('steamerFloorShadow');
    const indicator = document.querySelector('.graphic-scroll-indicator');
    const hudPills = document.querySelectorAll('.graphic-motion-hud .hud-pill');
    const sauce = document.getElementById('spillSauce');
    const particleLayer = document.getElementById('dumplingParticleLayer');
    const targetSection = document.getElementById('atmospheres-loop');

    // 8 Authentic Studio Food Transparent PNG Cutouts
    // Each with its own trajectory, lift arc, 3D rotation, scale, and z-depth
    const particleRecipes = [
        {
            dishId: 17,
            name: 'Truffle Xiao Long Bao',
            price: 16.50,
            image: 'assets/images/dumpling_fly_xlb.png',
            x: -0.42,
            y: -0.28,
            rotate: -240,
            delay: 0.00,
            scale: 1.15,
            depth: 180
        },
        {
            dishId: 18,
            name: 'Crisp Golden Gyoza',
            price: 14.80,
            image: 'assets/images/dumpling_fly_gyoza.png',
            x: 0.40,
            y: -0.32,
            rotate: 260,
            delay: 0.05,
            scale: 1.12,
            depth: 170
        },
        {
            dishId: 19,
            name: 'Sichuan Chili Oil Wonton',
            price: 15.50,
            image: 'assets/images/dumpling_fly_wonton.png',
            x: -0.48,
            y: 0.06,
            rotate: -340,
            delay: 0.10,
            scale: 1.05,
            depth: 120
        },
        {
            dishId: 20,
            name: 'Steamed Wild Shiitake Bao',
            price: 13.80,
            image: 'assets/images/dumpling_fly_bao.png',
            x: 0.45,
            y: 0.10,
            rotate: 210,
            delay: 0.15,
            scale: 1.20,
            depth: 190
        },
        {
            dishId: 17,
            name: 'Artisan Soup Dumpling',
            price: 16.50,
            image: 'assets/images/dumpling_piece_5.png',
            x: -0.16,
            y: -0.46,
            rotate: 190,
            delay: 0.20,
            scale: 0.85,
            depth: -60
        },
        {
            dishId: 18,
            name: 'Pan-Fried Dumpling',
            price: 14.80,
            image: 'assets/images/dumpling_piece_12.png',
            x: 0.32,
            y: 0.36,
            rotate: -210,
            delay: 0.25,
            scale: 1.10,
            depth: 140
        },
        {
            dishId: 19,
            name: 'Silken Dumpling',
            price: 15.50,
            image: 'assets/images/dumpling_piece_20.png',
            x: -0.35,
            y: 0.38,
            rotate: 180,
            delay: 0.28,
            scale: 1.08,
            depth: 130
        },
        {
            dishId: 17,
            name: 'Truffle Xiao Long Bao',
            price: 16.50,
            image: 'assets/images/dumpling_fly_xlb.png',
            x: 0.50,
            y: -0.12,
            rotate: 360,
            delay: 0.32,
            scale: 0.95,
            depth: 70
        }
    ];

    const dumplingParticles = [];

    // Cache viewport dimensions to avoid layout reflow queries during scroll
    let cachedViewportWidth = Math.min(window.innerWidth * 0.94, 1150);
    let cachedViewportHeight = Math.min(window.innerHeight * 0.82, 750);

    window.addEventListener('resize', () => {
        cachedViewportWidth = Math.min(window.innerWidth * 0.94, 1150);
        cachedViewportHeight = Math.min(window.innerHeight * 0.82, 750);
    }, { passive: true });

    function buildDumplingParticles() {
        if (!particleLayer || dumplingParticles.length) return;
        const fragment = document.createDocumentFragment();
        particleRecipes.forEach((recipe, index) => {
            const piece = document.createElement('img');
            piece.className = 'dumpling-particle';
            piece.src = recipe.image;
            piece.alt = recipe.name;
            piece.title = `${recipe.name} • Click to add to tray!`;
            piece.draggable = false;
            piece.dataset.index = String(index);

            // Interactive micro-interaction: catching a flying dumpling adds it to the cart
            piece.addEventListener('click', (e) => {
                e.stopPropagation();
                window.showToast?.(`🥟 Caught a ${recipe.name}! Added to your tray.`, 'success');
                if (window.cafeCart && recipe.dishId) {
                    window.cafeCart.addItem({
                        id: recipe.dishId,
                        name: recipe.name,
                        price: recipe.price,
                        image: recipe.image
                    });
                }
            });

            fragment.appendChild(piece);
            dumplingParticles.push({ element: piece, recipe });
        });
        particleLayer.appendChild(fragment);
    }

    function updateDumplingParticles(progress) {
        if (!dumplingParticles.length) return;
        const width = cachedViewportWidth;
        const height = cachedViewportHeight;

        dumplingParticles.forEach(({ element, recipe }) => {
            if (progress <= recipe.delay) {
                element.style.opacity = '0';
                element.style.pointerEvents = 'none';
                element.style.transform = 'translate3d(-50%, -50%, 0) scale(0.2)';
                return;
            }

            const local = Math.max(0, Math.min(1, (progress - recipe.delay) / (1 - recipe.delay)));
            
            // 1. Initial parabolic lift arc out of the basket followed by outward spill trajectory
            const arc = Math.sin(local * Math.PI) * 140;
            const x = (recipe.x * width * local).toFixed(1);
            const y = (recipe.y * height * local - arc + (local * local * 115)).toFixed(1);
            const rotation = (recipe.rotate * local).toFixed(1);
            const scale = ((0.28 + local * 0.85) * recipe.scale).toFixed(3);
            
            // Fade out smoothly towards stage 4
            const opacity = (Math.min(1, local * 4.2) * (progress > 0.88 ? Math.max(0, (1 - progress) / 0.12) : 1)).toFixed(3);
            const depth = (recipe.depth * Math.sin(local * Math.PI)).toFixed(1);

            element.style.opacity = opacity;
            element.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${depth}px) rotate(${rotation}deg) scale(${scale})`;
            element.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
        });
    }

    let currentProgress = 0;
    let confettiFired = false;
    let isProgrammaticScroll = false;
    let pinScrollTrigger = null;

    // Apply exact spatial 3D transform across the 4 stages [0.0 -> 1.0]
    function applySpillTransform(progress) {
        currentProgress = Math.min(1, Math.max(0, progress));
        updateDumplingParticles(currentProgress);

        // Update HUD pill active state
        let activeStage = 0;
        if (currentProgress >= 0.78) {
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

        // Continuous Background Color Morphing across Stages
        if (visualLayer) {
            if (currentProgress < 0.32) {
                // Initial Burnt Terracotta
                visualLayer.style.background = 'radial-gradient(circle at 50% 50%, #B45309 0%, #7C2D12 50%, #451A03 100%)';
            } else if (currentProgress < 0.72) {
                // The Explosive Spill Warm Amber Saffron
                visualLayer.style.background = 'radial-gradient(circle at 50% 50%, #D97706 0%, #C25E00 45%, #78350F 100%)';
            } else if (currentProgress < 0.88) {
                // Dramatic Atmospheric Transition
                visualLayer.style.background = 'radial-gradient(circle at 50% 50%, #44403C 0%, #1C1917 55%, #0C0A09 100%)';
            } else {
                // Reveal Café Warm Luminous Architectural Cream
                visualLayer.style.background = 'radial-gradient(circle at 50% 50%, #FFFDF8 0%, #FAF8F5 55%, #F5F2EB 100%)';
            }
        }

        if (currentProgress <= 0.02) {
            // Stage 0: 100% Upright Restored Steamer Basket
            if (steamer) {
                steamer.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg) scale(1)';
                steamer.style.opacity = '1';
                steamer.style.animation = 'floatBreathing 4.5s ease-in-out infinite';
            }
            if (lid) {
                lid.style.transform = 'none';
                lid.style.opacity = '1';
            }
            if (steam) steam.style.opacity = '1';
            if (floorShadow) {
                floorShadow.style.transform = 'translateX(-50%) scale(1)';
                floorShadow.style.opacity = '1';
            }
            if (cinematicHeader) {
                cinematicHeader.style.transform = 'translateX(-50%)';
                cinematicHeader.style.opacity = '1';
            }
            if (indicator) indicator.style.opacity = '1';

            dumplingParticles.forEach(({ element }) => {
                element.style.opacity = '0';
                element.style.pointerEvents = 'none';
                element.style.transform = 'translate3d(-50%, -50%, 0) scale(0.2)';
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

        // Fade out initial editorial title gently as scroll begins
        if (cinematicHeader) {
            const headOp = Math.max(0, 1 - currentProgress * 3.2);
            cinematicHeader.style.opacity = headOp;
            cinematicHeader.style.transform = `translateX(-50%) translateY(${-currentProgress * 65}px)`;
        }
        if (indicator) {
            indicator.style.opacity = Math.max(0, 1 - currentProgress * 4);
        }

        // STAGE 1 & 2: Steamer Tilts in 3D & Lid Catapults Off
        const p1 = Math.min(1, currentProgress / 0.40);
        if (steamer) {
            const tiltX = 68 * currentProgress;
            const tiltZ = -24 * currentProgress;
            const posY = currentProgress * 260;
            const scale = 1 + currentProgress * 0.12;
            const op = currentProgress > 0.82 ? Math.max(0, 1 - (currentProgress - 0.82) * 4.5) : 1;
            steamer.style.transform = `translate3d(0, ${posY}px, 0) rotateX(${tiltX}deg) rotateZ(${tiltZ}deg) scale(${scale})`;
            steamer.style.opacity = op;
        }

        if (floorShadow) {
            const shadowX = currentProgress * 60;
            const shadowScale = Math.max(0.4, 1 - currentProgress * 0.5);
            floorShadow.style.transform = `translateX(calc(-50% + ${shadowX}px)) scale(${shadowScale})`;
            floorShadow.style.opacity = Math.max(0, 1 - currentProgress * 1.4);
        }

        if (lid) {
            const lidX = p1 * 260;
            const lidY = -p1 * 240;
            const lidRot = p1 * 75;
            lid.style.transform = `translate3d(${lidX}px, ${lidY}px, 140px) rotate(${lidRot}deg) rotateX(${p1 * 40}deg)`;
            lid.style.opacity = Math.max(0, 1 - p1 * 1.8);
        }

        if (steam) {
            steam.style.opacity = Math.max(0, 1 - currentProgress * 2.5);
        }

        // STAGE 3: THE BIG DUMPLING SPILL ACCENTS
        if (currentProgress >= 0.35 && currentProgress <= 0.88) {
            const spillP = (currentProgress - 0.35) / 0.50;
            
            // Chili sauce dish splash down to the floor
            if (sauce) {
                const sauceY = spillP * 160;
                const sauceS = 0.4 + spillP * 0.75;
                sauce.style.transform = `translate3d(0, ${sauceY}px, 50px) scale(${sauceS})`;
                sauce.style.opacity = Math.min(1, spillP * 2.5) * (currentProgress > 0.82 ? Math.max(0, 1 - (currentProgress - 0.82) * 4) : 1);
            }

            // Trigger Golden Sesame & Chili Flake Confetti Burst
            if (currentProgress > 0.48 && !confettiFired && typeof confetti === 'function') {
                confettiFired = true;
                confetti({
                    particleCount: 40,
                    spread: 80,
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
                const progress = Math.min(1, Math.max(0, scrollY / 850));
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
            end: '+=1100',
            pin: true,
            scrub: 0.7,
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
                const pinMid = pinScrollTrigger ? pinScrollTrigger.start + 580 : 580;
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: pinMid,
                        duration: 0.9,
                        ease: 'power2.inOut',
                        onUpdate: () => applySpillTransform(0.55),
                        onComplete: () => {
                            isProgrammaticScroll = false;
                            applySpillTransform(0.55);
                        }
                    });
                } else {
                    gentleScrollTo(pinMid, 800);
                    applySpillTransform(0.55);
                    isProgrammaticScroll = false;
                }
            } else if (stageIndex === 2) {
                // Reveal the Full Café Platform
                const targetY = targetSection ? targetSection.offsetTop - 40 : 1300;
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

        // Play the complete cinematic slow-motion spill sequence from 0 to 1
        playCinematicSpill: function () {
            isProgrammaticScroll = true;
            window.showToast?.('🥟 The Dumpling Spill Unleashed! Welcome to Lumina.', 'info');

            // Quick bucket jiggle before launching
            if (steamer) {
                steamer.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
                steamer.style.transform = 'scale(0.96) rotateX(8deg)';
            }

            setTimeout(() => {
                const targetY = targetSection ? targetSection.offsetTop - 20 : 1300;
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: targetY,
                        duration: 1.6,
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
                    gentleScrollTo(targetY, 1400);
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
        steamer.style.animation = 'floatBreathing 4.5s ease-in-out infinite';
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
        buildDumplingParticles();
        initCinematicHeader();
        initPetals();
        initSpatialTilt();
        initNavbarManager();
        initPinnedSpillTrigger();
        initLoopAccordion();
        initStatsObserver();
        initAnchorSmoothScroll();

        // Initial Restored State
        applySpillTransform(0);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
