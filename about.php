<?php
// about.php - Lumina Story, Farm-to-Table Ethos & Kitchen Heritage
$pageTitle = "Our Story & Culinary Ethos";
$activeNav = "about";

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

include __DIR__ . '/includes/header.php';
?>

<section class="py-14 bg-stone-100/70 border-b border-stone-200">
    <div class="container text-center max-w-2xl space-y-3">
        <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.25em]">Good Food &bull; Mindful Spaces &bull; Community</span>
        <h1 class="font-heading text-4xl sm:text-5xl text-stone-900 font-extrabold">The Lumina Story</h1>
        <p class="text-stone-600 text-sm">
            Created as an everyday sanctuary where you don't have to choose between restaurant-quality dining and an inspiring place to work.
        </p>
    </div>
</section>

<!-- Mission & Philosophy -->
<section class="py-16">
    <div class="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6 space-y-6">
            <span class="badge-tag badge-amber">The Core Philosophy</span>
            <h2 class="font-heading text-3xl sm:text-4xl text-stone-900 font-bold leading-tight">
                Designed for the Rhythm of <span class="text-amber-700">Modern Daily Life</span>
            </h2>
            <p class="text-stone-600 text-sm leading-relaxed">
                Most cafes either have great coffee but cramped tables with no outlets, or great workspaces but mediocre food. We created Lumina to solve both.
            </p>
            <p class="text-stone-600 text-sm leading-relaxed">
                Here, our kitchen rolls out fresh pasta daily, stone-bakes sourdough flatbreads, and sources produce from ethical local farms, while our spacious garden tables and pods provide the power and speed modern creatives demand.
            </p>

            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                <div class="p-4 bg-white border border-stone-200 rounded-2xl shadow-sm">
                    <div class="font-heading text-2xl text-amber-700 font-bold">100%</div>
                    <div class="text-xs text-stone-500 font-medium">Stone-Milled Flours</div>
                </div>
                <div class="p-4 bg-white border border-stone-200 rounded-2xl shadow-sm">
                    <div class="font-heading text-2xl text-emerald-700 font-bold">Local Farms</div>
                    <div class="text-xs text-stone-500 font-medium">Organic Heirloom Produce</div>
                </div>
            </div>
        </div>

        <div class="lg:col-span-6">
            <div class="bg-white p-3 rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80" alt="Lumina Kitchen & Dining" class="w-full h-[400px] object-cover rounded-2xl">
            </div>
        </div>
    </div>
</section>

<!-- 4 Commitments -->
<section class="py-16 bg-white border-y border-stone-200">
    <div class="container space-y-12">
        <div class="text-center max-w-xl mx-auto space-y-2">
            <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">Our Commitments</span>
            <h2 class="font-heading text-3xl text-stone-900 font-bold">What Sets Lumina Apart</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                <div class="text-amber-700 font-mono font-bold text-xl">01</div>
                <h4 class="font-heading text-base font-bold text-stone-900">Scratch Cooking</h4>
                <p class="text-stone-500 text-xs leading-relaxed">
                    Every sauce, dressing, sourdough bread, and pastry is made from scratch in-house every morning.
                </p>
            </div>

            <div class="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                <div class="text-amber-700 font-mono font-bold text-xl">02</div>
                <h4 class="font-heading text-base font-bold text-stone-900">Remote Work Hospitality</h4>
                <p class="text-stone-500 text-xs leading-relaxed">
                    We welcome laptops. With dedicated gigabit fiber and power at every desk, stay as long as you need.
                </p>
            </div>

            <div class="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                <div class="text-amber-700 font-mono font-bold text-xl">03</div>
                <h4 class="font-heading text-base font-bold text-stone-900">Botanical Well-being</h4>
                <p class="text-stone-500 text-xs leading-relaxed">
                    Natural daylight, living air-purifying foliage, and sound-absorbing architecture create calm focus.
                </p>
            </div>

            <div class="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                <div class="text-amber-700 font-mono font-bold text-xl">04</div>
                <h4 class="font-heading text-base font-bold text-stone-900">Pet & Family Friendly</h4>
                <p class="text-stone-500 text-xs leading-relaxed">
                    Bring your four-legged companion to our covered terrace with dedicated dog hydration stations.
                </p>
            </div>
        </div>
    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
