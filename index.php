<?php
// index.php - Lumina Café & Kitchen Luxury Light Scrollytelling Experience
$pageTitle = "Lumina Café & Kitchen | Work, Brunch & Dining Sanctuary";
$activeNav = "home";

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

// Fetch top signature food & drink items from DB including Dim Sum
$signatureItems = $pdo->query("SELECT * FROM menu_items WHERE id IN (17, 18, 19, 20, 1, 8, 7, 11) ORDER BY CASE WHEN category = 'Dim Sum & Dumplings' THEN 1 ELSE 2 END, id ASC LIMIT 8")->fetchAll();

// Fetch mini floor radar tables
$radarTables = $pdo->query("SELECT * FROM cafe_tables ORDER BY zone ASC, table_id ASC LIMIT 8")->fetchAll();

// Fetch reviews
$reviews = $pdo->query("SELECT * FROM reviews ORDER BY id DESC LIMIT 6")->fetchAll();

include __DIR__ . '/includes/header.php';
?>

<!-- Full-Screen High-Fashion Graphic Hero Stage (Matching Reference Site Architecture) -->
<section id="hero-sanctuary" class="graphic-hero-viewport" data-bg-color="#8C350F">
    <!-- Fixed Visual Background Layer with Radial Vignette -->
    <div class="fixed-visual-layer" id="heroVisualLayer"></div>
    <div class="hero-vignette-overlay"></div>

    <!-- Top Floating Ambient Elements -->
    <div class="petals-layer" id="welcomePetals"></div>

    <!-- Top Graphic Status Bar -->
    <div class="graphic-hero-header container flex items-center justify-between relative z-30 pt-6 px-4 sm:px-8">
        <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md text-amber-200 border border-amber-400/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Open Daily &bull; 7:00 AM – 11:00 PM &bull; All-Day Sanctuary
            </span>
        </div>
        <!-- Sunlight Temperature Switcher -->
        <div class="hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full shadow-lg">
            <span class="text-[10px] font-bold text-amber-200/80 uppercase tracking-widest mr-1">Sunlight:</span>
            <button class="solar-time-pill" onclick="window.setSolarHorizon('morning', this)">🌅 Morning</button>
            <button class="solar-time-pill active" onclick="window.setSolarHorizon('noon', this)">☀️ Midday</button>
            <button class="solar-time-pill" onclick="window.setSolarHorizon('twilight', this)">🌇 Twilight</button>
        </div>
    </div>

    <!-- Main Graphic Design Canvas Stage -->
    <div class="graphic-stage-container" id="graphicStageContainer">
        
        <!-- Left Editorial Column (Magazine High-Fashion Typography) -->
        <div class="graphic-editorial-col left-col">
            <span class="editorial-badge">ARTISAN DIM SUM &bull; WORK &bull; BRUNCH</span>
            <h1 class="editorial-title font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.02] tracking-tight drop-shadow-md">
                Steamed to <br>
                <span class="italic text-amber-300">Perfection.</span>
            </h1>
            <p class="editorial-desc text-stone-200 text-xs sm:text-sm max-w-sm leading-relaxed mt-3 drop-shadow-sm">
                Organic Berkshire pork &amp; molten black truffle broth, hand-folded hourly in traditional bamboo steamers. Crafted for unhurried dining and deep work.
            </p>
            <div class="editorial-pricing flex items-center gap-4 mt-5">
                <div class="price-callout text-white font-bold text-3xl font-heading drop-shadow-sm">$16.50</div>
                <div class="text-[11px] text-amber-200/90 font-medium border-l border-white/20 pl-3">
                    Fresh Bamboo Steamer &bull; 4 pcs<br>Aged Chinkiang Vinegar &amp; Truffle Broth
                </div>
            </div>
            <div class="editorial-actions flex flex-wrap items-center gap-3 mt-6">
                <!-- Direct Graphic Spill Trigger Button -->
                <button type="button" onclick="window.luminaMotion.playCinematicSpill()" class="btn-primary bg-amber-500 hover:bg-amber-400 text-stone-900 border-none font-extrabold text-xs py-3.5 px-6 shadow-2xl flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all">
                    <span class="text-base">💥</span>
                    <span>Spill Steamer &amp; Reveal Café</span>
                </button>
                <button onclick="window.cafeCart.addItem({id: 17, name: 'Truffle Xiao Long Bao', price: 16.50, image: 'assets/images/dumpling_xiao_long_bao.jpg'})" class="btn-secondary bg-white/10 hover:bg-white/25 text-white border-white/30 text-xs py-3.5 px-5 backdrop-blur-md flex items-center gap-1.5">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add to Order Tray
                </button>
            </div>
        </div>

        <!-- Centerpiece Giant Steamer Bucket (State: MAIN - Exact Equivalent of Reference Site Centerpiece) -->
        <div class="steamer-centerpiece-stage" id="steamerCenterpieceStage">
            <div class="steamer-glow-aura"></div>

            <!-- Rising Fragrant Steam Wisps -->
            <div class="steamer-steam" id="steamerSteam">
                <span class="steam-wisp wisp-1"></span>
                <span class="steam-wisp wisp-2"></span>
                <span class="steam-wisp wisp-3"></span>
            </div>

            <!-- The Massive Bamboo Steamer Basket -->
            <div id="welcome-steamer-element" class="steamer-main-bucket state-main" title="Scroll down, drag, or click to tilt and spill!">
                <div class="steamer-bamboo-weave"></div>
                <div class="steamer-rim-ring"></div>
                <img src="assets/images/steamer_dumplings.jpg" alt="Artisan Bamboo Steamer Filled with Handmade Dumplings" class="w-full h-full object-cover rounded-full pointer-events-none select-none shadow-2xl">
                <!-- Bamboo Brass Plate Badge -->
                <div class="steamer-brass-badge">
                    <span>🥟 CHEF'S DUMPLING BUCKET</span>
                </div>
            </div>

            <!-- Bamboo Lid that flips/flies on scroll -->
            <div id="steamer-lid-element" class="steamer-flying-lid">
                <div class="steamer-lid-handle"></div>
            </div>
        </div>

        <!-- Right Sanctuary Column (Amenities & Quality Callouts) -->
        <div class="graphic-editorial-col right-col hidden lg:flex flex-col gap-4">
            <div class="sanctuary-feature-card">
                <div class="w-10 h-10 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center border border-white/10 shadow-sm">
                    <i data-lucide="wifi" class="w-5 h-5"></i>
                </div>
                <div>
                    <div class="text-xs font-bold text-white">1 Gbps Dedicated Fiber</div>
                    <div class="text-[11px] text-stone-300">Ultra-low latency for video &amp; coding</div>
                </div>
            </div>
            <div class="sanctuary-feature-card">
                <div class="w-10 h-10 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center border border-white/10 shadow-sm">
                    <i data-lucide="zap" class="w-5 h-5"></i>
                </div>
                <div>
                    <div class="text-xs font-bold text-white">Dual AC &amp; USB-C Outlets</div>
                    <div class="text-[11px] text-stone-300">Equipped at every single table</div>
                </div>
            </div>
            <div class="sanctuary-feature-card">
                <div class="w-10 h-10 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center border border-white/10 shadow-sm">
                    <i data-lucide="sun" class="w-5 h-5"></i>
                </div>
                <div>
                    <div class="text-xs font-bold text-white">Natural Light Botanical Atrium</div>
                    <div class="text-[11px] text-stone-300">Glass skylights &amp; living ficus trees</div>
                </div>
            </div>
        </div>

        <!-- Corner Dish Preview (State: PREVIEW - Exact Equivalent of Jacket 1 in Reference Site) -->
        <div class="corner-dish-preview state-preview" id="cornerPreview" onclick="window.luminaMotion.jumpToStage(1)" title="Next Discovery: Crisp Golden Gyoza &bull; Click to Spill!">
            <img src="assets/images/dumpling_gyoza.jpg" alt="Next: Crisp Golden Gyoza" class="w-full h-full object-cover rounded-full shadow-2xl">
            <div class="preview-hover-tag">
                <span class="text-[10px] font-bold text-white uppercase tracking-wider">NEXT &bull; CRISP GYOZA $14.80</span>
            </div>
        </div>

        <!-- Spilling Dumpling Debris & Flight Cards (Explodes across screen on scroll) -->
        <div class="spill-flight-cluster" id="spillFlightCluster">
            <!-- Flight Card 1: Truffle Xiao Long Bao (Top Left) -->
            <div class="dumpling-flight-card spill-card-1">
                <img src="assets/images/dumpling_xiao_long_bao.jpg" alt="Truffle Xiao Long Bao" class="spill-thumb">
                <div class="text-left flex-1 min-w-0">
                    <div class="text-xs font-bold text-stone-900 truncate">Truffle Xiao Long Bao</div>
                    <div class="text-[11px] text-amber-700 font-semibold">$16.50 &bull; Molten Broth</div>
                </div>
                <button type="button" onclick="window.cafeCart.addItem({id: 17, name: 'Truffle Xiao Long Bao', price: 16.50, image: 'assets/images/dumpling_xiao_long_bao.jpg'})" class="spill-add-btn" title="Add to Order Tray">+</button>
            </div>
            <!-- Flight Card 2: Crisp Golden Gyoza (Top Right) -->
            <div class="dumpling-flight-card spill-card-2">
                <img src="assets/images/dumpling_gyoza.jpg" alt="Crisp Golden Gyoza" class="spill-thumb">
                <div class="text-left flex-1 min-w-0">
                    <div class="text-xs font-bold text-stone-900 truncate">Crisp Golden Gyoza</div>
                    <div class="text-[11px] text-amber-700 font-semibold">$14.80 &bull; Lace Skirt</div>
                </div>
                <button type="button" onclick="window.cafeCart.addItem({id: 18, name: 'Crisp Golden Gyoza', price: 14.80, image: 'assets/images/dumpling_gyoza.jpg'})" class="spill-add-btn" title="Add to Order Tray">+</button>
            </div>
            <!-- Flight Card 3: Sichuan Chili Wontons (Bottom Left Floor) -->
            <div class="dumpling-flight-card spill-card-3">
                <img src="assets/images/dumpling_wontons.jpg" alt="Sichuan Chili Wontons" class="spill-thumb">
                <div class="text-left flex-1 min-w-0">
                    <div class="text-xs font-bold text-stone-900 truncate">Sichuan Chili Wontons</div>
                    <div class="text-[11px] text-amber-700 font-semibold">$15.50 &bull; Chili Crisp</div>
                </div>
                <button type="button" onclick="window.cafeCart.addItem({id: 19, name: 'Sichuan Chili Oil Wontons', price: 15.50, image: 'assets/images/dumpling_wontons.jpg'})" class="spill-add-btn" title="Add to Order Tray">+</button>
            </div>
            <!-- Flight Card 4: Steamed Wild Shiitake Bao (Bottom Right Floor) -->
            <div class="dumpling-flight-card spill-card-4">
                <img src="assets/images/dumpling_bao.jpg" alt="Steamed Shiitake Bao" class="spill-thumb">
                <div class="text-left flex-1 min-w-0">
                    <div class="text-xs font-bold text-stone-900 truncate">Steamed Shiitake Bao</div>
                    <div class="text-[11px] text-amber-700 font-semibold">$13.80 &bull; Lotus Fold</div>
                </div>
                <button type="button" onclick="window.cafeCart.addItem({id: 20, name: 'Steamed Shiitake Bao', price: 13.80, image: 'assets/images/dumpling_bao.jpg'})" class="spill-add-btn" title="Add to Order Tray">+</button>
            </div>
            <!-- Spilling Accents: Chili Oil Saucer & Garnishes -->
            <div class="spill-sauce-dish" id="spillSauce">
                <div class="sauce-pool"></div>
                <span class="sauce-label">🥢 Toasted Sesame &amp; Chili Crisp Splash</span>
            </div>
        </div>

    </div>

    <!-- On-Screen Graphic Motion Controller HUD -->
    <div class="graphic-motion-hud" id="graphicMotionHud">
        <div class="hud-pill-track">
            <button type="button" class="hud-pill active" data-stage="0" onclick="window.luminaMotion.jumpToStage(0)">
                <span class="hud-num">01</span>
                <span class="hud-text">🥟 Steamer Basket</span>
            </button>
            <button type="button" class="hud-pill" data-stage="1" onclick="window.luminaMotion.jumpToStage(1)">
                <span class="hud-num">02</span>
                <span class="hud-text">💥 The Dumpling Spill</span>
            </button>
            <button type="button" class="hud-pill" data-stage="2" onclick="window.luminaMotion.jumpToStage(2)">
                <span class="hud-num">03</span>
                <span class="hud-text">☕ Full Café Platform</span>
            </button>
        </div>
        <button type="button" class="hud-play-btn" onclick="window.luminaMotion.playCinematicSpill()" title="Trigger Full Graphic Spill Sequence">
            <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
            <span>Play Graphic Motion</span>
        </button>
    </div>

    <!-- Bottom Center Scroll Spill Indicator -->
    <div class="graphic-scroll-indicator">
        <button type="button" onclick="window.luminaMotion.playCinematicSpill()" class="scroll-indicator-pill">
            <span class="mouse-icon"><span class="mouse-wheel"></span></span>
            <span class="text-[11px] font-bold text-white tracking-widest uppercase">Scroll down or click to spill dumplings &amp; reveal Lumina</span>
            <i data-lucide="chevron-down" class="w-4 h-4 text-amber-300 animate-bounce"></i>
        </button>
    </div>
</section>

<!-- Petalyx-style Interactive 3-Rhythms Loop Accordion -->
<section id="atmospheres-loop" class="loop-accordion py-20 bg-transparent" data-bg-color="#FFFDF8">
    <div class="container max-w-6xl mx-auto space-y-10 px-4">
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.25em] block">Designed for Your Day</span>
            <h2 class="font-heading text-3xl sm:text-5xl text-stone-900 font-bold tracking-tight">
                Three Rhythms of Lumina
            </h2>
            <p class="text-stone-600 text-sm sm:text-base">
                Hover or click across our day to see how Lumina effortlessly shifts from morning sourdough brunch to high-focus deep work, then to warm evening garden dinners.
            </p>
        </div>

        <div class="loop-track" id="loopTrack">
            <!-- Panel 01 -->
            <div class="loop-panel active" data-panel="0">
                <div class="flex items-center justify-between">
                    <span class="loop-num">01</span>
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">07:00 AM – 12:00 PM</span>
                </div>
                <div class="loop-content mt-6 space-y-3">
                    <h3 class="font-heading text-2xl font-bold text-stone-900">Morning Roast & Artisan Bakery</h3>
                    <p class="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        Natural skylight pouring over ficus trees. Stone-milled 36-hr sourdough toasts with poached heirloom eggs, flaky pistachio croissants, and velvety flat whites pulled from single-origin beans.
                    </p>
                    <div class="loop-details pt-3 flex items-center gap-3">
                        <a href="menu.php" class="btn-primary text-xs py-2 px-4">View Brunch Menu</a>
                        <span class="text-xs text-stone-500 font-medium">100% Daylight &bull; Acoustic Music</span>
                    </div>
                </div>
            </div>

            <!-- Panel 02 -->
            <div class="loop-panel" data-panel="1">
                <div class="flex items-center justify-between">
                    <span class="loop-num">02</span>
                    <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">12:00 PM – 05:00 PM</span>
                </div>
                <div class="loop-content mt-6 space-y-3">
                    <h3 class="font-heading text-2xl font-bold text-stone-900">Creator Sprint & Co-Working</h3>
                    <p class="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        Engineered specifically for remote builders and creators. 1Gbps dedicated fiber Wi-Fi, dual AC + USB-C fast charging at every seat, sound-absorbing acoustic booths, and desk-side flatbread service.
                    </p>
                    <div class="loop-details pt-3 flex items-center gap-3">
                        <a href="dashboard.php" class="btn-primary bg-emerald-700 hover:bg-emerald-600 text-xs py-2 px-4">Check Desk Availability</a>
                        <span class="text-xs text-stone-500 font-medium">980 Mbps &bull; Silent Work Zone</span>
                    </div>
                </div>
            </div>

            <!-- Panel 03 -->
            <div class="loop-panel" data-panel="2">
                <div class="flex items-center justify-between">
                    <span class="loop-num">03</span>
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">05:00 PM – 11:00 PM</span>
                </div>
                <div class="loop-content mt-6 space-y-3">
                    <h3 class="font-heading text-2xl font-bold text-stone-900">Alfresco Bistro & Evening Lights</h3>
                    <p class="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        Fairy lights through jasmine pergolas on our pet-friendly garden terrace. Handmade truffle mushroom pappardelle, artisan pastrami focaccia melts, and craft botanical mocktails under the stars.
                    </p>
                    <div class="loop-details pt-3 flex items-center gap-3">
                        <a href="reservation.php" class="btn-primary text-xs py-2 px-4">Book Garden Table</a>
                        <span class="text-xs text-stone-500 font-medium">Pet Friendly &bull; Warm Fairy Lights</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Apple-Style Interactive Scrollytelling Canvas Section -->
<section id="scrolly-studio" class="relative" data-bg-color="#F4F7F2">
    <div class="text-center max-w-xl mx-auto py-10 px-4 space-y-2">
        <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.25em] block">Interactive Scrollytelling Studio</span>
        <h2 class="font-heading text-3xl sm:text-4xl text-stone-900 font-bold">The Anatomy of Our Signature Dish</h2>
        <p class="text-stone-500 text-xs sm:text-sm">Scroll down or drag the slider below to watch the ingredients assemble in cinematic motion.</p>
    </div>

    <div class="scrolly-container">
        <div class="scrolly-sticky-frame">
            <!-- HTML5 Interactive Canvas -->
            <canvas id="scroll-canvas"></canvas>

            <!-- Floating Step Callouts on Canvas -->
            <div class="scrolly-callout-overlay">
                <div class="space-y-4">
                    <!-- Step 0 -->
                    <div class="scrolly-step-card active" data-step="0">
                        <span class="badge-tag badge-amber">Stage 01 &bull; The Grain Foundation</span>
                        <h3 class="font-heading text-xl sm:text-2xl font-bold text-stone-900 mt-2">36-Hour Fermented Sourdough</h3>
                        <p class="text-stone-600 text-xs mt-2 leading-relaxed">
                            Stone-milled heritage grains, wild starter cultures, and a blistered caramelized crust with an airy honeycomb interior.
                        </p>
                    </div>

                    <!-- Step 1 -->
                    <div class="scrolly-step-card" data-step="1">
                        <span class="badge-tag badge-sage">Stage 02 &bull; Creamy Harvest</span>
                        <h3 class="font-heading text-xl sm:text-2xl font-bold text-stone-900 mt-2">Hand-Scooped Hass Avocado</h3>
                        <p class="text-stone-600 text-xs mt-2 leading-relaxed">
                            Ripe California avocados whipped with sheep's milk feta, Sicilian extra virgin olive oil, and crunchy Maldon sea salt flakes.
                        </p>
                    </div>

                    <!-- Step 2 -->
                    <div class="scrolly-step-card" data-step="2">
                        <span class="badge-tag badge-amber">Stage 03 &bull; Pasture & Truffle</span>
                        <h3 class="font-heading text-xl sm:text-2xl font-bold text-stone-900 mt-2">Soft Poached Egg & Black Truffle</h3>
                        <p class="text-stone-600 text-xs mt-2 leading-relaxed">
                            Slow-poached pasture-raised farm egg with a molten golden yolk, shaved black winter truffles, and sweet heirloom vine tomatoes.
                        </p>
                    </div>

                    <!-- Step 3 -->
                    <div class="scrolly-step-card" data-step="3">
                        <span class="badge-tag badge-sage">Stage 04 &bull; The Complete Feast</span>
                        <h3 class="font-heading text-xl sm:text-2xl font-bold text-stone-900 mt-2">Plated at Lumina Sanctuary</h3>
                        <p class="text-stone-600 text-xs mt-2 leading-relaxed">
                            Paired with our ceremonial iced matcha latte, pistachio croissants, and wild mushroom pasta in our botanical skylight atrium.
                        </p>
                        <button onclick="window.cafeCart.addItem({id: 1, name: 'Heirloom Truffle Avocado Toast', price: 13.50, image: 'assets/images/hero-dish.jpg'})" class="btn-primary text-xs py-2 px-4 mt-3 w-full justify-center">
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add to Order ($13.50)
                        </button>
                    </div>
                </div>

                <!-- Right Experience Tracker -->
                <div class="hidden md:flex flex-col items-center gap-3 bg-white/90 backdrop-blur-md border border-white p-4 rounded-2xl shadow-xl">
                    <div class="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Story</div>
                    <div class="w-1.5 h-28 bg-stone-200 rounded-full overflow-hidden relative">
                        <div id="scrolly-bar-fill" class="w-full bg-amber-600 transition-all duration-100 rounded-full" style="height: 0%;"></div>
                    </div>
                    <div class="text-xs font-mono font-bold text-stone-800" id="scrolly-pct">0%</div>
                </div>
            </div>

            <!-- Bottom Floating Scrubber Pill -->
            <div class="scrolly-controls-pill">
                <button id="scrolly-play-btn" class="flex items-center gap-1.5 text-xs font-bold text-stone-800 hover:text-amber-700 transition">
                    <i data-lucide="play" class="w-4 h-4 text-amber-600"></i>
                    <span>Auto Play</span>
                </button>
                <div class="h-4 w-[1px] bg-stone-300"></div>
                <div class="flex items-center gap-2 text-xs font-semibold text-stone-600">
                    <i data-lucide="sliders" class="w-3.5 h-3.5 text-stone-400"></i>
                    <input type="range" id="scrolly-slider" min="0" max="100" value="0" class="scrolly-slider">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Cafe Atmosphere & Spaces Showcase -->
<section id="atmospheres" class="py-20 bg-transparent border-y border-stone-200/70" data-bg-color="#FAF8F5">
    <div class="container space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.2em] block">Designed for Your Life</span>
            <h2 class="font-heading text-3xl sm:text-4xl text-stone-900 font-bold">
                Explore the Spaces of Lumina
            </h2>
            <p class="text-stone-600 text-sm sm:text-base">
                Click spaces to explore each atmosphere. Tap the pulsating hotspots on the photo to discover architectural daylight, power sockets, and quiet acoustic zones.
            </p>
        </div>

        <div class="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <button class="space-nav-btn filter-pill active" data-space="atrium">
                <i data-lucide="sun" class="w-4 h-4"></i>
                Botanical Atrium
            </button>
            <button class="space-nav-btn filter-pill" data-space="cowork">
                <i data-lucide="laptop" class="w-4 h-4"></i>
                Co-Working Study Pods
            </button>
            <button class="space-nav-btn filter-pill" data-space="terrace">
                <i data-lucide="trees" class="w-4 h-4"></i>
                Garden Terrace (Pet Friendly)
            </button>
            <button class="space-nav-btn filter-pill" data-space="kitchen">
                <i data-lucide="utensils" class="w-4 h-4"></i>
                Kitchen & Bakery Bar
            </button>
        </div>

        <div class="food-card p-6 lg:p-8 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-md">
            <div class="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-sm">
                <img id="space-showcase-img" src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80" alt="Cafe Space" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                
                <!-- Interactive Pulsating Hotspot 1: Skylight -->
                <div class="space-hotspot" style="top: 22%; left: 32%;" data-id="h1" onclick="window.activateSpaceHotspot('h1', 'Glass Skylight Atrium', 0)" title="Click to inspect daylight">
                    <i data-lucide="sun" class="w-3.5 h-3.5"></i>
                    <div class="hotspot-tooltip">Glass Skylight &bull; 100% Natural Daylight</div>
                </div>

                <!-- Interactive Pulsating Hotspot 2: Flora -->
                <div class="space-hotspot" style="bottom: 24%; left: 18%;" data-id="h2" onclick="window.activateSpaceHotspot('h2', 'Living Botanical Ficus', 0)" title="Click to inspect botanical canopy">
                    <i data-lucide="trees" class="w-3.5 h-3.5"></i>
                    <div class="hotspot-tooltip">Botanical Canopy &bull; Living Ficus Trees</div>
                </div>

                <!-- Interactive Pulsating Hotspot 3: Desk Power -->
                <div class="space-hotspot" style="bottom: 28%; right: 26%;" data-id="h3" onclick="window.activateSpaceHotspot('h3', 'Power Sockets Everywhere', 2)" title="Click to inspect power sockets">
                    <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                    <div class="hotspot-tooltip">Dual AC + 100W USB-C at Every Seat</div>
                </div>

                <!-- Interactive Pulsating Hotspot 4: Acoustic Felt -->
                <div class="space-hotspot" style="top: 18%; right: 20%;" data-id="h4" onclick="window.activateSpaceHotspot('h4', 'Acoustic Sound Baffles', 1)" title="Click to inspect acoustics">
                    <i data-lucide="volume-x" class="w-3.5 h-3.5"></i>
                    <div class="hotspot-tooltip">Acoustic Felt Dampening &bull; &lt;45 dB Quiet</div>
                </div>
                <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-stone-900 border border-stone-200 shadow-sm flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Seating Live: Walk-ins Welcome</span>
                </div>
            </div>

            <div id="space-details-card" class="lg:col-span-5 space-y-6">
                <div>
                    <div id="space-subtitle" class="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                        Natural Daylight &bull; Living Plants &bull; Peaceful Vibe
                    </div>
                    <h3 id="space-title" class="font-heading text-2xl sm:text-3xl font-bold text-stone-900">
                        The Sunlit Botanical Atrium
                    </h3>
                    <p id="space-desc" class="text-stone-600 text-sm mt-3 leading-relaxed">
                        Flooded with natural sunlight through expansive glass skylights. Surrounded by living ficus trees and tropical foliage, offering a breath of fresh calm right in the center of the city.
                    </p>
                </div>

                <div id="space-perks-list" class="flex flex-wrap gap-2">
                    <div class="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-100/80 px-3 py-1.5 rounded-lg border border-stone-200">
                        <i data-lucide="sun" class="w-3.5 h-3.5 text-amber-600"></i>
                        <span>100% Natural Daylight</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-100/80 px-3 py-1.5 rounded-lg border border-stone-200">
                        <i data-lucide="music" class="w-3.5 h-3.5 text-amber-600"></i>
                        <span>Gentle Acoustic Playlists</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-100/80 px-3 py-1.5 rounded-lg border border-stone-200">
                        <i data-lucide="coffee" class="w-3.5 h-3.5 text-amber-600"></i>
                        <span>Table Service for Dining</span>
                    </div>
                </div>

                <div class="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-stone-400">Best Suited For</div>
                    <div id="space-ideal" class="text-xs font-semibold text-stone-800">
                        Casual conversations, reading, and morning breakfast
                    </div>
                </div>

                <div class="flex gap-3">
                    <a href="reservation.php" class="flex-1 btn-primary justify-center text-xs py-3 font-semibold">
                        Reserve Table Here
                    </a>
                    <a href="dashboard.php" class="btn-secondary text-xs py-3 px-4">
                        Check Availability
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Interactive "Curate Your Visit" Sanctuary Experience Builder -->
<section id="curate-experience" class="py-16 bg-transparent border-b border-stone-200/70" data-bg-color="#FFFDF9">
    <div class="container space-y-10">
        <div class="text-center max-w-2xl mx-auto space-y-2">
            <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.2em] block">Interactive Concierge</span>
            <h2 class="font-heading text-3xl sm:text-4xl text-stone-900 font-bold">
                Curate Your Lumina Experience
            </h2>
            <p class="text-stone-600 text-sm">
                Select your visit objective below. Our smart concierge pairs the ideal table zone with an artisan culinary dish and craft beverage bundle.
            </p>
        </div>

        <!-- 4 Interactive Objective Selector Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div class="curate-scenario-card active flex items-start gap-3.5" onclick="window.selectCurateScenario('sprint', this)">
                <div class="curate-dot w-3 h-3 rounded-full bg-amber-600 mt-1 flex-shrink-0"></div>
                <div class="text-left">
                    <h4 class="font-heading text-base font-bold text-stone-900">4-Hour Creator Sprint</h4>
                    <p class="text-[11px] text-stone-500 mt-0.5">High focus, 1Gbps fiber, quiet pod</p>
                </div>
            </div>

            <div class="curate-scenario-card flex items-start gap-3.5" onclick="window.selectCurateScenario('brunch', this)">
                <div class="curate-dot w-3 h-3 rounded-full bg-stone-300 mt-1 flex-shrink-0"></div>
                <div class="text-left">
                    <h4 class="font-heading text-base font-bold text-stone-900">Weekend Brunch Date</h4>
                    <p class="text-[11px] text-stone-500 mt-0.5">Skylight, living trees, brioche & matcha</p>
                </div>
            </div>

            <div class="curate-scenario-card flex items-start gap-3.5" onclick="window.selectCurateScenario('terrace', this)">
                <div class="curate-dot w-3 h-3 rounded-full bg-stone-300 mt-1 flex-shrink-0"></div>
                <div class="text-left">
                    <h4 class="font-heading text-base font-bold text-stone-900">Evening Terrace Bistro</h4>
                    <p class="text-[11px] text-stone-500 mt-0.5">Jasmine pergola, pasta & flatbreads</p>
                </div>
            </div>

            <div class="curate-scenario-card flex items-start gap-3.5" onclick="window.selectCurateScenario('bakery', this)">
                <div class="curate-dot w-3 h-3 rounded-full bg-stone-300 mt-1 flex-shrink-0"></div>
                <div class="text-left">
                    <h4 class="font-heading text-base font-bold text-stone-900">Bakery & Espresso Ritual</h4>
                    <p class="text-[11px] text-stone-500 mt-0.5">72-layer croissants & single-origin latte</p>
                </div>
            </div>
        </div>

        <!-- Curated Interactive Experience Preview Box -->
        <div id="curate-preview-box" class="bg-white border-2 border-amber-200/80 rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto shadow-md">
            <!-- Populated interactively by selectCurateScenario() -->
        </div>
    </div>
</section>

<!-- Featured Food & Culinary Highlights with Interactive Filtering -->
<section id="menu-favorites" class="py-20 bg-transparent" data-bg-color="#FFFFFF">
    <div class="container space-y-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div class="space-y-2">
                <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.2em] block">From The Kitchen</span>
                <h2 class="font-heading text-3xl sm:text-4xl text-stone-900 font-bold">Chef-Crafted Culinary Favorites</h2>
                <p class="text-stone-600 text-sm max-w-xl">
                    Every dish is prepared from scratch using steaming bamboo baskets, 36-hr fermented sourdough, handmade pasta, and farm-fresh seasonal ingredients. Filter below or tap "Chef Notes" to inspect pairings.
                </p>
            </div>
            <a href="menu.php" class="btn-secondary">
                View All 20+ Dishes & Drinks
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>

        <!-- Interactive Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none flex-wrap">
            <button class="menu-fav-filter-btn filter-pill active bg-amber-600 text-white" onclick="window.filterMenuFavorites('all', this)">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                All Chef Creations
            </button>
            <button class="menu-fav-filter-btn filter-pill" onclick="window.filterMenuFavorites('Dim Sum', this)">
                <i data-lucide="package" class="w-3.5 h-3.5"></i>
                Artisan Dim Sum
            </button>
            <button class="menu-fav-filter-btn filter-pill" onclick="window.filterMenuFavorites('Brunch', this)">
                <i data-lucide="sun" class="w-3.5 h-3.5"></i>
                Stone-Baked Brunch
            </button>
            <button class="menu-fav-filter-btn filter-pill" onclick="window.filterMenuFavorites('Mains', this)">
                <i data-lucide="utensils" class="w-3.5 h-3.5"></i>
                Handmade Pastas & Bowls
            </button>
            <button class="menu-fav-filter-btn filter-pill" onclick="window.filterMenuFavorites('Paninis', this)">
                <i data-lucide="flame" class="w-3.5 h-3.5"></i>
                Warm Artisan Melts
            </button>
            <button class="menu-fav-filter-btn filter-pill" onclick="window.filterMenuFavorites('Bakery', this)">
                <i data-lucide="cake" class="w-3.5 h-3.5"></i>
                European Bakery
            </button>
        </div>

        <!-- Dynamic Food Grid -->
        <div id="favorites-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php foreach ($signatureItems as $item): ?>
                <div class="menu-fav-card food-card flex flex-col justify-between overflow-hidden group bg-white shadow-sm"
                     data-category="<?= htmlspecialchars($item['category']) ?>">
                    <div class="relative h-48 overflow-hidden">
                        <img src="<?= htmlspecialchars($item['image_url']) ?>" alt="<?= htmlspecialchars($item['name']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute top-3 left-3">
                            <span class="badge-tag badge-amber"><?= htmlspecialchars($item['badge'] ?: $item['category']) ?></span>
                        </div>
                        <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-900 border border-stone-200 shadow-sm">
                            <?= formatPrice($item['price']) ?>
                        </div>
                    </div>

                    <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                            <div class="flex items-center justify-between text-xs mb-1.5">
                                <div class="flex items-center gap-1 text-amber-600">
                                    <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                                    <span class="font-bold text-stone-900"><?= number_format($item['rating'], 2) ?></span>
                                    <span class="text-stone-400">(<?= $item['reviews_count'] ?>)</span>
                                </div>
                                <span class="text-[11px] text-stone-500 font-semibold"><?= $item['calories'] ?> kcal</span>
                            </div>

                            <h3 class="font-heading text-lg font-bold text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">
                                <?= htmlspecialchars($item['name']) ?>
                            </h3>
                            <p class="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                                <?= htmlspecialchars($item['description']) ?>
                            </p>

                            <!-- Interactive Chef Notes Button & Collapsible Drawer -->
                            <div class="pt-2">
                                <button onclick="window.toggleFlavorDrawer(this, <?= $item['id'] ?>)" class="flavor-toggle-btn text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                                    <i data-lucide="info" class="w-3.5 h-3.5"></i> Chef Notes
                                </button>
                                
                                <div id="flavor-drawer-<?= $item['id'] ?>" class="flavor-drawer bg-stone-50 border border-stone-200 rounded-xl p-3 text-[11px] space-y-1.5 text-stone-600">
                                    <div><strong>Pairing:</strong> Single-Origin Flat White or House Chablis</div>
                                    <div><strong>Dietary:</strong> <?= htmlspecialchars($item['dietary'] ?: 'Handmade Fresh Daily') ?></div>
                                    <div><strong>Kitchen Prep:</strong> <?= htmlspecialchars($item['prep_time']) ?></div>
                                </div>
                            </div>
                        </div>

                        <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
                            <span class="text-[11px] text-stone-400 flex items-center gap-1">
                                <i data-lucide="clock" class="w-3.5 h-3.5 text-stone-400"></i> <?= $item['prep_time'] ?>
                            </span>
                            <button onclick="window.cafeCart.addItem({
                                id: <?= $item['id'] ?>,
                                name: '<?= addslashes($item['name']) ?>',
                                price: <?= $item['price'] ?>,
                                image: '<?= addslashes($item['image_url']) ?>'
                            })" class="btn-primary text-xs py-2 px-3.5 font-semibold">
                                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                                Add to Tray
                            </button>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Lumina Work & Dining Interactive Benchmark Hub -->
<section id="quality-benchmarks" class="py-20 bg-transparent border-y border-stone-200/70" data-bg-color="#F8F9FA">
    <div class="container space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.2em] block">The Everyday Sanctuary</span>
            <h2 class="font-heading text-3xl sm:text-4xl text-stone-900 font-bold">
                Lumina Living Digital Benchmark
            </h2>
            <p class="text-stone-600 text-sm">
                Interact with our live amenities: run a speed test on our 1Gbps fiber node, inspect device power wattage, listen to our acoustic ambience, and follow our daily shifts.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Card 1: Interactive Live Wi-Fi Speedometer -->
            <div class="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm hover:border-amber-400 transition-colors">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                            <i data-lucide="wifi" class="w-5 h-5"></i>
                        </div>
                        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live Node
                        </span>
                    </div>

                    <h4 class="font-heading text-base font-bold text-stone-900">Gigabit Fiber Speedometer</h4>
                    <p class="text-xs text-stone-500 mt-1 leading-relaxed">
                        Dedicated symmetrical low-latency fiber. Test the actual desk bandwidth in real-time.
                    </p>

                    <!-- Speedometer Circular Gauge -->
                    <div class="flex items-center justify-center my-4 relative">
                        <svg class="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" stroke="#E7E5E4" stroke-width="8" fill="transparent" />
                            <circle id="speedometer-ring" cx="50" cy="50" r="45" stroke="#D97706" stroke-width="8" stroke-linecap="round" fill="transparent" class="speedometer-ring" />
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span id="speed-gauge-val" class="font-heading text-2xl font-black text-stone-900">980</span>
                            <span class="text-[10px] font-bold text-amber-700 uppercase">Mbps</span>
                        </div>
                    </div>

                    <div id="speed-gauge-ping" class="text-[11px] text-center text-stone-500 font-mono">
                        Ping: 4ms &bull; Jitter: 1ms &bull; 0% Loss
                    </div>
                </div>

                <button id="speed-test-btn" onclick="window.runLiveSpeedTest()" class="btn-primary text-xs py-2.5 px-4 w-full justify-center font-bold shadow-sm">
                    <i data-lucide="play" class="w-3.5 h-3.5"></i>
                    Run Live Speed Test
                </button>
            </div>

            <!-- Card 2: Interactive Power Socket Compatibility Matrix -->
            <div class="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm hover:border-amber-400 transition-colors">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                            <i data-lucide="zap" class="w-5 h-5"></i>
                        </div>
                        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            100% Outlets Fitted
                        </span>
                    </div>

                    <h4 class="font-heading text-base font-bold text-stone-900">Power Socket Matrix</h4>
                    <p class="text-xs text-stone-500 mt-1 leading-relaxed">
                        Tap ports below to verify charging wattage and hardware compatibility.
                    </p>

                    <!-- Interactive Switcher Tabs -->
                    <div class="grid grid-cols-3 gap-1.5 mt-4">
                        <button class="power-spec-tab active p-1.5 rounded-lg text-center text-[11px] font-bold" onclick="window.switchPowerSpec('usbc', this)">
                            100W USB-C
                        </button>
                        <button class="power-spec-tab p-1.5 rounded-lg text-center text-[11px] font-bold" onclick="window.switchPowerSpec('ac', this)">
                            Universal AC
                        </button>
                        <button class="power-spec-tab p-1.5 rounded-lg text-center text-[11px] font-bold" onclick="window.switchPowerSpec('magsafe', this)">
                            MagSafe Qi
                        </button>
                    </div>

                    <!-- Dynamic Spec Display Box -->
                    <div class="mt-4 p-3 bg-white border border-stone-200 rounded-xl space-y-1.5">
                        <div id="power-spec-title" class="text-xs font-bold text-amber-800">65W & 100W USB-C Power Delivery</div>
                        <p id="power-spec-desc" class="text-[11px] text-stone-500 leading-relaxed">
                            High-wattage GaN USB-C ports built into oak tabletops. Fast charges MacBook Pro and ThinkPads in 45 mins.
                        </p>
                        <div class="flex items-center justify-between pt-2 border-t border-stone-100 text-[10px]">
                            <span class="text-stone-400">Charging Rate:</span>
                            <span id="power-spec-speed" class="font-bold text-stone-800">100W Max PD</span>
                        </div>
                    </div>
                </div>

                <div class="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 justify-center">
                    <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                    <span id="power-spec-coverage">100% of all 14 tables equipped</span>
                </div>
            </div>

            <!-- Card 3: Acoustic Noise Monitor & Cafe Ambience Synthesizer -->
            <div class="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm hover:border-amber-400 transition-colors">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                            <i data-lucide="headphones" class="w-5 h-5"></i>
                        </div>
                        <span class="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                            42 dB Quiet
                        </span>
                    </div>

                    <h4 class="font-heading text-base font-bold text-stone-900">Quiet Focus & Ambience</h4>
                    <p class="text-xs text-stone-500 mt-1 leading-relaxed">
                        Acoustic ceiling baffles ensure whisper-quiet levels (&lt;45 dB). Test our gentle ambient room sound directly.
                    </p>

                    <!-- Decibel & Sound Equalizer Display -->
                    <div class="p-4 bg-white border border-stone-200 rounded-xl my-4 text-center space-y-2">
                        <div class="flex items-center justify-center gap-3">
                            <span class="font-heading text-2xl font-black text-stone-900">42.4</span>
                            <span class="text-xs font-bold text-stone-500">dB</span>
                            <div class="sound-equalizer">
                                <span class="equalizer-bar"></span>
                                <span class="equalizer-bar"></span>
                                <span class="equalizer-bar"></span>
                                <span class="equalizer-bar"></span>
                                <span class="equalizer-bar"></span>
                            </div>
                        </div>
                        <div class="text-[11px] text-stone-500 font-medium">Library-Grade Acoustic Ambiance</div>
                    </div>
                </div>

                <!-- Web Audio Ambience Toggle Button -->
                <button id="ambient-audio-toggle" onclick="window.toggleCafeAmbience()" class="btn-secondary text-xs py-2.5 px-3 w-full justify-center flex items-center gap-2 font-semibold shadow-sm">
                    <i data-lucide="volume-2" class="w-4 h-4 text-amber-600"></i>
                    <span id="ambient-audio-label">Play Cozy Cafe Ambience</span>
                    <div id="ambient-equalizer" class="sound-equalizer ml-1" style="display:none;">
                        <span class="equalizer-bar"></span>
                        <span class="equalizer-bar"></span>
                        <span class="equalizer-bar"></span>
                    </div>
                </button>
            </div>

            <!-- Card 4: Shift Clock & Kitchen Rhythm -->
            <div class="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm hover:border-amber-400 transition-colors">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                            <i data-lucide="clock" class="w-5 h-5"></i>
                        </div>
                        <span class="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                            7 AM – 11 PM
                        </span>
                    </div>

                    <h4 class="font-heading text-base font-bold text-stone-900">Live Atelier Shift Clock</h4>
                    <p class="text-xs text-stone-500 mt-1 leading-relaxed">
                        Synced to real-time. Follow our transitions across Morning Bakery, Creator Sprint, and Evening Garden Bistro.
                    </p>

                    <!-- Real-Time Digital Clock Display -->
                    <div class="p-4 bg-white border border-stone-200 rounded-xl my-4 text-center space-y-2">
                        <div id="live-day-clock" class="font-mono text-3xl font-extrabold text-stone-900 tracking-wider">
                            --:--:--
                        </div>
                        <div id="live-day-badge" class="text-[11px] font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block">
                            Syncing Atelier Shift...
                        </div>
                    </div>
                </div>

                <a href="#atmospheres-loop" class="btn-secondary text-xs py-2.5 px-4 w-full justify-center font-semibold">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-600"></i>
                    View The 3 Rhythms
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Interactive Live Seating Radar Floor Grid -->
<section id="radar-teaser" class="py-20 bg-transparent border-b border-stone-200/70" data-bg-color="#F6EFE7">
    <div class="container space-y-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div class="space-y-2">
                <span class="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    LIVE SEATING RADAR & DESK AVAILABILITY
                </span>
                <h2 class="font-heading text-3xl sm:text-4xl text-stone-900 font-bold">
                    Check Table Availability in Real Time
                </h2>
                <p class="text-stone-600 text-sm max-w-xl">
                    Tap any table node on the mini floor plan below to inspect seating capacity, power sockets, and real-time occupancy before heading in.
                </p>
            </div>

            <!-- Floor Zone Filter Buttons -->
            <div class="flex items-center gap-2 flex-wrap">
                <button class="radar-filter-btn filter-pill active bg-stone-900 text-white" onclick="window.filterRadarMini('all', this)">All Tables</button>
                <button class="radar-filter-btn filter-pill" onclick="window.filterRadarMini('Atrium', this)">Atrium</button>
                <button class="radar-filter-btn filter-pill" onclick="window.filterRadarMini('Study', this)">Study Pods</button>
                <button class="radar-filter-btn filter-pill" onclick="window.filterRadarMini('Terrace', this)">Terrace</button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <!-- Left: Interactive Mini Floor Radar Grid -->
            <div class="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div class="flex items-center justify-between text-xs border-b border-stone-100 pb-3">
                    <span class="font-bold text-stone-800">Lumina Floor Plan &bull; 14 Tables Total</span>
                    <div class="flex items-center gap-4 text-[11px] font-semibold">
                        <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Available</span>
                        <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-500"></span> Reserved</span>
                        <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-rose-500"></span> Occupied</span>
                    </div>
                </div>

                <div class="radar-mini-grid" id="radar-mini-grid">
                    <?php foreach ($radarTables as $t): ?>
                        <div class="radar-table-node <?= strtolower($t['status']) ?> <?= $t['table_id'] === 'A1' ? 'ring-2 ring-amber-500 border-amber-500' : '' ?>"
                             data-code="<?= htmlspecialchars($t['table_id']) ?>"
                             data-zone="<?= htmlspecialchars($t['zone']) ?>"
                             onclick="window.selectRadarMiniTable(
                                 '<?= addslashes($t['table_id']) ?>',
                                 '<?= addslashes($t['zone']) ?> Table',
                                 '<?= addslashes($t['zone']) ?>',
                                 <?= $t['capacity'] ?>,
                                 '<?= ucfirst($t['status']) ?>',
                                 '<?= $t['has_power'] ? 'Dual AC + USB-C' : 'Standard' ?>'
                             )">
                            <div class="text-[10px] font-bold text-stone-400"><?= htmlspecialchars($t['table_id']) ?></div>
                            <div class="font-heading text-sm font-bold text-stone-900 mt-0.5"><?= htmlspecialchars($t['zone']) ?></div>
                            <div class="text-[10px] text-stone-500 font-medium flex items-center justify-center gap-1 mt-1">
                                <i data-lucide="users" class="w-3 h-3 text-stone-400"></i> <?= $t['capacity'] ?> Seats
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Right: Interactive Table Inspector Card -->
            <div class="lg:col-span-4">
                <div id="radar-mini-card" class="bg-white border border-stone-200 rounded-2xl p-6 shadow-md space-y-4">
                    <div class="flex items-center justify-between border-b border-stone-200 pb-3">
                        <div>
                            <span class="text-[10px] font-bold uppercase tracking-widest text-amber-700">Botanical Atrium</span>
                            <h4 class="font-heading text-lg font-bold text-stone-900">Atrium Table (A1)</h4>
                        </div>
                        <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            Available
                        </span>
                    </div>
                    <div class="grid grid-cols-2 gap-3 text-xs py-1">
                        <div class="flex items-center gap-2 text-stone-600">
                            <i data-lucide="users" class="w-4 h-4 text-stone-400"></i>
                            <span>Capacity: <strong>4 Guests</strong></span>
                        </div>
                        <div class="flex items-center gap-2 text-stone-600">
                            <i data-lucide="zap" class="w-4 h-4 text-amber-600"></i>
                            <span>Power: <strong>Dual AC + USB-C</strong></span>
                        </div>
                    </div>
                    <div class="pt-2 flex gap-3">
                        <button onclick="window.openTableBookingModal('A1', 'Atrium Table', 'Botanical Atrium', 4, 'Available', 'Dual AC + USB-C')" class="flex-1 btn-primary justify-center text-xs py-2.5 font-bold shadow-sm">
                            <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                            Instant Reserve (A1)
                        </button>
                        <a href="dashboard.php" class="btn-secondary text-xs py-2.5 px-3">
                            Full Radar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Guest Acclaim & Interactive Testimonials -->
<section id="reviews-section" class="py-20 bg-transparent" data-bg-color="#FDFBF7">
    <div class="container space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div class="space-y-2">
                <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.2em] block">Community Stories</span>
                <h2 class="font-heading text-3xl sm:text-4xl text-stone-900 font-bold">Loved by Remote Workers & Foodies</h2>
                <p class="text-stone-600 text-sm max-w-xl">
                    Read genuine verified guest experiences. Tap the heart reaction on any story to share your love or filter by experience category.
                </p>
            </div>

            <!-- Review Category Filter Pills -->
            <div class="flex items-center gap-2 flex-wrap">
                <button class="review-filter-btn filter-pill active bg-stone-900 text-white" onclick="window.filterReviews('all', this)">All Stories</button>
                <button class="review-filter-btn filter-pill" onclick="window.filterReviews('work', this)">Remote Work</button>
                <button class="review-filter-btn filter-pill" onclick="window.filterReviews('food', this)">Brunch & Pasta</button>
                <button class="review-filter-btn filter-pill" onclick="window.filterReviews('vibe', this)">Atmosphere</button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <?php foreach ($reviews as $rev): 
                $tag = (stripos($rev['comment'], 'wifi') !== false || stripos($rev['comment'], 'work') !== false) ? 'work' : ((stripos($rev['comment'], 'food') !== false || stripos($rev['comment'], 'toast') !== false || stripos($rev['comment'], 'pasta') !== false) ? 'food' : 'vibe');
            ?>
                <div class="review-card-item food-card p-6 flex flex-col justify-between space-y-4 bg-white shadow-sm" data-tag="<?= $tag ?>">
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-1 text-amber-500">
                                <?php for ($s = 0; $s < $rev['rating']; $s++): ?>
                                    <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                                <?php endfor; ?>
                            </div>
                            <!-- Interactive Reaction Heart Button -->
                            <button class="reaction-heart-btn" onclick="window.toggleReviewReaction(this)" title="Like this story">
                                <i data-lucide="heart" class="w-3.5 h-3.5"></i>
                                <span class="reaction-count"><?= rand(18, 54) ?></span>
                            </button>
                        </div>
                        <p class="text-stone-700 text-xs sm:text-sm leading-relaxed">
                            "<?= htmlspecialchars($rev['comment']) ?>"
                        </p>
                    </div>

                    <div class="pt-4 border-t border-stone-100 flex items-center gap-3">
                        <img src="<?= htmlspecialchars($rev['avatar_url']) ?>" alt="<?= htmlspecialchars($rev['customer_name']) ?>" class="w-10 h-10 rounded-full object-cover border border-amber-300">
                        <div>
                            <div class="text-sm font-bold text-stone-900"><?= htmlspecialchars($rev['customer_name']) ?></div>
                            <div class="text-[11px] text-amber-700 font-semibold"><?= htmlspecialchars($rev['item_enjoyed']) ?></div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Interactive Table Scout Bar & Reservation Call to Action -->
<section class="py-16 bg-stone-900 text-white rounded-3xl container my-10 p-8 sm:p-12 text-center max-w-5xl space-y-8 shadow-2xl relative overflow-hidden">
    <!-- Subtle Ambient Glow -->
    <div class="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="space-y-3 relative z-10">
        <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
            <i data-lucide="calendar" class="w-6 h-6"></i>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl font-bold">Reserve Your Favorite Desk or Table</h2>
        <p class="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Planning a deep 4-hour remote sprint, an intimate brunch date, or evening drinks under garden fairy lights? Select your preferences below for instant table confirmation.
        </p>
    </div>

    <!-- Interactive Quick Scout Bar -->
    <div class="bg-stone-800/90 border border-stone-700 p-4 sm:p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10 text-left">
        <!-- Date Selector -->
        <div>
            <label class="text-[10px] uppercase font-bold text-stone-400 block mb-1">Date</label>
            <input type="date" id="scout-date" value="<?= date('Y-m-d') ?>" min="<?= date('Y-m-d') ?>" class="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500">
        </div>

        <!-- Time Slot Selector -->
        <div>
            <label class="text-[10px] uppercase font-bold text-stone-400 block mb-1">Preferred Time</label>
            <select id="scout-time" class="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500">
                <option value="09:00">09:00 AM (Morning Bakery)</option>
                <option value="11:30">11:30 AM (Peak Brunch)</option>
                <option value="14:00" selected>02:00 PM (Creator Sprint)</option>
                <option value="17:30">05:30 PM (Evening Bistro)</option>
                <option value="20:00">08:00 PM (Dinner & Drinks)</option>
            </select>
        </div>

        <!-- Atmosphere Zone Selector -->
        <div>
            <label class="text-[10px] uppercase font-bold text-stone-400 block mb-1">Preferred Zone</label>
            <select id="scout-zone" class="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500">
                <option value="Botanical Garden Terrace">Botanical Garden Terrace</option>
                <option value="Quiet Co-Working Study Pod">Quiet Co-Working Study Pod</option>
                <option value="Main Skylight Dining Room">Main Skylight Dining Room</option>
                <option value="Kitchen & Bakery Bar">Kitchen & Bakery Bar</option>
            </select>
        </div>

        <!-- Action Button -->
        <div class="flex items-end">
            <button onclick="
                const d = document.getElementById('scout-date').value;
                const t = document.getElementById('scout-time').value;
                const z = document.getElementById('scout-zone').value;
                window.location.href = `reservation.php?date=${encodeURIComponent(d)}&time=${encodeURIComponent(t)}&area=${encodeURIComponent(z)}`;
            " class="w-full btn-primary bg-amber-600 hover:bg-amber-500 border-none text-white py-2.5 px-4 font-bold text-xs justify-center shadow-lg">
                <i data-lucide="search" class="w-4 h-4"></i>
                Find Matching Table
            </button>
        </div>
    </div>
</section>

<!-- Include Interactive Scripts with Cache Buster -->
<script src="assets/js/scrolly.js?v=<?= time() ?>"></script>
<script src="assets/js/welcome-transition.js?v=<?= time() ?>"></script>

<?php include __DIR__ . '/includes/footer.php'; ?>
