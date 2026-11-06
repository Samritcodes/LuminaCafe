/**
 * assets/js/three-scene.js
 * Mesmerizing 3D Coffee Experience Engine with Three.js
 * Features: Procedural 3D Cup, Saucer, Liquid with Latte Art Canvas Textures,
 * Dynamic Steam Particle Simulation, Orbiting Coffee Beans, Dynamic Lighting, and Parallax.
 */

class CoffeeSceneViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        // Drink presets
        this.drinkConfigs = {
            'caramel_macchiato': {
                name: 'Velvet Caramel Macchiato',
                price: 6.50,
                liquidColor: 0x935B32,
                foamColor: 0xEAD8B1,
                artType: 'caramel_drizzle',
                steamIntensity: 1.0,
                hasGelato: false,
                hasIce: false,
                description: 'Double espresso layered over vanilla bean oat milk with salted caramel drizzle.'
            },
            'matcha_latte': {
                name: 'Tokyo Matcha Zen Latte',
                price: 6.80,
                liquidColor: 0x557A46,
                foamColor: 0x8FBC8F,
                artType: 'heart',
                steamIntensity: 0.8,
                hasGelato: false,
                hasIce: false,
                description: 'Ceremonial Uji matcha whisked with silky almond foam and artisan latte art.'
            },
            'obsidian_espresso': {
                name: 'Midnight Obsidian Espresso',
                price: 4.20,
                liquidColor: 0x1E140F,
                foamColor: 0xBF8D58, // Tiger crema
                artType: 'crema',
                steamIntensity: 1.3,
                hasGelato: false,
                hasIce: false,
                description: 'Single-origin Ethiopian Yirgacheffe pulled at 9 bars of pressure with golden crema.'
            },
            'rose_affogato': {
                name: 'Rose Gold Affogato',
                price: 7.20,
                liquidColor: 0x2C1D11,
                foamColor: 0xD4A373,
                artType: 'gold_flakes',
                steamIntensity: 0.5,
                hasGelato: true,
                hasIce: false,
                description: 'Madagascar vanilla gelato drowned in hot ristretto, garnished with 24k gold leaf.'
            },
            'nitro_cold_brew': {
                name: 'Smoky Nitro Cold Brew',
                price: 5.90,
                liquidColor: 0x110D0A,
                foamColor: 0xDBC3A3,
                artType: 'nitro_crema',
                steamIntensity: 0.2,
                hasGelato: false,
                hasIce: true,
                description: '24-hour nitrogen cold infusion with velvety cascade microbubbles and ice.'
            }
        };

        this.currentDrinkKey = 'caramel_macchiato';
        this.isAutoRotating = true;
        this.isExploded = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationY = 0;
        this.targetRotationX = 0;

        this.init();
    }

    init() {
        // 1. Scene & Camera
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0C0B0E, 0.04);

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 100);
        this.camera.position.set(0, 3.8, 7.2);
        this.camera.lookAt(0, 0.8, 0);

        // 2. Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.15;
        this.container.appendChild(this.renderer.domElement);

        // 3. Orbit Controls (with automatic native fallback if CDN is offline)
        if (typeof THREE.OrbitControls !== 'undefined') {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't go too far under table
            this.controls.minDistance = 3.5;
            this.controls.maxDistance = 11.0;
            this.controls.target.set(0, 0.8, 0);
        } else {
            this.setupFallbackControls();
        }

        // 4. Lights
        this.setupLights();

        // 5. Cup, Saucer & Liquid Hierarchy
        this.cupGroup = new THREE.Group();
        this.scene.add(this.cupGroup);

        this.createSaucer();
        this.createCup();
        this.createLiquid();
        this.createSteamParticles();
        this.createOrbitingBeans();
        this.createPedestal();

        // 6. Listeners
        this.setupEvents();

        // 7. Render Loop
        this.clock = new THREE.Clock();
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    setupFallbackControls() {
        let isDragging = false;
        let prevX = 0;
        let prevY = 0;

        this.renderer.domElement.addEventListener('mousedown', (e) => {
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
            this.isAutoRotating = false;
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - prevX;
            const deltaY = e.clientY - prevY;
            prevX = e.clientX;
            prevY = e.clientY;

            this.cupGroup.rotation.y += deltaX * 0.01;
            this.cupGroup.rotation.x = Math.max(-0.4, Math.min(0.8, this.cupGroup.rotation.x + deltaY * 0.005));
        });

        // Touch support
        this.renderer.domElement.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                prevX = e.touches[0].clientX;
                prevY = e.touches[0].clientY;
                this.isAutoRotating = false;
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const deltaX = e.touches[0].clientX - prevX;
            const deltaY = e.touches[0].clientY - prevY;
            prevX = e.touches[0].clientX;
            prevY = e.touches[0].clientY;

            this.cupGroup.rotation.y += deltaX * 0.01;
            this.cupGroup.rotation.x = Math.max(-0.4, Math.min(0.8, this.cupGroup.rotation.x + deltaY * 0.005));
        }, { passive: true });

        // Wheel zoom
        this.renderer.domElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.camera.position.z = Math.max(3.8, Math.min(10.0, this.camera.position.z + e.deltaY * 0.005));
        }, { passive: false });
    }

    setupLights() {
        // Main Warm Spotlight
        this.mainSpot = new THREE.SpotLight(0xFFE6C7, 3.2);
        this.mainSpot.position.set(4, 9, 5);
        this.mainSpot.angle = Math.PI / 4;
        this.mainSpot.penumbra = 0.5;
        this.mainSpot.castShadow = true;
        this.mainSpot.shadow.mapSize.width = 1024;
        this.mainSpot.shadow.mapSize.height = 1024;
        this.mainSpot.shadow.bias = -0.001;
        this.scene.add(this.mainSpot);

        // Soft Warm Fill Light
        this.fillLight = new THREE.PointLight(0xE5B25D, 1.8, 20);
        this.fillLight.position.set(-5, 4, -3);
        this.scene.add(this.fillLight);

        // Rim/Back Light for gorgeous edge specular highlights
        this.rimLight = new THREE.DirectionalLight(0xD4AF37, 1.5);
        this.rimLight.position.set(0, 6, -6);
        this.scene.add(this.rimLight);

        // Ambient base
        this.ambientLight = new THREE.AmbientLight(0x2A2421, 1.2);
        this.scene.add(this.ambientLight);
    }

    createSaucer() {
        const saucerGroup = new THREE.Group();

        // Saucer plate geometry
        const points = [];
        points.push(new THREE.Vector2(0, 0));
        points.push(new THREE.Vector2(0.9, 0.02));
        points.push(new THREE.Vector2(1.8, 0.12));
        points.push(new THREE.Vector2(2.3, 0.28));
        points.push(new THREE.Vector2(2.4, 0.32));
        points.push(new THREE.Vector2(2.35, 0.35));
        points.push(new THREE.Vector2(2.2, 0.28));
        points.push(new THREE.Vector2(1.6, 0.1));
        points.push(new THREE.Vector2(0.8, 0.04));
        points.push(new THREE.Vector2(0, 0.02));

        const saucerGeo = new THREE.LatheGeometry(points, 64);
        this.saucerMat = new THREE.MeshStandardMaterial({
            color: 0x18181F, // Obsidian default
            roughness: 0.22,
            metalness: 0.15,
            clearcoat: 0.8,
            clearcoatRoughness: 0.1
        });

        this.saucerMesh = new THREE.Mesh(saucerGeo, this.saucerMat);
        this.saucerMesh.receiveShadow = true;
        this.saucerMesh.castShadow = true;
        saucerGroup.add(this.saucerMesh);

        // Gold rim ring on the saucer
        const goldRimGeo = new THREE.TorusGeometry(2.32, 0.025, 16, 64);
        goldRimGeo.rotateX(Math.PI / 2);
        goldRimGeo.translate(0, 0.33, 0);
        this.goldMat = new THREE.MeshStandardMaterial({
            color: 0xE5B25D,
            metalness: 0.92,
            roughness: 0.18
        });
        const saucerRim = new THREE.Mesh(goldRimGeo, this.goldMat);
        saucerGroup.add(saucerRim);

        this.saucerGroup = saucerGroup;
        this.cupGroup.add(saucerGroup);
    }

    createCup() {
        const cupParts = new THREE.Group();

        // Lathe curve for cup body
        const cupPoints = [];
        cupPoints.push(new THREE.Vector2(0.75, 0.05));  // Base bottom
        cupPoints.push(new THREE.Vector2(0.85, 0.08));  // Base edge
        cupPoints.push(new THREE.Vector2(0.9, 0.3));   // Lower curve
        cupPoints.push(new THREE.Vector2(1.15, 0.9));   // Mid swell
        cupPoints.push(new THREE.Vector2(1.45, 1.8));   // Upper flare
        cupPoints.push(new THREE.Vector2(1.5, 2.0));    // Lip outer
        cupPoints.push(new THREE.Vector2(1.46, 2.02));  // Lip curve
        cupPoints.push(new THREE.Vector2(1.42, 2.0));   // Lip inner
        cupPoints.push(new THREE.Vector2(1.36, 1.7));   // Inside wall
        cupPoints.push(new THREE.Vector2(1.05, 0.8));   // Inside taper
        cupPoints.push(new THREE.Vector2(0.8, 0.3));    // Inside floor
        cupPoints.push(new THREE.Vector2(0.0, 0.28));   // Inside center

        const cupGeo = new THREE.LatheGeometry(cupPoints, 64);
        this.cupMat = new THREE.MeshStandardMaterial({
            color: 0x18181F,
            roughness: 0.22,
            metalness: 0.12,
            clearcoat: 0.85,
            clearcoatRoughness: 0.12
        });

        this.cupMesh = new THREE.Mesh(cupGeo, this.cupMat);
        this.cupMesh.castShadow = true;
        this.cupMesh.receiveShadow = true;
        cupParts.add(this.cupMesh);

        // Gold rim along the top edge of cup
        const cupRimGeo = new THREE.TorusGeometry(1.46, 0.022, 16, 64);
        cupRimGeo.rotateX(Math.PI / 2);
        cupRimGeo.translate(0, 2.01, 0);
        const cupGoldRim = new THREE.Mesh(cupRimGeo, this.goldMat);
        cupParts.add(cupGoldRim);

        // Ergonomic Cup Handle
        const handleCurve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(1.15, 1.7, 0),
            new THREE.Vector3(2.35, 1.85, 0),
            new THREE.Vector3(2.2, 0.5, 0),
            new THREE.Vector3(0.95, 0.65, 0)
        );
        const handleGeo = new THREE.TubeGeometry(handleCurve, 40, 0.11, 16, false);
        this.handleMesh = new THREE.Mesh(handleGeo, this.cupMat);
        this.handleMesh.castShadow = true;
        cupParts.add(this.handleMesh);

        this.cupParts = cupParts;
        this.cupGroup.add(cupParts);
    }

    createLiquid() {
        this.liquidGroup = new THREE.Group();

        // Liquid surface circle
        const liquidGeo = new THREE.CylinderGeometry(1.38, 1.34, 0.08, 64);
        liquidGeo.translate(0, 1.78, 0);

        // Procedural Latte Art Canvas Texture
        this.latteArtTexture = this.generateLatteArtCanvas('caramel_drizzle');

        this.liquidMat = new THREE.MeshStandardMaterial({
            color: 0xEAD8B1,
            map: this.latteArtTexture,
            roughness: 0.45,
            metalness: 0.05
        });

        this.liquidMesh = new THREE.Mesh(liquidGeo, this.liquidMat);
        this.liquidMesh.receiveShadow = true;
        this.liquidGroup.add(this.liquidMesh);

        // Vanilla Gelato scoop for Affogato (hidden by default)
        const gelatoGeo = new THREE.DodecahedronGeometry(0.55, 3);
        // Deform vertices slightly for organic gelato texture
        const pos = gelatoGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const v = new THREE.Vector3().fromBufferAttribute(pos, i);
            v.multiplyScalar(1.0 + (Math.sin(v.x * 6) + Math.cos(v.y * 6)) * 0.06);
            pos.setXYZ(i, v.x, v.y, v.z);
        }
        gelatoGeo.computeVertexNormals();

        this.gelatoMat = new THREE.MeshStandardMaterial({
            color: 0xFFF8DC,
            roughness: 0.8,
            metalness: 0.02
        });
        this.gelatoMesh = new THREE.Mesh(gelatoGeo, this.gelatoMat);
        this.gelatoMesh.position.set(0, 2.05, 0);
        this.gelatoMesh.castShadow = true;
        this.gelatoMesh.visible = false;
        this.liquidGroup.add(this.gelatoMesh);

        // Ice cubes for Cold brew (hidden by default)
        this.iceCubes = [];
        const iceMat = new THREE.MeshPhysicalMaterial({
            color: 0xEEF5FF,
            transmission: 0.85,
            opacity: 0.9,
            transparent: true,
            roughness: 0.1,
            ior: 1.31
        });
        for (let i = 0; i < 3; i++) {
            const iceGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45);
            const ice = new THREE.Mesh(iceGeo, iceMat);
            ice.position.set((i - 1) * 0.4, 1.88, (i % 2 === 0 ? 0.2 : -0.2));
            ice.rotation.set(0.2 * i, 0.5 * i, 0.3 * i);
            ice.visible = false;
            this.iceCubes.push(ice);
            this.liquidGroup.add(ice);
        }

        this.cupGroup.add(this.liquidGroup);
    }

    generateLatteArtCanvas(artType) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const cx = 256;
        const cy = 256;

        if (artType === 'caramel_drizzle') {
            // Golden cream background
            const bgGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 250);
            bgGrad.addColorStop(0, '#FFF2D6');
            bgGrad.addColorStop(0.6, '#E0BA88');
            bgGrad.addColorStop(1, '#8A542E');
            ctx.fillStyle = bgGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 250, 0, Math.PI * 2);
            ctx.fill();

            // Caramel cross-hatch drizzle
            ctx.strokeStyle = '#663300';
            ctx.lineWidth = 9;
            ctx.lineCap = 'round';

            for (let i = -140; i <= 140; i += 36) {
                ctx.beginPath();
                ctx.moveTo(cx + i, cy - 140);
                ctx.bezierCurveTo(cx + i + 10, cy, cx + i - 10, cy + 60, cx + i, cy + 140);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(cx - 140, cy + i);
                ctx.bezierCurveTo(cx, cy + i + 10, cx + 60, cy + i - 10, cx + 140, cy + i);
                ctx.stroke();
            }

            // Concentric golden ring
            ctx.strokeStyle = '#D97706';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(cx, cy, 180, 0, Math.PI * 2);
            ctx.stroke();

        } else if (artType === 'heart') {
            // Matcha green or dark crema base
            const isMatcha = this.currentDrinkKey === 'matcha_latte';
            const baseGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 250);
            if (isMatcha) {
                baseGrad.addColorStop(0, '#86A789');
                baseGrad.addColorStop(0.7, '#4F6F52');
                baseGrad.addColorStop(1, '#2D432D');
            } else {
                baseGrad.addColorStop(0, '#D4A373');
                baseGrad.addColorStop(0.7, '#8C5A32');
                baseGrad.addColorStop(1, '#3B2211');
            }
            ctx.fillStyle = baseGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 250, 0, Math.PI * 2);
            ctx.fill();

            // Heart latte art
            ctx.fillStyle = '#FFFFFF';
            ctx.save();
            ctx.translate(cx, cy - 10);
            ctx.beginPath();
            ctx.moveTo(0, 50);
            ctx.bezierCurveTo(-70, -30, -90, -110, 0, -110);
            ctx.bezierCurveTo(90, -110, 70, -30, 0, 50);
            ctx.fill();

            // Drag stroke through the center of heart
            ctx.strokeStyle = isMatcha ? '#3B533B' : '#73411F';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, -120);
            ctx.lineTo(0, 70);
            ctx.stroke();
            ctx.restore();

        } else if (artType === 'crema') {
            // Dark espresso with bronze tiger swirl crema
            const cremaGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 250);
            cremaGrad.addColorStop(0, '#D49B5B');
            cremaGrad.addColorStop(0.4, '#A7652E');
            cremaGrad.addColorStop(0.8, '#593215');
            cremaGrad.addColorStop(1, '#1A0E06');
            ctx.fillStyle = cremaGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 250, 0, Math.PI * 2);
            ctx.fill();

            // Tiger swirl spots
            for (let i = 0; i < 40; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 30 + Math.random() * 190;
                const x = cx + Math.cos(angle) * dist;
                const y = cy + Math.sin(angle) * dist;
                const r = 4 + Math.random() * 12;

                ctx.fillStyle = Math.random() > 0.4 ? 'rgba(235, 185, 125, 0.45)' : 'rgba(70, 35, 15, 0.5)';
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (artType === 'gold_flakes') {
            // Deep espresso with golden glitter particles
            const affogatoGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 250);
            affogatoGrad.addColorStop(0, '#F5EBE0');
            affogatoGrad.addColorStop(0.3, '#8C5835');
            affogatoGrad.addColorStop(1, '#2B170B');
            ctx.fillStyle = affogatoGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 250, 0, Math.PI * 2);
            ctx.fill();

            // Gold speckles
            for (let i = 0; i < 60; i++) {
                const a = Math.random() * Math.PI * 2;
                const d = 40 + Math.random() * 180;
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2.5 + Math.random() * 3.5, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Nitro microfoam
            const nitroGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 250);
            nitroGrad.addColorStop(0, '#E6D2B5');
            nitroGrad.addColorStop(0.7, '#A07855');
            nitroGrad.addColorStop(1, '#2E1C10');
            ctx.fillStyle = nitroGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 250, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        return texture;
    }

    createSteamParticles() {
        // High quality dynamic steam simulation with 130 particles
        this.particleCount = 130;
        const geom = new THREE.BufferGeometry();
        this.particlePositions = new Float32Array(this.particleCount * 3);
        this.particleSpeeds = [];

        // Procedural soft circle sprite for steam
        const steamCanvas = document.createElement('canvas');
        steamCanvas.width = 64;
        steamCanvas.height = 64;
        const sCtx = steamCanvas.getContext('2d');
        const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
        sGrad.addColorStop(0, 'rgba(255, 245, 230, 0.7)');
        sGrad.addColorStop(0.4, 'rgba(240, 225, 200, 0.3)');
        sGrad.addColorStop(1, 'rgba(240, 225, 200, 0)');
        sCtx.fillStyle = sGrad;
        sCtx.fillRect(0, 0, 64, 64);
        const steamTexture = new THREE.CanvasTexture(steamCanvas);

        for (let i = 0; i < this.particleCount; i++) {
            this.resetParticle(i, true);
        }

        geom.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

        this.steamMaterial = new THREE.PointsMaterial({
            size: 0.65,
            map: steamTexture,
            transparent: true,
            opacity: 0.45,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.steamParticles = new THREE.Points(geom, this.steamMaterial);
        this.cupGroup.add(this.steamParticles);
    }

    resetParticle(i, initial = false) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.75;
        const idx = i * 3;

        this.particlePositions[idx] = Math.cos(angle) * radius;
        this.particlePositions[idx + 1] = initial ? 1.9 + Math.random() * 2.8 : 1.85;
        this.particlePositions[idx + 2] = Math.sin(angle) * radius;

        this.particleSpeeds[i] = {
            vy: 0.018 + Math.random() * 0.022,
            vx: (Math.random() - 0.5) * 0.008,
            vz: (Math.random() - 0.5) * 0.008,
            swirlSpeed: 0.8 + Math.random() * 1.5,
            age: initial ? Math.random() * 100 : 0
        };
    }

    createOrbitingBeans() {
        this.beansGroup = new THREE.Group();
        this.beans = [];

        // Coffee Bean procedural geometry: scaled sphere with an indented crease
        const beanGeo = new THREE.SphereGeometry(0.18, 16, 16);
        beanGeo.scale(1.3, 0.75, 0.85);

        const beanMat = new THREE.MeshStandardMaterial({
            color: 0x361E13, // Rich roasted bean brown
            roughness: 0.4,
            metalness: 0.1
        });

        const beanCount = 10;
        for (let i = 0; i < beanCount; i++) {
            const bean = new THREE.Mesh(beanGeo, beanMat);
            bean.castShadow = true;

            const radius = 2.8 + (i % 3) * 0.55;
            const angle = (i / beanCount) * Math.PI * 2;
            const height = 0.4 + (i % 4) * 0.6;

            bean.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
            bean.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

            this.beans.push({
                mesh: bean,
                radius: radius,
                angle: angle,
                speed: 0.25 + (i % 3) * 0.1,
                rotSpeedX: 0.015,
                rotSpeedY: 0.02
            });

            this.beansGroup.add(bean);
        }

        this.cupGroup.add(this.beansGroup);
    }

    createPedestal() {
        // Luxury dark marble/slate cafe pedestal ring
        const pedestalGeo = new THREE.CylinderGeometry(2.8, 3.2, 0.25, 64);
        pedestalGeo.translate(0, -0.15, 0);

        const pedestalMat = new THREE.MeshStandardMaterial({
            color: 0x111014,
            roughness: 0.5,
            metalness: 0.2
        });

        const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
        pedestal.receiveShadow = true;
        this.scene.add(pedestal);

        // Subtle ambient ring glow
        const ringGeo = new THREE.RingGeometry(2.9, 3.05, 64);
        ringGeo.rotateX(-Math.PI / 2);
        ringGeo.translate(0, -0.02, 0);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xE5B25D,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.35
        });
        const glowRing = new THREE.Mesh(ringGeo, ringMat);
        this.scene.add(glowRing);
    }

    setupEvents() {
        window.addEventListener('resize', () => {
            if (!this.container) return;
            this.width = this.container.clientWidth;
            this.height = this.container.clientHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });

        // Mouse Parallax for subtle dynamic tracking
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouseX = ((e.clientX - rect.left) / this.width) * 2 - 1;
            this.mouseY = -(((e.clientY - rect.top) / this.height) * 2 - 1);
        });
    }

    switchDrink(drinkKey) {
        if (!this.drinkConfigs[drinkKey]) return;
        this.currentDrinkKey = drinkKey;
        const cfg = this.drinkConfigs[drinkKey];

        // Update liquid latte art texture
        this.latteArtTexture.dispose();
        this.latteArtTexture = this.generateLatteArtCanvas(cfg.artType);
        this.liquidMat.map = this.latteArtTexture;
        this.liquidMat.needsUpdate = true;

        // Toggle special items
        this.gelatoMesh.visible = !!cfg.hasGelato;
        this.iceCubes.forEach(cube => cube.visible = !!cfg.hasIce);

        // Adjust steam opacity
        this.steamMaterial.opacity = 0.45 * cfg.steamIntensity;

        // Subtle cup rotation pulse to celebrate change
        this.cupGroup.rotation.y += 0.5;

        // Update UI detail cards if available
        const nameEl = document.getElementById('viewer-drink-name');
        const priceEl = document.getElementById('viewer-drink-price');
        const descEl = document.getElementById('viewer-drink-desc');
        if (nameEl) nameEl.textContent = cfg.name;
        if (priceEl) priceEl.textContent = '$' + cfg.price.toFixed(2);
        if (descEl) descEl.textContent = cfg.description;
    }

    changeCupColor(colorHex, finish = 'ceramic') {
        const color = parseInt(colorHex.replace('#', '0x'), 16);
        this.cupMat.color.setHex(color);
        this.saucerMat.color.setHex(color);

        if (finish === 'matte') {
            this.cupMat.roughness = 0.75;
            this.cupMat.metalness = 0.05;
            this.cupMat.clearcoat = 0.0;
        } else if (finish === 'metallic') {
            this.cupMat.roughness = 0.25;
            this.cupMat.metalness = 0.85;
            this.cupMat.clearcoat = 0.9;
        } else {
            // Glossy ceramic
            this.cupMat.roughness = 0.22;
            this.cupMat.metalness = 0.12;
            this.cupMat.clearcoat = 0.85;
        }

        this.cupMat.needsUpdate = true;
        this.saucerMat.needsUpdate = true;
    }

    setLightingMode(mode) {
        if (mode === 'morning') {
            this.mainSpot.color.setHex(0xFFF1DC);
            this.mainSpot.intensity = 3.5;
            this.fillLight.color.setHex(0xBAE6FD); // Sky blue fill
            this.scene.fog.color.setHex(0x131722);
        } else if (mode === 'sunset') {
            this.mainSpot.color.setHex(0xFF9E54);
            this.mainSpot.intensity = 3.8;
            this.fillLight.color.setHex(0xE5B25D);
            this.scene.fog.color.setHex(0x1A0E0C);
        } else if (mode === 'midnight') {
            this.mainSpot.color.setHex(0xFCE1A8);
            this.mainSpot.intensity = 2.6;
            this.fillLight.color.setHex(0x10B981); // Emerald accent
            this.scene.fog.color.setHex(0x0C0B0E);
        }
    }

    toggleAutoRotate() {
        this.isAutoRotating = !this.isAutoRotating;
        return this.isAutoRotating;
    }

    toggleExplodeView() {
        this.isExploded = !this.isExploded;
        const targetCupY = this.isExploded ? 0.9 : 0;
        const targetLiquidY = this.isExploded ? 1.6 : 0;

        // Smoothly animate displacement
        this.cupParts.position.y = targetCupY;
        this.liquidGroup.position.y = targetLiquidY;
        return this.isExploded;
    }

    resetCamera() {
        if (this.controls) {
            this.controls.reset();
        }
        this.camera.position.set(0, 3.8, 7.2);
        this.camera.lookAt(0, 0.8, 0);
    }

    animate() {
        requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();

        // 1. Cup Auto-Rotation
        if (this.isAutoRotating) {
            this.cupGroup.rotation.y += 0.007;
        }

        // 2. Steam Particles Physics
        const posAttr = this.steamParticles.geometry.attributes.position;
        const currentDrink = this.drinkConfigs[this.currentDrinkKey];

        for (let i = 0; i < this.particleCount; i++) {
            const idx = i * 3;
            const spd = this.particleSpeeds[i];
            spd.age += 1;

            // Rise upwards with soft curl
            this.particlePositions[idx + 1] += spd.vy;
            this.particlePositions[idx] += Math.sin(elapsedTime * spd.swirlSpeed + i) * 0.004 + spd.vx;
            this.particlePositions[idx + 2] += Math.cos(elapsedTime * spd.swirlSpeed + i) * 0.004 + spd.vz;

            // Reset particle when it evaporates or reaches top height
            if (this.particlePositions[idx + 1] > 4.6 || spd.age > 160) {
                this.resetParticle(i);
            }
        }
        posAttr.needsUpdate = true;

        // 3. Orbiting Coffee Beans
        this.beans.forEach(bean => {
            bean.angle += bean.speed * delta;
            bean.mesh.position.x = Math.cos(bean.angle) * bean.radius;
            bean.mesh.position.z = Math.sin(bean.angle) * bean.radius;
            bean.mesh.position.y += Math.sin(elapsedTime * 2 + bean.angle) * 0.002;
            bean.mesh.rotation.x += bean.rotSpeedX;
            bean.mesh.rotation.y += bean.rotSpeedY;
        });

        // 4. Parallax Camera Shift
        if (!this.controls || !this.controls.state || this.controls.state === -1) {
            this.camera.position.x += (this.mouseX * 0.8 - this.camera.position.x * 0.1) * 0.05;
        }

        if (this.controls) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Global viewer instance
window.coffeeViewer = null;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('canvas-3d-container')) {
        window.coffeeViewer = new CoffeeSceneViewer('canvas-3d-container');
    }
});
