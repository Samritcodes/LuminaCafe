<?php
// reservation.php - Lumina Table & Study Pod Reservation Engine
$pageTitle = "Reserve a Table or Study Desk";
$activeNav = "reservation";

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

$presetTable = sanitize($_GET['table'] ?? '');
$presetZone = sanitize($_GET['zone'] ?? 'Co-Working & Creator Pods');

include __DIR__ . '/includes/header.php';
?>

<section class="py-14 bg-stone-100/70 border-b border-stone-200">
    <div class="container text-center max-w-2xl space-y-3">
        <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.25em]">Sanctuary for Work & Dining</span>
        <h1 class="font-heading text-4xl sm:text-5xl text-stone-900 font-extrabold">Reserve Your Desk or Table</h1>
        <p class="text-stone-600 text-sm">
            Instant table and workspace reservations. Equipped with high-speed fiber Wi-Fi, power ports at desks, and all-day dining service.
        </p>
    </div>
</section>

<section class="py-12">
    <div class="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Reservation Form (7 cols) -->
        <div class="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div>
                <h3 class="font-heading text-2xl text-stone-900 font-bold">Book Your Space</h3>
                <p class="text-xs text-stone-500 mt-1">Instant confirmation &bull; Zero reservation fee &bull; Direct kitchen routing</p>
            </div>

            <form id="reservation-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Your Full Name *</label>
                        <input type="text" name="name" required placeholder="Elena Vance" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Phone Number *</label>
                        <input type="tel" name="phone" required placeholder="+1 (555) 345-6789" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                    <input type="email" name="email" required placeholder="elena@example.com" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Date *</label>
                        <input type="date" name="date" required value="<?= date('Y-m-d') ?>" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Time Slot *</label>
                        <select name="time" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                            <option value="08:30 AM">08:30 AM (Morning Focus Session)</option>
                            <option value="10:30 AM">10:30 AM (Brunch & Work)</option>
                            <option value="12:30 PM" selected>12:30 PM (Midday Lunch & Meeting)</option>
                            <option value="03:00 PM">03:00 PM (Afternoon Study Block)</option>
                            <option value="06:00 PM">06:00 PM (Evening Dinner & Wine)</option>
                            <option value="08:30 PM">08:30 PM (Late Night Chill)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Guests / Desks *</label>
                        <select name="party_size" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                            <option value="1">1 Person (Solo Work Desk)</option>
                            <option value="2" selected>2 Guests (Dining Booth)</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests (Team Meeting)</option>
                            <option value="6">6 Guests (Large Table)</option>
                        </select>
                    </div>
                </div>

                <!-- Seating Zone Selection -->
                <div>
                    <label class="block text-xs font-semibold text-stone-700 mb-2">Preferred Environment</label>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <label class="cursor-pointer">
                            <input type="radio" name="seating_area" value="Co-Working & Creator Pods" class="peer hidden" <?= $presetZone === 'Co-Working & Creator Pods' ? 'checked' : '' ?>>
                            <div class="p-3 bg-stone-50 border border-stone-300 peer-checked:border-amber-600 peer-checked:bg-amber-50 rounded-xl text-center text-xs transition">
                                <i data-lucide="laptop" class="w-5 h-5 mx-auto mb-1 text-amber-600"></i>
                                <span class="font-bold text-stone-900 block">Work Pods</span>
                                <span class="text-[10px] text-stone-500">Power & 1Gbps</span>
                            </div>
                        </label>

                        <label class="cursor-pointer">
                            <input type="radio" name="seating_area" value="Sunlit Botanical Terrace" class="peer hidden" <?= $presetZone === 'Sunlit Botanical Terrace' ? 'checked' : '' ?>>
                            <div class="p-3 bg-stone-50 border border-stone-300 peer-checked:border-amber-600 peer-checked:bg-amber-50 rounded-xl text-center text-xs transition">
                                <i data-lucide="sun" class="w-5 h-5 mx-auto mb-1 text-amber-600"></i>
                                <span class="font-bold text-stone-900 block">Garden Terrace</span>
                                <span class="text-[10px] text-stone-500">Pet Friendly</span>
                            </div>
                        </label>

                        <label class="cursor-pointer">
                            <input type="radio" name="seating_area" value="Velvet Dining Lounge" class="peer hidden" <?= $presetZone === 'Velvet Dining Lounge' ? 'checked' : '' ?>>
                            <div class="p-3 bg-stone-50 border border-stone-300 peer-checked:border-amber-600 peer-checked:bg-amber-50 rounded-xl text-center text-xs transition">
                                <i data-lucide="sofa" class="w-5 h-5 mx-auto mb-1 text-amber-600"></i>
                                <span class="font-bold text-stone-900 block">Dining Lounge</span>
                                <span class="text-[10px] text-stone-500">Plush Booths</span>
                            </div>
                        </label>

                        <label class="cursor-pointer">
                            <input type="radio" name="seating_area" value="Open Kitchen Bar" class="peer hidden" <?= $presetZone === 'Open Kitchen Bar' ? 'checked' : '' ?>>
                            <div class="p-3 bg-stone-50 border border-stone-300 peer-checked:border-amber-600 peer-checked:bg-amber-50 rounded-xl text-center text-xs transition">
                                <i data-lucide="utensils" class="w-5 h-5 mx-auto mb-1 text-amber-600"></i>
                                <span class="font-bold text-stone-900 block">Kitchen Bar</span>
                                <span class="text-[10px] text-stone-500">Chef Counter</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-stone-700 mb-1">Special Requirements or Working Needs</label>
                    <textarea name="special_requests" rows="2" placeholder="e.g. Quiet meeting call planned, bringing a pet dog, baby high-chair needed..." class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"></textarea>
                </div>

                <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-800">
                    <i data-lucide="check-circle" class="w-5 h-5 flex-shrink-0 text-emerald-600"></i>
                    <span>Guaranteed desk & table hold. We preserve your reservation for 15 minutes past start time.</span>
                </div>

                <button type="submit" class="w-full btn-primary justify-center py-4 font-bold tracking-wide text-sm shadow-sm">
                    Confirm Reservation Pass
                </button>
            </form>
        </div>

        <!-- Space Environments Showcase (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
            <div class="bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 class="font-heading text-xl font-bold text-stone-900">What Every Reservation Includes</h3>

                <div class="space-y-3.5 text-xs text-stone-600">
                    <div class="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl">
                        <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                            <i data-lucide="wifi" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <div class="font-bold text-stone-900 text-sm">Ultra-Fast 1Gbps Fiber Wi-Fi</div>
                            <p class="text-stone-500 mt-0.5">Dual-band low-latency connection designed for zoom calls, uploads, and uninterrupted work.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl">
                        <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                            <i data-lucide="zap" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <div class="font-bold text-stone-900 text-sm">Dedicated Power Outlets</div>
                            <p class="text-stone-500 mt-0.5">Every booth, pod, and desk features standard AC sockets + USB-C fast charge.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl">
                        <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                            <i data-lucide="coffee" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <div class="font-bold text-stone-900 text-sm">Table Ordering Service</div>
                            <p class="text-stone-500 mt-0.5">Order breakfast, brunch, or refreshments straight to your desk without losing your focus.</p>
                        </div>
                    </div>
                </div>

                <div class="pt-2">
                    <a href="dashboard.php" class="btn-secondary w-full justify-center text-xs py-2.5">
                        <i data-lucide="radar" class="w-4 h-4 text-emerald-600"></i>
                        View Live Occupancy Radar
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
