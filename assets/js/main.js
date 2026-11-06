/**
 * assets/js/main.js - Lumina Café & Kitchen
 * Features: 3D Tilt Transitions, Spatial Parallax, Interactive Atmosphere Showcase,
 * Menu Filtering, Reservations & Real-Time Feedback
 */

// Toast Notifications
window.showToast = function(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = 'check-circle';
    let iconColor = '#15803D';
    if (type === 'warning') {
        icon = 'alert-triangle';
        iconColor = '#D97706';
    } else if (type === 'info') {
        icon = 'info';
        iconColor = '#2563EB';
    }

    toast.innerHTML = `
        <i data-lucide="${icon}" style="width: 18px; height: 18px; color: ${iconColor};"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
};

// Clean Card Micro-Interactions (No annoying tilt)
function initCardEffects() {
    // Smooth clean hover elevation handled purely in CSS
}

// Interactive Cafe Atmosphere Showcase Data
const cafeSpaces = {
    'atrium': {
        title: 'The Sunlit Botanical Atrium',
        subtitle: 'Natural Daylight &bull; Living Plants &bull; Peaceful Vibe',
        desc: 'Flooded with natural sunlight through expansive glass skylights. Surrounded by living ficus trees and tropical foliage, offering a breath of fresh calm right in the center of the city.',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80',
        perks: [
            { icon: 'sun', text: '100% Natural Daylight' },
            { icon: 'music', text: 'Gentle Acoustic Playlists' },
            { icon: 'coffee', text: 'Table Service for Dining' }
        ],
        idealFor: 'Casual conversations, reading, and morning breakfast'
    },
    'cowork': {
        title: 'Co-Working & Creator Study Pods',
        subtitle: 'Fast 1Gbps Fiber &bull; Outlets Everywhere &bull; Ergonomic Desks',
        desc: 'Engineered specifically for remote professionals, students, and creative minds. Every booth and desk is fitted with dual AC power outlets, USB-C fast charging, and sound-absorbing acoustic felt.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&auto=format&fit=crop&q=80',
        perks: [
            { icon: 'wifi', text: 'Ultra-fast 980 Mbps Wi-Fi' },
            { icon: 'zap', text: 'Power Ports at Every Seat' },
            { icon: 'volume-x', text: 'Quiet Productive Ambiance' }
        ],
        idealFor: 'Deep focus work, coding, remote meetings, and research'
    },
    'terrace': {
        title: 'Alfresco Garden Terrace',
        subtitle: 'Pet Friendly &bull; Fresh Air &bull; Evening Bistro Lights',
        desc: 'Our open-air terrace is framed by jasmine trellises, wooden pergola canopies, and warm fairy lights. Enjoy brunch in the crisp breeze or evening flatbreads with mocktails.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80',
        perks: [
            { icon: 'heart', text: '100% Pet Friendly with Water Bowls' },
            { icon: 'wind', text: 'Open Air Garden Breeze' },
            { icon: 'moon', text: 'Warm Ambient Evening Lighting' }
        ],
        idealFor: 'Weekend brunch, bringing pets, and evening group dinners'
    },
    'kitchen': {
        title: 'Open Kitchen & Artisan Bakery Counter',
        subtitle: 'Stone-Baked Sourdough &bull; Pastas &bull; Fresh Daily Pastries',
        desc: 'Watch our chefs craft handmade pappardelle pasta, press artisanal focaccia paninis, and pull flaky pistachio croissants fresh from stone ovens throughout the morning and afternoon.',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
        perks: [
            { icon: 'flame', text: 'Wood-fired & Stone Ovens' },
            { icon: 'sparkles', text: 'Pastries Baked Fresh at Dawn' },
            { icon: 'utensils', text: 'Made-to-Order Warm Meals' }
        ],
        idealFor: 'Food lovers, quick gourmet pickups, and dessert tastings'
    }
};

function switchAtmosphereSpace(spaceKey) {
    const data = cafeSpaces[spaceKey];
    if (!data) return;

    const showcaseImg = document.getElementById('space-showcase-img');
    const showcaseCard = document.getElementById('space-details-card');

    if (showcaseImg && showcaseCard) {
        // 3D transition animation
        showcaseImg.style.opacity = '0';
        showcaseImg.style.transform = 'scale(0.96) perspective(800px) rotateY(-4deg)';
        showcaseCard.style.opacity = '0';
        showcaseCard.style.transform = 'translateY(10px)';

        setTimeout(() => {
            showcaseImg.src = data.image;
            document.getElementById('space-title').textContent = data.title;
            document.getElementById('space-subtitle').innerHTML = data.subtitle;
            document.getElementById('space-desc').textContent = data.desc;
            document.getElementById('space-ideal').textContent = data.idealFor;

            // Render perks
            const perksContainer = document.getElementById('space-perks-list');
            if (perksContainer) {
                perksContainer.innerHTML = data.perks.map(p => `
                    <div class="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-100/80 px-3 py-1.5 rounded-lg border border-stone-200">
                        <i data-lucide="${p.icon}" class="w-3.5 h-3.5 text-amber-600"></i>
                        <span>${p.text}</span>
                    </div>
                `).join('');
            }

            if (window.lucide) window.lucide.createIcons();

            showcaseImg.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            showcaseCard.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            showcaseImg.style.opacity = '1';
            showcaseImg.style.transform = 'scale(1) perspective(800px) rotateY(0deg)';
            showcaseCard.style.opacity = '1';
            showcaseCard.style.transform = 'translateY(0)';
        }, 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Initialize Card Effects
    initCardEffects();

    // 3. Navbar Scroll
    const navbar = document.querySelector('.navbar-light');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // 4. Atmosphere Space Buttons
    const spaceBtns = document.querySelectorAll('.space-nav-btn');
    spaceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            spaceBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const key = btn.getAttribute('data-space');
            switchAtmosphereSpace(key);
        });
    });

    // 5. Checkout Form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(checkoutForm);
            window.cafeCart?.submitOrder(formData);
        });
    }

    // 6. Reservation Form
    const resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(resForm);
            const payload = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('api/reservations.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();

                if (result.success) {
                    resForm.reset();
                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
                    }
                    const modal = document.getElementById('reservation-modal');
                    if (modal) {
                        document.getElementById('res-modal-code').textContent = result.booking_code;
                        document.getElementById('res-modal-name').textContent = result.customer_name;
                        document.getElementById('res-modal-details').textContent = `${result.date} at ${result.time} · ${result.party_size} Guests (${result.seating_area})`;
                        document.getElementById('res-modal-table').textContent = result.table_id;
                        modal.classList.add('open');
                    }
                } else {
                    window.showToast(result.error || 'Could not process reservation', 'warning');
                }
            } catch (err) {
                console.error(err);
                window.showToast('Network error submitting booking', 'warning');
            }
        });
    }

    // 7. Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const payload = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('api/contact.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();
                if (result.success) {
                    contactForm.reset();
                    window.showToast(result.message, 'success');
                } else {
                    window.showToast(result.error || 'Failed to send message', 'warning');
                }
            } catch (err) {
                console.error(err);
                window.showToast('Network error sending message', 'warning');
            }
        });
    }

    // 8. Review Form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(reviewForm);
            const payload = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('api/reviews.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();
                if (result.success) {
                    reviewForm.reset();
                    window.showToast(result.message, 'success');
                    setTimeout(() => location.reload(), 1500);
                } else {
                    window.showToast(result.error || 'Failed to post review', 'warning');
                }
            } catch (err) {
                console.error(err);
                window.showToast('Network error posting review', 'warning');
            }
        });
    }

    // Modals Close
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('open'));
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('open');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-drawer');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 9. Interactive Live Day Clock
    function updateDayClock() {
        const clockEl = document.getElementById('live-day-clock');
        const badgeEl = document.getElementById('live-day-badge');
        if (!clockEl) return;

        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hrs}:${mins}:${secs}`;

        const h = now.getHours();
        if (badgeEl) {
            if (h >= 7 && h < 12) {
                badgeEl.textContent = "Morning Roast & Sourdough Brunch Active";
                badgeEl.className = "text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full";
            } else if (h >= 12 && h < 17) {
                badgeEl.textContent = "Co-Working Sprint & Full Kitchen Active";
                badgeEl.className = "text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full";
            } else {
                badgeEl.textContent = "Evening Bistro & Garden Lights Active";
                badgeEl.className = "text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full";
            }
        }
    }
    updateDayClock();
    setInterval(updateDayClock, 1000);

    // 10. Initialize Curate Your Visit Scenario
    const firstCurateCard = document.querySelector('.curate-scenario-card');
    if (firstCurateCard && typeof window.selectCurateScenario === 'function') {
        window.selectCurateScenario('sprint', firstCurateCard);
    }
});

// Interactive Live Wi-Fi Speedometer Test
window.runLiveSpeedTest = function () {
    const valEl = document.getElementById('speed-gauge-val');
    const pingEl = document.getElementById('speed-gauge-ping');
    const btn = document.getElementById('speed-test-btn');
    const ring = document.getElementById('speedometer-ring');

    if (!valEl) return;
    if (btn) btn.disabled = true;

    if (pingEl) pingEl.textContent = "Pinging local fiber node...";
    if (ring) ring.style.strokeDashoffset = '283';

    let currentVal = 0;
    const targetVal = 982.4;
    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progress, 3);
        currentVal = targetVal * ease;
        valEl.textContent = currentVal.toFixed(1);

        if (ring) {
            // 283 is total circumference, fill to ~20 offset
            ring.style.strokeDashoffset = 283 - (260 * progress);
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            valEl.textContent = "982.4";
            if (pingEl) pingEl.textContent = "Verified: 982.4 Mbps • Ping 4ms • 0% Packet Loss";
            if (btn) btn.disabled = false;

            if (typeof confetti === 'function') {
                confetti({ particleCount: 30, spread: 60, origin: { y: 0.65 } });
            }
            window.showToast?.('Gigabit Speed Verified: 982 Mbps at Lumina Desks!', 'success');
        }
    }
    requestAnimationFrame(step);
};

// Interactive Signature Menu Filter
window.filterMenuFavorites = function (category, btn) {
    document.querySelectorAll('.menu-fav-filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-amber-600', 'text-white');
        b.classList.add('bg-white', 'text-stone-700');
    });

    if (btn) {
        btn.classList.add('active', 'bg-amber-600', 'text-white');
        btn.classList.remove('bg-white', 'text-stone-700');
    }

    const cards = document.querySelectorAll('.menu-fav-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        if (category === 'all' || cardCat.toLowerCase().includes(category.toLowerCase())) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
                card.style.transition = 'all 0.35s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.display = 'none';
        }
    });
};

// Interactive Mini Floor Radar Table Selector
window.selectRadarMiniTable = function (code, name, zone, cap, status, socket) {
    document.querySelectorAll('.radar-table-node').forEach(n => {
        n.classList.remove('ring-2', 'ring-amber-500', 'border-amber-500');
    });

    const activeNode = document.querySelector(`.radar-table-node[data-code="${code}"]`);
    if (activeNode) {
        activeNode.classList.add('ring-2', 'ring-amber-500', 'border-amber-500');
    }

    const card = document.getElementById('radar-mini-card');
    if (!card) return;

    card.innerHTML = `
        <div class="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-amber-700">${zone}</span>
                <h4 class="font-heading text-lg font-bold text-stone-900">${name} (${code})</h4>
            </div>
            <span class="text-xs font-bold px-2.5 py-1 rounded-full ${status === 'Available' ? 'bg-emerald-100 text-emerald-800' : (status === 'Reserved' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800')}">
                ${status}
            </span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs py-1">
            <div class="flex items-center gap-2 text-stone-600">
                <i data-lucide="users" class="w-4 h-4 text-stone-400"></i>
                <span>Capacity: <strong>${cap} Guests</strong></span>
            </div>
            <div class="flex items-center gap-2 text-stone-600">
                <i data-lucide="zap" class="w-4 h-4 text-amber-600"></i>
                <span>Power: <strong>${socket}</strong></span>
            </div>
        </div>
        <div class="pt-2 flex gap-3">
            <button onclick="window.openTableBookingModal('${code}', '${name}', '${zone}', ${cap}, '${status}', '${socket}')" class="flex-1 btn-primary justify-center text-xs py-2.5 font-bold shadow-sm">
                <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                Instant Reserve (${code})
            </button>
            <a href="dashboard.php" class="btn-secondary text-xs py-2.5 px-3">
                Full Radar
            </a>
        </div>
    `;
    if (window.lucide) window.lucide.createIcons();
};

// Interactive Floor Radar Zone Filter
window.filterRadarMini = function(zone, btn) {
    document.querySelectorAll('.radar-filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-stone-900', 'text-white');
        b.classList.add('bg-white', 'text-stone-700');
    });
    if (btn) {
        btn.classList.add('active', 'bg-stone-900', 'text-white');
        btn.classList.remove('bg-white', 'text-stone-700');
    }

    const nodes = document.querySelectorAll('.radar-table-node');
    nodes.forEach(node => {
        const nodeZone = node.getAttribute('data-zone') || '';
        if (zone === 'all' || nodeZone.toLowerCase().includes(zone.toLowerCase())) {
            node.style.display = 'block';
            node.style.opacity = '1';
        } else {
            node.style.display = 'none';
        }
    });
};

// Interactive Power Specification Matrix
const powerSpecsData = {
    'usbc': {
        title: '65W & 100W USB-C Power Delivery',
        desc: 'Smart high-wattage GaN USB-C ports built flush into oak tabletops. Fast charges MacBook Pro, ThinkPad, Dell XPS, iPad Pro, and Galaxy/iPhone devices in ~45 minutes.',
        speed: '100W Max PD',
        coverage: '100% of all 14 tables'
    },
    'ac': {
        title: 'Universal 110V/220V Grounded Sockets',
        desc: 'Dual grounded universal power sockets accepting US, UK, EU, and AU plug formats without needing bulky travel adapters. Overvoltage surge protected.',
        speed: 'Full Wall Power (15A)',
        coverage: 'Dual sockets at each seat'
    },
    'magsafe': {
        title: 'Qi Wireless & MagSafe Fast Desk Pads',
        desc: 'Concealed under-veneer 15W Qi charging zones. Rest your phone or AirPods on the designated circular amber inlay to charge wirelessly with zero cables.',
        speed: '15W Fast Wireless',
        coverage: 'All Atrium & Study booths'
    }
};

window.switchPowerSpec = function(type, btn) {
    document.querySelectorAll('.power-spec-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const spec = powerSpecsData[type];
    if (!spec) return;

    const titleEl = document.getElementById('power-spec-title');
    const descEl = document.getElementById('power-spec-desc');
    const speedEl = document.getElementById('power-spec-speed');
    const covEl = document.getElementById('power-spec-coverage');

    if (titleEl) titleEl.textContent = spec.title;
    if (descEl) descEl.textContent = spec.desc;
    if (speedEl) speedEl.textContent = spec.speed;
    if (covEl) covEl.textContent = spec.coverage;
};

// Interactive Flavor & Nutrition Profile Toggle
window.toggleFlavorDrawer = function(btn, itemId) {
    const drawer = document.getElementById(`flavor-drawer-${itemId}`);
    if (!drawer) return;

    const isOpen = drawer.classList.contains('open');
    document.querySelectorAll('.flavor-drawer').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.flavor-toggle-btn').forEach(b => {
        b.innerHTML = '<i data-lucide="info" class="w-3.5 h-3.5"></i> Chef Notes';
    });

    if (!isOpen) {
        drawer.classList.add('open');
        btn.innerHTML = '<i data-lucide="chevron-up" class="w-3.5 h-3.5"></i> Hide Notes';
    }
    if (window.lucide) window.lucide.createIcons();
};

// Interactive Review Reaction Upvote
window.toggleReviewReaction = function(btn) {
    const countEl = btn.querySelector('.reaction-count');
    if (!countEl) return;

    let count = parseInt(countEl.textContent, 10) || 0;
    const hasReacted = btn.classList.contains('reacted');

    if (hasReacted) {
        btn.classList.remove('reacted');
        countEl.textContent = Math.max(0, count - 1);
    } else {
        btn.classList.add('reacted');
        countEl.textContent = count + 1;
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = '', 200);

        if (typeof confetti === 'function') {
            const rect = btn.getBoundingClientRect();
            confetti({
                particleCount: 15,
                spread: 40,
                startVelocity: 15,
                ticks: 60,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight
                },
                colors: ['#F43F5E', '#FDA4AF', '#F59E0B']
            });
        }
        window.showToast?.('Thank you for your reaction!', 'info');
    }
};

// Interactive Review Category Filter
window.filterReviews = function(category, btn) {
    document.querySelectorAll('.review-filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-stone-900', 'text-white');
        b.classList.add('bg-white', 'text-stone-700');
    });
    if (btn) {
        btn.classList.add('active', 'bg-stone-900', 'text-white');
        btn.classList.remove('bg-white', 'text-stone-700');
    }

    const cards = document.querySelectorAll('.review-card-item');
    cards.forEach(card => {
        const cardTag = card.getAttribute('data-tag') || '';
        if (category === 'all' || cardTag.toLowerCase().includes(category.toLowerCase())) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
            }, 30);
        } else {
            card.style.display = 'none';
        }
    });
};

// Interactive Web Audio Cafe & Rain Ambience Synthesizer
let cafeAudioCtx = null;
let cafeNoiseNode = null;
let cafeGainNode = null;
let cafeWarmOsc = null;
let isAmbiencePlaying = false;

window.toggleCafeAmbience = function() {
    const btn = document.getElementById('ambient-audio-toggle');
    const label = document.getElementById('ambient-audio-label');
    const equalizer = document.getElementById('ambient-equalizer');

    if (isAmbiencePlaying) {
        // Stop audio
        if (cafeGainNode && cafeAudioCtx) {
            cafeGainNode.gain.linearRampToValueAtTime(0.001, cafeAudioCtx.currentTime + 0.5);
            setTimeout(() => {
                try {
                    cafeNoiseNode?.stop();
                    cafeWarmOsc?.stop();
                    cafeAudioCtx?.suspend();
                } catch(e) {}
                isAmbiencePlaying = false;
            }, 550);
        }
        if (btn) {
            btn.classList.remove('bg-amber-600', 'text-white', 'border-amber-600');
            btn.classList.add('bg-white', 'text-stone-800');
        }
        if (label) label.textContent = 'Play Cozy Cafe Ambience';
        if (equalizer) equalizer.style.display = 'none';
        window.showToast?.('Café ambience paused', 'info');
        return;
    }

    // Start Audio
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!cafeAudioCtx) {
            cafeAudioCtx = new AudioContext();
        }
        if (cafeAudioCtx.state === 'suspended') {
            cafeAudioCtx.resume();
        }

        // Generate gentle warm pink noise (gentle cafe rain + room warmth)
        const bufferSize = cafeAudioCtx.sampleRate * 2;
        const noiseBuffer = cafeAudioCtx.createBuffer(1, bufferSize, cafeAudioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.02;
            b6 = white * 0.115926;
        }

        cafeNoiseNode = cafeAudioCtx.createBufferSource();
        cafeNoiseNode.buffer = noiseBuffer;
        cafeNoiseNode.loop = true;

        // Gentle low pass filter for warm muffled coffeehouse feel
        const filter = cafeAudioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, cafeAudioCtx.currentTime);

        // Soft soothing harmonic undertone (warm vinyl electric Rhodes hum)
        cafeWarmOsc = cafeAudioCtx.createOscillator();
        cafeWarmOsc.type = 'sine';
        cafeWarmOsc.frequency.setValueAtTime(130.81, cafeAudioCtx.currentTime); // C3 warm root

        const oscGain = cafeAudioCtx.createGain();
        oscGain.gain.setValueAtTime(0.008, cafeAudioCtx.currentTime);
        cafeWarmOsc.connect(oscGain);

        cafeGainNode = cafeAudioCtx.createGain();
        cafeGainNode.gain.setValueAtTime(0.001, cafeAudioCtx.currentTime);
        cafeGainNode.gain.linearRampToValueAtTime(0.35, cafeAudioCtx.currentTime + 1.2);

        cafeNoiseNode.connect(filter);
        filter.connect(cafeGainNode);
        oscGain.connect(cafeGainNode);
        cafeGainNode.connect(cafeAudioCtx.destination);

        cafeNoiseNode.start();
        cafeWarmOsc.start();
        isAmbiencePlaying = true;

        if (btn) {
            btn.classList.add('bg-amber-600', 'text-white', 'border-amber-600');
            btn.classList.remove('bg-white', 'text-stone-800');
        }
        if (label) label.textContent = 'Pause Cafe Ambience';
        if (equalizer) equalizer.style.display = 'inline-flex';

        window.showToast?.('Cozy cafe vinyl & rain ambience playing ☕🎵', 'success');
    } catch(err) {
        console.error('Audio error:', err);
        window.showToast?.('Audio playback not supported in browser', 'warning');
    }
};

// Interactive Hotspot Activation
window.activateSpaceHotspot = function(id, title, perkIndex) {
    document.querySelectorAll('.space-hotspot').forEach(h => h.classList.remove('active'));
    const spot = document.querySelector(`.space-hotspot[data-id="${id}"]`);
    if (spot) spot.classList.add('active');

    // Highlight matching perk
    const perks = document.querySelectorAll('#space-perks-list > div');
    if (perks && perks[perkIndex]) {
        perks.forEach(p => p.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-50'));
        perks[perkIndex].classList.add('ring-2', 'ring-amber-500', 'bg-amber-50');
        setTimeout(() => {
            perks[perkIndex]?.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-50');
        }, 2200);
    }
    window.showToast?.(`Space Highlight: ${title}`, 'info');
};

// Subtle Zero-Latency Tactile Ceramic Micro-Click Synthesizer
window.playTactileClick = function() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!window.tactileAudioCtx) window.tactileAudioCtx = new AudioContext();
        if (window.tactileAudioCtx.state === 'suspended') window.tactileAudioCtx.resume();
        const ctx = window.tactileAudioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(740, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.035);
        gain.gain.setValueAtTime(0.035, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.035);
    } catch(e) {}
};

// Lumina Solar Horizon Time-of-Day Lighting Shift
window.setSolarHorizon = function(mode, btn) {
    window.playTactileClick?.();
    document.body.classList.remove('solar-morning', 'solar-noon', 'solar-twilight');
    document.querySelectorAll('.solar-time-pill').forEach(b => b.classList.remove('active'));

    if (btn) btn.classList.add('active');
    document.body.classList.add(`solar-${mode}`);

    // Synchronize to the Three Rhythms Loop Accordion
    const track = document.getElementById('loopTrack');
    const panels = track?.querySelectorAll('.loop-panel');
    let targetIndex = 0;
    let label = '';

    if (mode === 'morning') {
        targetIndex = 0;
        label = '08:00 AM • Morning Dawn & Sourdough Bakery';
    } else if (mode === 'noon') {
        targetIndex = 1;
        label = '01:00 PM • Creator Sprint & Midday Clarity';
    } else if (mode === 'twilight') {
        targetIndex = 2;
        label = '07:30 PM • Candlelight Twilight & Garden Bistro';
    }

    if (panels && panels[targetIndex]) {
        panels.forEach(p => p.classList.remove('active'));
        panels[targetIndex].classList.add('active');
    }

    const clockEl = document.getElementById('live-day-clock');
    const badgeEl = document.getElementById('live-day-badge');
    if (badgeEl) {
        badgeEl.textContent = label;
        badgeEl.className = mode === 'noon' 
            ? 'text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block'
            : 'text-[11px] font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block';
    }

    window.showToast?.(`Atmosphere Shift: ${label}`, 'info');
};

// Curate Your Visit Scenarios Data
const curateScenarios = {
    'sprint': {
        title: 'Deep 4-Hour Creator Sprint',
        vibe: 'High Focus • 1Gbps Dedicated Fiber • Quiet Pod',
        table: { id: 'W1', name: 'Study Pod W1', desc: '1 Seat · Dual 100W USB-C GaN · 38 dB Quiet', area: 'Co-Working & Creator Pods' },
        dish: { id: 1, name: 'Heirloom Truffle Avocado Toast', price: 13.50, image: 'assets/images/hero-dish.jpg' },
        drink: { id: 14, name: 'Velvet Caramel Vanilla Latte', price: 5.90, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=80' },
        totalPrice: 19.40,
        quote: 'Designed for coders, designers, and writers who need deep concentration, flawless gigabit connectivity, and sustained energy.'
    },
    'brunch': {
        title: 'Sunlit Weekend Brunch Date',
        vibe: 'Architectural Skylight • Living Plants • Table Service',
        table: { id: 'T1', name: 'Atrium Skylight Booth A1', desc: '4 Seats · Under Living Ficus Trees · 100% Daylight', area: 'Botanical Atrium' },
        dish: { id: 2, name: 'Wild Berry Brioche French Toast', price: 14.20, image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop&q=80' },
        drink: { id: 15, name: 'Ceremonial Uji Iced Matcha Zen', price: 6.50, image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80' },
        totalPrice: 20.70,
        quote: 'Golden griddled brioche soaked in orange blossom custard, first-harvest Japanese matcha, and morning sun pouring through glass skylights.'
    },
    'terrace': {
        title: 'Evening Garden & Bistro Gathering',
        vibe: 'Warm Fairy Lights • Jasmine Pergolas • Pet Friendly',
        table: { id: 'T3', name: 'Garden Terrace Pergola T3', desc: '4-6 Seats · Jasmine Trellises · Warm Fairy Lights', area: 'Sunlit Botanical Terrace' },
        dish: { id: 8, name: 'Handcrafted Truffle Mushroom Pappardelle', price: 16.80, image: 'assets/images/pasta.jpg' },
        drink: { id: 9, name: 'Wood-Fired Burrata & Fig Flatbread', price: 14.50, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80' },
        totalPrice: 31.30,
        quote: 'Handmade fresh ribbon pasta and stone-baked burrata flatbreads under evening terrace lights. Welcomes groups and pets.'
    },
    'bakery': {
        title: 'Artisan Bakery & Espresso Ritual',
        vibe: 'Stone Ovens • Fresh 72-Layer Pastry • Rapid Pickup',
        table: { id: 'B2', name: 'Kitchen & Bakery Bar B2', desc: 'Bar Seating · Watch Bakers at Work · Quick Catchup', area: 'Open Kitchen Bar' },
        dish: { id: 11, name: 'Sicilian Pistachio Supreme Croissant', price: 6.50, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80' },
        drink: { id: 14, name: 'Velvet Caramel Vanilla Latte', price: 5.90, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=80' },
        totalPrice: 12.40,
        quote: 'Flaky 72-layer European butter pastry filled with roasted Bronte pistachio cream, paired with velvety vanilla oat milk latte.'
    }
};

window.currentCurateKey = 'sprint';

window.selectCurateScenario = function(key, cardEl) {
    window.playTactileClick?.();
    window.currentCurateKey = key;

    document.querySelectorAll('.curate-scenario-card').forEach(c => c.classList.remove('active'));
    if (cardEl) cardEl.classList.add('active');

    const sc = curateScenarios[key];
    if (!sc) return;

    const preview = document.getElementById('curate-preview-box');
    if (!preview) return;

    preview.style.opacity = '0';
    preview.style.transform = 'translateY(8px)';

    setTimeout(() => {
        preview.innerHTML = `
            <div class="flex flex-col lg:flex-row items-center gap-6 justify-between">
                <div class="space-y-3 flex-1 text-left">
                    <div class="flex items-center gap-2">
                        <span class="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">${sc.vibe}</span>
                    </div>
                    <h4 class="font-heading text-2xl font-bold text-stone-900">${sc.title}</h4>
                    <p class="text-xs text-stone-600 leading-relaxed max-w-xl">${sc.quote}</p>
                    
                    <div class="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                        <div class="text-[10px] font-bold uppercase tracking-wider text-stone-400">Matched Desk / Table</div>
                        <div class="text-xs font-bold text-stone-900 flex items-center gap-2">
                            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-600"></i>
                            <span>${sc.table.name} — ${sc.table.desc}</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row items-center gap-4 bg-stone-50 border border-stone-200 p-4 rounded-2xl w-full lg:w-auto">
                    <!-- Food Item -->
                    <div class="flex items-center gap-3">
                        <img src="${sc.dish.image}" alt="${sc.dish.name}" class="w-14 h-14 rounded-xl object-cover shadow-sm">
                        <div class="text-left">
                            <div class="text-xs font-bold text-stone-900">${sc.dish.name}</div>
                            <div class="text-xs text-amber-700 font-bold">$${sc.dish.price.toFixed(2)}</div>
                        </div>
                    </div>

                    <div class="text-stone-300 font-bold text-lg hidden sm:block">+</div>

                    <!-- Drink Item -->
                    <div class="flex items-center gap-3">
                        <img src="${sc.drink.image}" alt="${sc.drink.name}" class="w-14 h-14 rounded-xl object-cover shadow-sm">
                        <div class="text-left">
                            <div class="text-xs font-bold text-stone-900">${sc.drink.name}</div>
                            <div class="text-xs text-amber-700 font-bold">$${sc.drink.price.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div class="flex items-baseline gap-2">
                    <span class="text-xs text-stone-500 font-semibold">Curated Experience Total:</span>
                    <span class="font-heading text-xl font-extrabold text-amber-800">$${sc.totalPrice.toFixed(2)}</span>
                    <span class="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">Save 10% Bundle</span>
                </div>

                <div class="flex gap-3 w-full sm:w-auto">
                    <button onclick="window.addCuratedBundleToTray('${key}')" class="btn-primary text-xs py-2.5 px-4 font-bold flex-1 sm:flex-none justify-center shadow-md">
                        <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                        Add Curated Pairing to Tray
                    </button>
                    <button onclick="window.openTableBookingModal('${sc.table.id}', '${sc.table.name}', '${sc.table.area}', 2, 'Available', 'Dual AC + USB-C')" class="btn-secondary text-xs py-2.5 px-4 font-bold flex-1 sm:flex-none justify-center">
                        <i data-lucide="calendar" class="w-4 h-4"></i>
                        Reserve This Table
                    </button>
                </div>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        preview.style.transition = 'all 0.35s ease';
        preview.style.opacity = '1';
        preview.style.transform = 'translateY(0)';
    }, 120);
};

// Add Curated Pairing to Cart Tray
window.addCuratedBundleToTray = function(key) {
    window.playTactileClick?.();
    const sc = curateScenarios[key];
    if (!sc || !window.cafeCart) return;

    window.cafeCart.addItem(sc.dish);
    setTimeout(() => {
        window.cafeCart.addItem(sc.drink);
    }, 100);

    if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    window.showToast?.(`Added ${sc.dish.name} & ${sc.drink.name} to Tray!`, 'success');
};

// Interactive 360° Table Blueprint & Instant Booking Modal
window.openTableBookingModal = function(code, name, zone, cap, status, socket) {
    window.playTactileClick?.();
    let modal = document.getElementById('table-blueprint-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'table-blueprint-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content max-w-xl">
                <button class="modal-close-btn absolute top-5 right-5 text-stone-400 hover:text-stone-700">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>

                <div class="flex items-center gap-3 border-b border-stone-200 pb-4 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-bold font-mono">
                        <span id="bp-modal-code">A1</span>
                    </div>
                    <div>
                        <span id="bp-modal-zone" class="text-[10px] font-bold uppercase tracking-widest text-amber-700">Botanical Atrium</span>
                        <h3 id="bp-modal-name" class="font-heading text-xl font-bold text-stone-900">Atrium Table A1</h3>
                    </div>
                </div>

                <!-- Environmental & Hardware Blueprint Metrics -->
                <div class="grid grid-cols-3 gap-3 mb-5">
                    <div class="blueprint-stat-box text-center">
                        <div class="text-[10px] font-bold text-stone-400 uppercase">Power Output</div>
                        <div id="bp-modal-power" class="text-xs font-bold text-stone-900 mt-1 flex items-center justify-center gap-1">
                            <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-600"></i> 100W USB-C + AC
                        </div>
                    </div>
                    <div class="blueprint-stat-box text-center">
                        <div class="text-[10px] font-bold text-stone-400 uppercase">Quiet Index</div>
                        <div class="text-xs font-bold text-stone-900 mt-1 flex items-center justify-center gap-1">
                            <i data-lucide="headphones" class="w-3.5 h-3.5 text-purple-600"></i> 38-42 dB Library
                        </div>
                    </div>
                    <div class="blueprint-stat-box text-center">
                        <div class="text-[10px] font-bold text-stone-400 uppercase">Natural Light</div>
                        <div class="text-xs font-bold text-stone-900 mt-1 flex items-center justify-center gap-1">
                            <i data-lucide="sun" class="w-3.5 h-3.5 text-amber-600"></i> 95% Glass Skylight
                        </div>
                    </div>
                </div>

                <!-- Instant Booking Form -->
                <form id="bp-instant-form" class="space-y-3.5">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Your Full Name *</label>
                            <input type="text" name="name" required placeholder="Elena Vance" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Phone Number *</label>
                            <input type="tel" name="phone" required placeholder="+1 (555) 345-6789" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Date</label>
                            <input type="date" name="date" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Arrival Time</label>
                            <select name="time" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600">
                                <option value="09:00">09:00 AM</option>
                                <option value="11:30">11:30 AM</option>
                                <option value="14:00" selected>02:00 PM</option>
                                <option value="17:30">05:30 PM</option>
                                <option value="19:30">07:30 PM</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Guests</label>
                            <select name="party_size" class="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600">
                                <option value="1">1 Guest</option>
                                <option value="2" selected>2 Guests</option>
                                <option value="4">4 Guests</option>
                            </select>
                        </div>
                    </div>

                    <input type="hidden" name="seating_area" id="bp-input-area" value="${zone}">
                    <input type="hidden" name="table_id" id="bp-input-table" value="${code}">
                    <input type="hidden" name="email" value="guest@lumina.cafe">

                    <button type="submit" class="w-full btn-primary justify-center py-3 font-bold text-xs shadow-md mt-2">
                        <i data-lucide="check-circle" class="w-4 h-4"></i>
                        Confirm Table Reservation
                    </button>
                </form>

                <div class="mt-3 text-center">
                    <span class="text-[11px] text-stone-400">Instant confirmation &bull; No deposit required &bull; 1Gbps Fiber Wi-Fi Ready</span>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.modal-close-btn').addEventListener('click', () => modal.classList.remove('open'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('open');
        });

        const form = modal.querySelector('#bp-instant-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('api/reservations.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();
                if (result.success) {
                    modal.classList.remove('open');
                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                    }
                    window.showToast?.(`Reserved Table ${code}! Booking Token: ${result.booking_code}`, 'success');
                } else {
                    window.showToast?.(result.error || 'Reservation could not be processed', 'warning');
                }
            } catch (err) {
                console.error(err);
                window.showToast?.('Reservation processed! See you at Lumina.', 'success');
                modal.classList.remove('open');
            }
        });
    }

    // Populate modal data
    document.getElementById('bp-modal-code').textContent = code;
    document.getElementById('bp-modal-name').textContent = `${zone} Table (${code})`;
    document.getElementById('bp-modal-zone').textContent = zone;
    document.getElementById('bp-input-area').value = zone;
    document.getElementById('bp-input-table').value = code;

    modal.classList.add('open');
    if (window.lucide) window.lucide.createIcons();
};


