<?php
// contact.php - Lumina Concierge, Location, Work Amenities & Tasting Reviews
$pageTitle = "Contact & Location";
$activeNav = "contact";

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

include __DIR__ . '/includes/header.php';
?>

<section class="py-14 bg-stone-100/70 border-b border-stone-200">
    <div class="container text-center max-w-2xl space-y-3">
        <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.25em]">Visit & Connect</span>
        <h1 class="font-heading text-4xl sm:text-5xl text-stone-900 font-extrabold">Contact & Concierge</h1>
        <p class="text-stone-600 text-sm">
            Reach out for team bookings, private evening events, or share your dining and study experience with us.
        </p>
    </div>
</section>

<section class="py-12">
    <div class="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Contact & Review Forms (7 cols) -->
        <div class="lg:col-span-7 space-y-8">
            <!-- Contact Message Box -->
            <div class="bg-white border border-stone-200 rounded-3xl p-8 space-y-6 shadow-sm">
                <div>
                    <h3 class="font-heading text-2xl text-stone-900 font-bold">Send Concierge a Message</h3>
                    <p class="text-xs text-stone-500 mt-1">We respond within 24 hours &bull; Logged directly to database</p>
                </div>

                <form id="contact-form" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Your Full Name *</label>
                            <input type="text" name="name" required placeholder="Elena Vance" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                            <input type="email" name="email" required placeholder="elena@example.com" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Inquiry Type</label>
                        <select name="subject" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                            <option value="General Question">General Inquiry & Work Hours</option>
                            <option value="Team Event Booking">Team Work Session or Meeting Booking</option>
                            <option value="Private Buyout">Private Event & Evening Terrace Buyout</option>
                            <option value="Catering">Office Catering & Pastry Boxes</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Your Message *</label>
                        <textarea name="message" required rows="4" placeholder="How can our team make your visit exceptional?..." class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"></textarea>
                    </div>

                    <button type="submit" class="w-full btn-primary justify-center py-3.5 font-bold tracking-wide text-sm shadow-sm">
                        <i data-lucide="send" class="w-4 h-4"></i>
                        Send Message to Concierge
                    </button>
                </form>
            </div>

            <!-- Review / Community Feedback Box -->
            <div class="bg-white border border-stone-200 rounded-3xl p-8 space-y-6 shadow-sm">
                <div>
                    <h3 class="font-heading text-xl font-bold text-stone-900 flex items-center gap-2">
                        <i data-lucide="sparkles" class="w-5 h-5 text-amber-600"></i>
                        Share Your Tasting Review
                    </h3>
                    <p class="text-xs text-stone-500 mt-1">Your review will immediately be featured on our community acclaim wall.</p>
                </div>

                <form id="review-form" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
                            <input type="text" name="name" required placeholder="Marcus Finch" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Dish or Drink Enjoyed *</label>
                            <input type="text" name="item_enjoyed" required placeholder="Truffle Mushroom Pappardelle" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
                        <select name="rating" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600">
                            <option value="5">★★★★★ (5 Stars - Exceptional Experience)</option>
                            <option value="4">★★★★☆ (4 Stars - Great Food & Vibe)</option>
                            <option value="3">★★★☆☆ (3 Stars - Good)</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Your Review Thoughts *</label>
                        <textarea name="comment" required rows="3" placeholder="Tell others about the food, the Wi-Fi speed, the seating, or the atmosphere..." class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"></textarea>
                    </div>

                    <button type="submit" class="btn-secondary py-3 px-6 text-xs font-semibold">
                        Post Tasting Review
                    </button>
                </form>
            </div>
        </div>

        <!-- Location, Hours & Amenities (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
            <div class="bg-white border border-stone-200 rounded-3xl p-6 space-y-5 shadow-sm">
                <h3 class="font-heading text-lg font-bold text-stone-900">Visiting Lumina</h3>

                <div class="space-y-4 text-xs text-stone-700">
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i data-lucide="map-pin" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <div class="text-sm font-bold text-stone-900">Address & Pavilion</div>
                            <div class="text-stone-500 mt-0.5 leading-relaxed">
                                440 Garden Way, Innovation Square<br>
                                Ground Floor Atrium & Botanical Terrace
                            </div>
                        </div>
                    </div>

                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i data-lucide="phone" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <div class="text-sm font-bold text-stone-900">Direct Phone</div>
                            <div class="text-stone-500 mt-0.5 font-mono">+1 (555) 782-9900</div>
                        </div>
                    </div>

                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i data-lucide="mail" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <div class="text-sm font-bold text-stone-900">Concierge Email</div>
                            <div class="text-stone-500 mt-0.5 font-mono">hello@luminacafe.com</div>
                        </div>
                    </div>

                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i data-lucide="car" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <div class="text-sm font-bold text-stone-900">Parking & Bike Racks</div>
                            <div class="text-stone-500 mt-0.5 leading-relaxed">
                                Free 2-hour underground parking validated with any food purchase, plus secure bike racks in front of terrace.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stylized Location Card -->
                <div class="relative h-44 rounded-2xl overflow-hidden border border-stone-200">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80" alt="Neighborhood Map" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center">
                        <div class="w-10 h-10 rounded-full bg-white text-stone-900 flex items-center justify-center mb-2 shadow-md">
                            <i data-lucide="navigation" class="w-5 h-5 text-amber-600"></i>
                        </div>
                        <div class="text-xs font-bold text-white">Innovation Square &bull; Gate 3</div>
                        <div class="text-[10px] text-stone-200">1 min walk from Central Metro & Library</div>
                    </div>
                </div>
            </div>

            <!-- Co-Working Amenities Box -->
            <div class="bg-white border border-stone-200 rounded-3xl p-6 space-y-3 text-xs shadow-sm">
                <h4 class="font-heading text-sm text-stone-900 font-bold uppercase tracking-wider">Workplace Perks Summary</h4>
                <ul class="space-y-2 text-stone-600">
                    <li class="flex items-center gap-2">
                        <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Dedicated 1Gbps Fiber Wi-Fi
                    </li>
                    <li class="flex items-center gap-2">
                        <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Dual AC sockets & USB-C fast charging at all desks
                    </li>
                    <li class="flex items-center gap-2">
                        <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Pet-friendly covered garden terrace with water bowls
                    </li>
                    <li class="flex items-center gap-2">
                        <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Complimentary filtered sparkling & still water bar
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
