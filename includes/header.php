<?php
// includes/header.php - Light & Elegant Navigation
if (!isset($pageTitle)) {
    $pageTitle = "Lumina Café & Kitchen";
}
if (!isset($activeNav)) {
    $activeNav = "home";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?> | Lumina Café & Kitchen</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☕</text></svg>">

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        amber: {
                            50: '#fffbeb',
                            100: '#fef3c7',
                            500: '#f59e0b',
                            600: '#d97706',
                            700: '#b45309'
                        },
                        sage: {
                            50: '#f0fdf4',
                            100: '#dcfce7',
                            600: '#16a34a',
                            700: '#15803d'
                        },
                        stone: {
                            50: '#fafaf9',
                            100: '#f5f5f4',
                            200: '#e7e5e4',
                            800: '#292524',
                            900: '#1c1917'
                        }
                    }
                }
            }
        }
    </script>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Canvas Confetti -->
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

    <!-- GSAP & ScrollTrigger -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="bg-[#FAF8F5] text-stone-900 min-h-screen flex flex-col justify-between">
    <!-- Top Announcement Bar -->
    <div class="bg-stone-900 text-stone-200 py-2 px-4 text-xs text-center font-medium flex items-center justify-center gap-6 hidden sm:flex">
        <span class="flex items-center gap-2 text-emerald-400">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Open Daily: 7:00 AM – 11:00 PM
        </span>
        <span class="text-stone-600">&bull;</span>
        <span class="flex items-center gap-1.5 text-stone-300">
            <i data-lucide="wifi" class="w-3.5 h-3.5 text-amber-400"></i> Free 1Gbps Fiber Wi-Fi & Power at Every Desk
        </span>
        <span class="text-stone-600">&bull;</span>
        <span class="text-stone-300">Fresh Brunch, Pastas & Bakery Served All Day</span>
    </div>

    <!-- Main Light Navigation Bar -->
    <header class="navbar-light">
        <div class="container flex items-center justify-between">
            <!-- Brand Logo -->
            <a href="index.php" class="flex items-center gap-3 text-decoration-none group">
                <div class="w-10 h-10 rounded-xl bg-stone-900 text-amber-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <i data-lucide="utensils" class="w-5 h-5"></i>
                </div>
                <div>
                    <span class="font-heading text-xl font-bold tracking-tight text-stone-900 block leading-tight">LUMINA</span>
                    <span class="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Café &bull; Kitchen &bull; Workspaces</span>
                </div>
            </a>

            <!-- Navigation Links -->
            <nav class="hidden lg:flex items-center gap-8">
                <a href="index.php" class="nav-link <?= $activeNav === 'home' ? 'active' : '' ?>">Home</a>
                <a href="menu.php" class="nav-link <?= $activeNav === 'menu' ? 'active' : '' ?>">Food & Drink Menu</a>
                <a href="index.php#atmospheres" class="nav-link <?= $activeNav === 'spaces' ? 'active' : '' ?>">The Spaces & Work</a>
                <a href="dashboard.php" class="nav-link <?= $activeNav === 'dashboard' ? 'active' : '' ?> flex items-center gap-1.5 font-semibold text-stone-900">
                    <span>Live Cafe Radar</span>
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </a>
                <a href="reservation.php" class="nav-link <?= $activeNav === 'reservation' ? 'active' : '' ?>">Book a Table / Desk</a>
                <a href="about.php" class="nav-link <?= $activeNav === 'about' ? 'active' : '' ?>">Story & Ethos</a>
                <a href="contact.php" class="nav-link <?= $activeNav === 'contact' ? 'active' : '' ?>">Contact</a>
            </nav>

            <!-- Right Actions: Cart & CTA -->
            <div class="flex items-center gap-3">
                <!-- Cart Button -->
                <button id="cart-toggle-btn" class="relative bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 p-2.5 rounded-full transition shadow-sm flex items-center justify-center">
                    <i data-lucide="shopping-bag" class="w-5 h-5 text-stone-700"></i>
                    <span class="cart-count-badge absolute -top-1 -right-1 bg-amber-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow" style="display: none;">0</span>
                </button>

                <!-- Book Table CTA -->
                <a href="reservation.php" class="btn-primary text-xs py-2.5 px-4 hidden sm:inline-flex">
                    <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                    <span>Reserve Desk</span>
                </a>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="lg:hidden p-2 text-stone-600 hover:text-stone-900">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer Navigation -->
        <div id="mobile-menu-drawer" class="lg:hidden hidden bg-white border-b border-stone-200 px-6 py-4 mt-3 shadow-md">
            <div class="flex flex-col gap-3 font-medium text-sm">
                <a href="index.php" class="text-stone-700 hover:text-amber-600 py-1">Home</a>
                <a href="menu.php" class="text-stone-700 hover:text-amber-600 py-1">Food & Drink Menu</a>
                <a href="index.php#atmospheres" class="text-stone-700 hover:text-amber-600 py-1">The Spaces & Work</a>
                <a href="dashboard.php" class="text-stone-900 font-bold py-1 flex items-center justify-between">
                    <span>Live Cafe Radar</span>
                    <span class="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Live</span>
                </a>
                <a href="reservation.php" class="text-stone-700 hover:text-amber-600 py-1">Book a Table / Desk</a>
                <a href="about.php" class="text-stone-700 hover:text-amber-600 py-1">Story & Ethos</a>
                <a href="contact.php" class="text-stone-700 hover:text-amber-600 py-1">Contact & Location</a>
            </div>
        </div>
    </header>

    <!-- Top Spacing -->
    <div class="pt-20"></div>

    <!-- Slide-out Cart Drawer Overlay -->
    <div id="cart-overlay" class="cart-drawer-overlay"></div>

    <!-- Slide-out Cart Drawer -->
    <div id="cart-drawer" class="cart-drawer flex flex-col justify-between">
        <!-- Header -->
        <div class="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                    <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                </div>
                <div>
                    <h3 class="font-heading text-lg font-bold text-stone-900">Your Tray</h3>
                    <p class="text-xs text-stone-500">Fresh from our kitchen & bar</p>
                </div>
            </div>
            <button id="cart-close-btn" class="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <!-- Items Container -->
        <div class="p-6 flex-1 overflow-y-auto">
            <div id="cart-empty-state" class="text-center py-16 text-stone-400">
                <i data-lucide="utensils" class="w-12 h-12 mx-auto mb-3 opacity-30"></i>
                <p class="text-sm font-medium text-stone-600">Your tray is currently empty.</p>
                <p class="text-xs text-stone-400 mt-1">Explore our chef brunch, pastas, pastries, and drinks!</p>
            </div>
            <div id="cart-items-list"></div>
        </div>

        <!-- Promo Code & Summary Footer -->
        <div class="p-6 bg-stone-50 border-t border-stone-200 space-y-4">
            <!-- Promo Code Input -->
            <div class="flex gap-2">
                <input type="text" id="promo-input" placeholder="Promo code (e.g. LUMINA20)" class="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 uppercase">
                <button id="promo-apply-btn" class="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">Apply</button>
            </div>

            <!-- Calculation Rows -->
            <div class="space-y-1.5 text-xs">
                <div class="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span id="cart-subtotal" class="text-stone-900 font-bold">$0.00</span>
                </div>
                <div id="cart-discount-row" class="flex justify-between text-emerald-600 font-semibold" style="display: none;">
                    <span>Special Discount</span>
                    <span id="cart-discount">-$0.00</span>
                </div>
                <div class="flex justify-between text-stone-600">
                    <span>Estimated Tax (8%)</span>
                    <span id="cart-tax" class="text-stone-900 font-bold">$0.00</span>
                </div>
                <div class="border-t border-stone-200 pt-2 flex justify-between text-sm font-bold text-stone-900">
                    <span>Total Amount</span>
                    <span id="cart-total" class="text-amber-700 font-heading text-lg">$0.00</span>
                </div>
            </div>

            <button id="cart-checkout-btn" class="w-full btn-primary justify-center py-3.5 text-center font-bold tracking-wide" disabled>
                Proceed to Checkout
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
        </div>
    </div>

    <!-- Checkout Modal -->
    <div id="checkout-modal" class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close-btn absolute top-5 right-5 text-stone-400 hover:text-stone-700">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center">
                    <i data-lucide="credit-card" class="w-5 h-5"></i>
                </div>
                <div>
                    <h3 class="font-heading text-xl font-bold text-stone-900">Complete Order</h3>
                    <p class="text-xs text-stone-500">Contactless table dispatch &bull; Total: <span id="checkout-summary-total" class="text-amber-700 font-bold">$0.00</span></p>
                </div>
            </div>

            <form id="checkout-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Your Full Name *</label>
                        <input type="text" name="name" required placeholder="Elena Vance" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Phone Number *</label>
                        <input type="tel" name="phone" required placeholder="+1 (555) 345-6789" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                    <input type="email" name="email" placeholder="elena@example.com" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Dining Preference</label>
                        <select name="order_type" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                            <option value="dine-in">Dine-in at Table / Desk</option>
                            <option value="takeaway">Takeaway Express Counter</option>
                            <option value="delivery">Curbside Pickup</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Table # or Study Desk</label>
                        <input type="text" name="table_number" placeholder="Table T2 or Study Pod W1" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-stone-700 mb-1">Kitchen / Dietary Notes</label>
                    <textarea name="notes" rows="2" placeholder="e.g. Extra dressing on side, gluten-free bread option, dressing on side..." class="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"></textarea>
                </div>

                <button type="submit" class="w-full btn-primary justify-center py-3.5 font-bold tracking-wide mt-2">
                    Confirm & Send to Kitchen
                </button>
            </form>
        </div>
    </div>

    <!-- Digital Receipt Modal -->
    <div id="receipt-modal" class="modal-overlay">
        <div class="modal-content text-center max-w-md">
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                <i data-lucide="check" class="w-8 h-8"></i>
            </div>
            <h3 class="font-heading text-2xl font-bold text-stone-900 mb-1">Order Sent to Kitchen!</h3>
            <p class="text-xs text-stone-500 mb-6">Our chefs are preparing your dishes fresh to order.</p>

            <div class="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-left mb-6 space-y-3 font-mono text-xs">
                <div class="flex justify-between border-b border-stone-200 pb-2">
                    <span class="text-stone-500">Order Token:</span>
                    <span id="receipt-order-code" class="text-amber-700 font-bold text-sm">LUM-0000</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-stone-500">Guest Name:</span>
                    <span id="receipt-customer-name" class="text-stone-900 font-medium">Guest</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-stone-500">Service Location:</span>
                    <span id="receipt-order-table" class="text-stone-900 font-medium">Table T2</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-stone-500">Estimated Ready:</span>
                    <span class="text-emerald-700 font-bold">10 - 12 Minutes</span>
                </div>
                <div class="flex justify-between border-t border-stone-200 pt-2 font-bold text-sm">
                    <span class="text-stone-700">Total Paid:</span>
                    <span id="receipt-order-total" class="text-amber-700 font-bold">$0.00</span>
                </div>
            </div>

            <div class="flex gap-3">
                <a href="dashboard.php" class="flex-1 btn-secondary justify-center text-xs py-2.5">
                    Track on Radar
                </a>
                <button class="modal-close-btn flex-1 btn-primary justify-center text-xs py-2.5">
                    Done
                </button>
            </div>
        </div>
    </div>
