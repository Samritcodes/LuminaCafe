<?php
// menu.php - Lumina Food, Brunch, Bowls, Bakery & Beverage Menu
$pageTitle = "Food & Drink Menu | All-Day Kitchen";
$activeNav = "menu";

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

// Fetch all menu items
$menuItems = $pdo->query("SELECT * FROM menu_items ORDER BY id ASC")->fetchAll();

$categories = ['All', 'Dim Sum & Dumplings', 'Breakfast & Brunch', 'Sandwiches & Paninis', 'Gourmet Mains', 'Bakery & Pastries', 'Beverages'];

include __DIR__ . '/includes/header.php';
?>

<!-- Header Banner -->
<section class="py-14 bg-stone-100/70 border-b border-stone-200">
    <div class="container text-center max-w-2xl space-y-3">
        <span class="text-xs font-bold text-amber-700 uppercase tracking-[0.25em]">Farm Sourced &bull; Stone Baked &bull; Handcrafted Daily</span>
        <h1 class="font-heading text-4xl sm:text-5xl text-stone-900 font-extrabold">All-Day Kitchen & Drink Menu</h1>
        <p class="text-stone-600 text-sm">
            From golden brioche French toasts and slow-simmered shakshukas to hand-rolled truffle pasta, artisanal paninis, and European pastries.
        </p>
    </div>
</section>

<!-- Filter & Search Bar Section -->
<section class="py-6 sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
    <div class="container flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Category Filter Buttons -->
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <?php foreach ($categories as $idx => $cat): ?>
                <button class="menu-cat-btn filter-pill whitespace-nowrap <?= $idx === 0 ? 'active' : '' ?>" data-category="<?= $cat ?>">
                    <?= $cat ?>
                </button>
            <?php endforeach; ?>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-72">
            <i data-lucide="search" class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input type="text" id="menu-search-input" placeholder="Search dishes, ingredients, toast..." 
                   class="w-full bg-stone-50 border border-stone-300 rounded-full pl-10 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600">
        </div>
    </div>
</section>

<!-- Menu Items Grid with 3D Tilt Transitions -->
<section class="py-12">
    <div class="container">
        <div id="menu-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <?php foreach ($menuItems as $item): ?>
                <div class="menu-card tilt-card-3d tilt-3d flex flex-col justify-between overflow-hidden group bg-white"
                     data-category="<?= htmlspecialchars($item['category']) ?>"
                     data-name="<?= htmlspecialchars(strtolower($item['name'])) ?>"
                     data-desc="<?= htmlspecialchars(strtolower($item['description'])) ?>">
                    
                    <!-- Item Image & Badges -->
                    <div class="relative h-52 overflow-hidden">
                        <img src="<?= htmlspecialchars($item['image_url']) ?>" alt="<?= htmlspecialchars($item['name']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        
                        <div class="absolute top-3 left-3">
                            <span class="badge-tag badge-amber"><?= htmlspecialchars($item['badge'] ?: $item['category']) ?></span>
                        </div>
                        
                        <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-stone-900 border border-stone-200 shadow-sm">
                            <?= formatPrice($item['price']) ?>
                        </div>

                        <div class="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <i data-lucide="clock" class="w-3 h-3 text-amber-400"></i> <?= $item['prep_time'] ?>
                        </div>
                    </div>

                    <!-- Item Details -->
                    <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                            <div class="flex items-center justify-between text-xs mb-1.5">
                                <span class="text-stone-400 font-semibold uppercase text-[10px] tracking-wider"><?= htmlspecialchars($item['category']) ?></span>
                                <div class="flex items-center gap-1 text-amber-600 font-bold">
                                    <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                                    <span><?= number_format($item['rating'], 2) ?></span>
                                </div>
                            </div>
                            
                            <h3 class="font-heading text-lg font-bold text-stone-900 mb-1.5 group-hover:text-amber-700 transition-colors">
                                <?= htmlspecialchars($item['name']) ?>
                            </h3>
                            
                            <p class="text-stone-500 text-xs leading-relaxed line-clamp-2">
                                <?= htmlspecialchars($item['description']) ?>
                            </p>
                        </div>

                        <!-- Diet & Quick Action -->
                        <div class="space-y-3 pt-3 border-t border-stone-100">
                            <div class="flex items-center justify-between text-[11px] text-stone-500">
                                <span><?= htmlspecialchars($item['dietary']) ?></span>
                                <span class="font-semibold text-stone-700"><?= $item['calories'] ?> kcal</span>
                            </div>

                            <!-- Buttons -->
                            <div class="flex gap-2">
                                <button onclick="openCustomizerModal(<?= htmlspecialchars(json_encode($item)) ?>)" class="flex-1 btn-secondary justify-center text-xs py-2 px-2.5 font-medium">
                                    <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
                                    Customize
                                </button>
                                <button onclick="window.cafeCart.addItem({
                                    id: <?= $item['id'] ?>,
                                    name: '<?= addslashes($item['name']) ?>',
                                    price: <?= $item['price'] ?>,
                                    image: '<?= addslashes($item['image_url']) ?>'
                                })" class="btn-primary text-xs py-2 px-3 font-semibold">
                                    <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div id="no-results-msg" class="text-center py-20 text-stone-400 hidden">
            <i data-lucide="utensils" class="w-12 h-12 mx-auto mb-3 opacity-30"></i>
            <h3 class="text-stone-800 text-lg font-bold">No Dishes Match Your Query</h3>
            <p class="text-xs text-stone-500 mt-1">Try another search keyword or select "All".</p>
        </div>
    </div>
</section>

<!-- Item Customizer Modal -->
<div id="customizer-modal" class="modal-overlay">
    <div class="modal-content max-w-lg">
        <button class="modal-close-btn absolute top-5 right-5 text-stone-400 hover:text-stone-700">
            <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="flex gap-4 items-start mb-6">
            <img id="modal-item-img" src="" alt="Dish" class="w-20 h-20 rounded-xl object-cover border border-stone-200">
            <div>
                <span id="modal-item-category" class="badge-tag badge-amber">Chef Signature</span>
                <h3 id="modal-item-name" class="font-heading text-xl font-bold text-stone-900 mt-1">Dish Name</h3>
                <div id="modal-item-price" class="text-amber-800 font-heading text-lg font-bold mt-0.5">$0.00</div>
            </div>
        </div>

        <div class="space-y-4 text-xs">
            <!-- Portion Size -->
            <div>
                <label class="block font-bold uppercase tracking-wider text-stone-700 mb-2">Portion Size</label>
                <div class="grid grid-cols-2 gap-2">
                    <button class="size-pill filter-pill active text-center py-2 justify-center" data-size="Standard" data-add="0">
                        Standard Portion
                    </button>
                    <button class="size-pill filter-pill text-center py-2 justify-center" data-size="Hearty Platter" data-add="3.50">
                        Hearty Platter (+$3.50)
                    </button>
                </div>
            </div>

            <!-- Bread or Base Preference -->
            <div>
                <label class="block font-bold uppercase tracking-wider text-stone-700 mb-2">Artisan Bread / Base</label>
                <div class="grid grid-cols-3 gap-2">
                    <button class="bread-pill filter-pill active justify-center" data-bread="Country Sourdough">Sourdough</button>
                    <button class="bread-pill filter-pill justify-center" data-bread="Rosemary Focaccia">Focaccia</button>
                    <button class="bread-pill filter-pill justify-center" data-bread="Gluten-Free Seeded">Gluten-Free</button>
                </div>
            </div>

            <!-- Special Chef Instructions -->
            <div>
                <label class="block font-bold uppercase tracking-wider text-stone-700 mb-1">Kitchen Personalization</label>
                <input type="text" id="custom-notes" placeholder="e.g. Dressing on the side, extra crispy, poached soft..." class="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-600">
            </div>

            <button id="modal-add-cart-btn" class="w-full btn-primary justify-center py-3 text-sm font-bold tracking-wide mt-2">
                Add to Tray &bull; <span id="modal-calc-price">$0.00</span>
            </button>
        </div>
    </div>
</div>

<script>
let currentModalItem = null;
let currentSize = 'Standard';
let currentBread = 'Country Sourdough';
let sizeAddon = 0;

function openCustomizerModal(item) {
    currentModalItem = item;
    currentSize = 'Standard';
    currentBread = 'Country Sourdough';
    sizeAddon = 0;

    document.getElementById('modal-item-img').src = item.image_url;
    document.getElementById('modal-item-name').textContent = item.name;
    document.getElementById('modal-item-category').textContent = item.category;
    document.getElementById('modal-item-price').textContent = '$' + parseFloat(item.price).toFixed(2);
    document.getElementById('custom-notes').value = '';

    updateModalPrice();
    document.getElementById('customizer-modal').classList.add('open');
}

function updateModalPrice() {
    if (!currentModalItem) return;
    const finalPrice = parseFloat(currentModalItem.price) + sizeAddon;
    document.getElementById('modal-calc-price').textContent = '$' + finalPrice.toFixed(2);
}

document.querySelectorAll('.size-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentSize = pill.getAttribute('data-size');
        sizeAddon = parseFloat(pill.getAttribute('data-add') || 0);
        updateModalPrice();
    });
});

document.querySelectorAll('.bread-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.bread-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentBread = pill.getAttribute('data-bread');
    });
});

document.getElementById('modal-add-cart-btn')?.addEventListener('click', () => {
    if (!currentModalItem) return;
    const notesInput = document.getElementById('custom-notes').value;
    const finalPrice = parseFloat(currentModalItem.price) + sizeAddon;

    window.cafeCart.addItem({
        id: currentModalItem.id,
        name: currentModalItem.name,
        price: finalPrice,
        image: currentModalItem.image_url,
        size: currentSize,
        milk: currentBread,
        notes: notesInput
    });

    document.getElementById('customizer-modal').classList.remove('open');
});

// Category and Search Filtering
const catBtns = document.querySelectorAll('.menu-cat-btn');
const searchInput = document.getElementById('menu-search-input');
const menuCards = document.querySelectorAll('.menu-card');
const noResults = document.getElementById('no-results-msg');

let activeCategory = 'All';

catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category');
        filterMenu();
    });
});

searchInput?.addEventListener('input', () => {
    filterMenu();
});

function filterMenu() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    menuCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const name = card.getAttribute('data-name');
        const desc = card.getAttribute('data-desc');

        const matchesCat = activeCategory === 'All' || cat.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch = !query || name.includes(query) || desc.includes(query);

        if (matchesCat && matchesSearch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
