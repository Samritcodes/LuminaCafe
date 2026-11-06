<?php
// includes/footer.php - Light & Elegant Footer
?>
    <!-- VIP Table / Study Pod Reservation Pass Modal -->
    <div id="reservation-modal" class="modal-overlay">
        <div class="modal-content text-center max-w-md">
            <div class="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 text-amber-700 mx-auto flex items-center justify-center mb-3">
                <i data-lucide="sparkles" class="w-7 h-7"></i>
            </div>
            <h3 class="font-heading text-2xl font-bold text-stone-900 mb-1">Reservation Confirmed</h3>
            <p class="text-xs text-stone-500 mb-6">Your table/workspace is reserved on our live seating radar.</p>

            <div class="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-left mb-6 space-y-3.5 shadow-sm">
                <div class="flex justify-between items-center border-b border-stone-200 pb-3">
                    <div>
                        <div class="text-[10px] uppercase font-bold tracking-wider text-stone-400">Pass Reference</div>
                        <div id="res-modal-code" class="text-amber-700 font-mono font-bold text-base">RES-000000</div>
                    </div>
                    <div class="text-right">
                        <div class="text-[10px] uppercase font-bold tracking-wider text-stone-400">Status</div>
                        <span class="text-emerald-700 font-bold text-xs flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Confirmed
                        </span>
                    </div>
                </div>

                <div>
                    <div class="text-[10px] uppercase font-bold tracking-wider text-stone-400">Guest Name</div>
                    <div id="res-modal-name" class="text-stone-900 font-serif font-bold text-lg">Guest Name</div>
                </div>

                <div class="grid grid-cols-2 gap-2 text-xs">
                    <div>
                        <div class="text-[10px] uppercase font-bold tracking-wider text-stone-400">Time & Party</div>
                        <div id="res-modal-details" class="text-stone-800 font-semibold">Today · 12:30 PM</div>
                    </div>
                    <div>
                        <div class="text-[10px] uppercase font-bold tracking-wider text-stone-400">Assigned Zone</div>
                        <div id="res-modal-table" class="text-amber-800 font-semibold">Botanical Terrace</div>
                    </div>
                </div>

                <div class="pt-3 border-t border-stone-200 flex items-center justify-between">
                    <div class="flex items-center gap-2 text-[11px] text-stone-500">
                        <i data-lucide="qr-code" class="w-8 h-8 text-stone-700"></i>
                        <span>Show this pass on arrival for immediate seating</span>
                    </div>
                    <div class="text-stone-400 font-mono text-[10px] font-bold">LUMINA PASS</div>
                </div>
            </div>

            <button class="modal-close-btn w-full btn-primary justify-center py-3 text-sm font-semibold">
                Done & Save Pass
            </button>
        </div>
    </div>

    <!-- Main Light Footer -->
    <footer class="bg-white border-t border-stone-200 pt-16 pb-12 text-stone-600 mt-24">
        <div class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
            <!-- Brand Column -->
            <div class="lg:col-span-2 space-y-4">
                <a href="index.php" class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-stone-900 text-amber-500 flex items-center justify-center">
                        <i data-lucide="utensils" class="w-5 h-5"></i>
                    </div>
                    <span class="font-heading text-xl font-bold tracking-tight text-stone-900">LUMINA CAFÉ & KITCHEN</span>
                </a>
                <p class="text-sm text-stone-500 max-w-sm leading-relaxed">
                    A welcoming sanctuary for all-day brunch, stone-baked pizzas & pastas, specialty coffee, and productive co-working. Powered by natural light and supercharged Wi-Fi.
                </p>
                <div class="pt-2 flex items-center gap-3 text-stone-400">
                    <a href="#" class="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 hover:text-stone-900 flex items-center justify-center transition">
                        <i data-lucide="instagram" class="w-4 h-4"></i>
                    </a>
                    <a href="#" class="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 hover:text-stone-900 flex items-center justify-center transition">
                        <i data-lucide="facebook" class="w-4 h-4"></i>
                    </a>
                    <a href="#" class="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 hover:text-stone-900 flex items-center justify-center transition">
                        <i data-lucide="map-pin" class="w-4 h-4"></i>
                    </a>
                </div>
            </div>

            <!-- Quick Navigation -->
            <div class="space-y-3">
                <h4 class="font-heading text-sm text-stone-900 font-bold uppercase tracking-wider">Explore</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="index.php" class="hover:text-amber-700 transition">Atelier Home</a></li>
                    <li><a href="menu.php" class="hover:text-amber-700 transition">Food & Drink Menu</a></li>
                    <li><a href="index.php#atmospheres" class="hover:text-amber-700 transition">Workspaces & Ambiance</a></li>
                    <li><a href="dashboard.php" class="hover:text-amber-700 transition font-semibold text-stone-800">Live Cafe Radar</a></li>
                    <li><a href="reservation.php" class="hover:text-amber-700 transition">Book Table / Desk</a></li>
                    <li><a href="about.php" class="hover:text-amber-700 transition">Our Story & Ethos</a></li>
                </ul>
            </div>

            <!-- Atelier Hours -->
            <div class="space-y-3">
                <h4 class="font-heading text-sm text-stone-900 font-bold uppercase tracking-wider">Working & Kitchen Hours</h4>
                <div class="space-y-2 text-xs">
                    <div>
                        <div class="text-stone-900 font-bold">Monday – Friday</div>
                        <div class="text-stone-500">07:00 AM – 11:00 PM</div>
                    </div>
                    <div>
                        <div class="text-stone-900 font-bold">Saturday & Sunday</div>
                        <div class="text-stone-500">08:00 AM – 11:30 PM</div>
                    </div>
                    <div class="pt-2 text-emerald-700 font-bold flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Kitchen & Co-Working Open Now
                    </div>
                </div>
            </div>

            <!-- Guest Wi-Fi & Work Amenities -->
            <div class="space-y-3">
                <h4 class="font-heading text-sm text-stone-900 font-bold uppercase tracking-wider">Work Amenities</h4>
                <div class="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2 text-xs">
                    <div class="flex items-center gap-2 text-stone-800 font-medium">
                        <i data-lucide="wifi" class="w-4 h-4 text-amber-600"></i>
                        <span>SSID: <strong>Lumina_Guest_1Gbps</strong></span>
                    </div>
                    <div class="flex items-center gap-2 text-stone-800 font-medium">
                        <i data-lucide="zap" class="w-4 h-4 text-amber-600"></i>
                        <span>Outlets: <strong>At Every Table</strong></span>
                    </div>
                    <div class="flex items-center gap-2 text-stone-800 font-medium">
                        <i data-lucide="heart" class="w-4 h-4 text-emerald-600"></i>
                        <span>Patio: <strong>Pet Friendly</strong></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="container border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>&copy; <?= date('Y') ?> Lumina Café & Kitchen. Designed for work, food, and life.</p>
            <div class="flex gap-6">
                <a href="dashboard.php" class="text-stone-900 font-bold hover:underline flex items-center gap-1">
                    <i data-lucide="activity" class="w-3.5 h-3.5 text-emerald-600"></i> Kitchen Command Center
                </a>
            </div>
        </div>
    </footer>

    <!-- Core Scripts -->
    <script src="assets/js/cart.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
