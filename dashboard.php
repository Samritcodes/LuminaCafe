<?php
// dashboard.php - Lumina Live Radar & Kitchen Command Center
$pageTitle = "Live Cafe Radar & Kitchen Command";
$activeNav = "dashboard";

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

// Initial data load
$orders = $pdo->query("SELECT * FROM orders ORDER BY id DESC LIMIT 8")->fetchAll();
$tables = $pdo->query("SELECT * FROM cafe_tables ORDER BY table_id ASC")->fetchAll();
$menuItems = $pdo->query("SELECT * FROM menu_items ORDER BY id ASC")->fetchAll();

include __DIR__ . '/includes/header.php';
?>

<div class="container py-8 space-y-8">
    <!-- Top Command Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
            <div class="flex items-center gap-2.5 mb-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span class="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Live Cafe Radar &bull; Sync Active
                </span>
            </div>
            <h1 class="font-heading text-3xl sm:text-4xl text-stone-900 font-extrabold tracking-tight">
                Lumina <span class="text-amber-700">Command & Floor Radar</span>
            </h1>
            <p class="text-xs sm:text-sm text-stone-600 mt-1">
                Real-time floor occupancy, co-working desk availability, live kitchen order tickets, and guest metrics.
            </p>
        </div>

        <!-- Shift Spotlight & Real-Time Clock -->
        <div class="flex items-center gap-4 bg-white border border-stone-200 p-3.5 rounded-2xl shadow-sm">
            <div class="w-12 h-12 rounded-xl overflow-hidden border border-stone-200 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=160&auto=format&fit=crop&q=80" alt="Head Chef" class="w-full h-full object-cover">
            </div>
            <div class="pr-2">
                <div class="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Kitchen & Bar Lead</div>
                <div class="text-sm font-bold text-stone-900">Chef Marco Silva</div>
                <div class="text-[11px] text-stone-500">Service: All-Day Brunch & Bowls</div>
            </div>
            <div class="border-l border-stone-200 pl-4 hidden sm:block">
                <div class="text-[10px] uppercase font-bold text-stone-400">Atelier Clock</div>
                <div id="live-digital-clock" class="text-sm font-mono font-bold text-stone-900">--:--:--</div>
                <div class="text-[10px] text-emerald-700 font-semibold">Synced Live</div>
            </div>
        </div>
    </div>

    <!-- 4 Key Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Revenue Today -->
        <div class="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-stone-500 uppercase tracking-wider">Kitchen Register</span>
                <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <i data-lucide="dollar-sign" class="w-4 h-4"></i>
                </div>
            </div>
            <div id="dash-stat-revenue" class="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
                $<?= number_format(array_sum(array_column($orders, 'total')), 2) ?>
            </div>
            <div class="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-semibold">
                <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
                <span>+22.5% vs yesterday &bull; Automated SQLite DB</span>
            </div>
        </div>

        <!-- Orders in Queue -->
        <div class="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-stone-500 uppercase tracking-wider">Active Ticket Queue</span>
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <i data-lucide="utensils" class="w-4 h-4"></i>
                </div>
            </div>
            <div id="dash-stat-queue" class="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-700">
                <?= count(array_filter($orders, fn($o) => in_array($o['status'], ['In the Kitchen', 'Plating / Brewing']))) ?> Active
            </div>
            <div class="text-[11px] text-stone-500 mt-1 flex items-center gap-1 font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Avg kitchen prep: 11 mins
            </div>
        </div>

        <!-- Table & Desk Occupancy -->
        <div class="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-stone-500 uppercase tracking-wider">Floor Occupancy</span>
                <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                    <i data-lucide="users" class="w-4 h-4"></i>
                </div>
            </div>
            <div id="dash-stat-occupancy" class="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
                <?= count(array_filter($tables, fn($t) => $t['status'] === 'occupied')) ?> / <?= count($tables) ?> Tables
            </div>
            <div class="text-[11px] text-stone-500 mt-1">
                <?= count(array_filter($tables, fn($t) => $t['status'] === 'available')) ?> desks/tables open right now
            </div>
        </div>

        <!-- Work Amenities Health -->
        <div class="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-stone-500 uppercase tracking-wider">Wi-Fi & Power Health</span>
                <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                    <i data-lucide="wifi" class="w-4 h-4"></i>
                </div>
            </div>
            <div class="flex items-baseline gap-2">
                <span class="font-heading text-2xl sm:text-3xl font-extrabold text-purple-900">984 Mbps</span>
                <span class="text-xs text-stone-500 font-mono">Ping: 3ms</span>
            </div>
            <div class="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
                <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
                <span>100% Outlets Operational</span>
            </div>
        </div>
    </div>

    <!-- Main Grid: Live Floor Radar (7 cols) + Cafe Zones & Wi-Fi Details (5 cols) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Interactive Floor Radar Matrix (7 cols) -->
        <div class="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 space-y-6 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                    <h3 class="font-heading text-xl font-bold text-stone-900 flex items-center gap-2">
                        <i data-lucide="map-pin" class="w-5 h-5 text-amber-700"></i>
                        Interactive Floor Radar & Desk Matrix
                    </h3>
                    <p class="text-xs text-stone-500">Click any available table to book it immediately.</p>
                </div>
                <!-- Status Legend -->
                <div class="flex items-center gap-3 text-xs font-semibold">
                    <span class="flex items-center gap-1.5 text-emerald-700">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Available
                    </span>
                    <span class="flex items-center gap-1.5 text-amber-700">
                        <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Reserved
                    </span>
                    <span class="flex items-center gap-1.5 text-rose-700">
                        <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Occupied
                    </span>
                </div>
            </div>

            <!-- Floor Matrix Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4" id="tables-radar-container">
                <?php foreach ($tables as $tbl): ?>
                    <div class="table-node <?= $tbl['status'] ?> p-4 text-center transition-all group"
                         onclick="handleTableClick('<?= $tbl['table_id'] ?>', '<?= $tbl['zone'] ?>', '<?= $tbl['status'] ?>')">
                        <div class="text-sm font-extrabold font-heading tracking-wide mb-0.5"><?= $tbl['table_id'] ?></div>
                        <div class="text-[10px] text-stone-700 font-semibold truncate w-full"><?= $tbl['zone'] ?></div>
                        <div class="text-[9px] uppercase tracking-wider mt-1 font-bold">
                            <?= $tbl['status'] === 'occupied' ? 'Occupied' : ($tbl['status'] === 'reserved' ? 'Reserved' : 'Open (' . $tbl['capacity'] . 'p)') ?>
                        </div>
                        <?php if ($tbl['has_power']): ?>
                            <div class="text-[9px] text-amber-700 mt-1 flex items-center gap-0.5 justify-center">
                                <i data-lucide="zap" class="w-2.5 h-2.5"></i> Power
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs text-stone-600">
                <span class="flex items-center gap-2">
                    <i data-lucide="info" class="w-4 h-4 text-amber-700"></i>
                    Table sensors poll every 6 seconds.
                </span>
                <a href="reservation.php" class="text-amber-800 font-bold hover:underline">
                    Reserve Specific Desk &rarr;
                </a>
            </div>
        </div>

        <!-- Cafe Telemetry & Co-Working Specs (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
            <!-- Amenities Live Monitor -->
            <div class="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div class="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div class="flex items-center gap-2.5">
                        <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                            <i data-lucide="cpu" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <h4 class="font-heading text-base font-bold text-stone-900">Work Environment Metrics</h4>
                            <p class="text-[11px] text-stone-500">Live Sensory & Network Data</p>
                        </div>
                    </div>
                    <span class="badge-tag badge-amber">Optimal</span>
                </div>

                <div class="space-y-3 font-mono text-xs">
                    <div class="bg-stone-50 border border-stone-200 rounded-xl p-3 flex justify-between items-center">
                        <span class="text-stone-600 font-sans font-medium">Ambient Noise Level:</span>
                        <span class="text-emerald-700 font-bold">48 dB (Quiet Library Vibe)</span>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div class="bg-stone-50 border border-stone-200 rounded-xl p-3">
                            <div class="text-[10px] text-stone-500 font-sans uppercase">Indoor Air Quality</div>
                            <div class="text-base text-emerald-700 font-bold mt-0.5">AQI 12 (Pure)</div>
                        </div>
                        <div class="bg-stone-50 border border-stone-200 rounded-xl p-3">
                            <div class="text-[10px] text-stone-500 font-sans uppercase">Natural Sunlight</div>
                            <div class="text-base text-amber-700 font-bold mt-0.5">94% Skylight</div>
                        </div>
                    </div>

                    <div class="bg-stone-50 border border-stone-200 rounded-xl p-3 flex justify-between items-center">
                        <span class="text-stone-600 font-sans font-medium">Stone Oven Temp:</span>
                        <span class="text-amber-800 font-bold">285°C (Pizza & Sourdough)</span>
                    </div>
                </div>
            </div>

            <!-- Co-Working Guest Quick Pass -->
            <div class="bg-stone-900 text-white rounded-2xl p-6 space-y-4 shadow-sm">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <i data-lucide="laptop" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="font-heading text-base font-bold text-white">Guest Work Pass</h4>
                        <p class="text-xs text-stone-400">Universal access for all diners</p>
                    </div>
                </div>

                <div class="bg-stone-800/80 border border-stone-700 rounded-xl p-3 space-y-1.5 text-xs font-mono">
                    <div class="flex justify-between">
                        <span class="text-stone-400">Wi-Fi:</span>
                        <span class="text-amber-400 font-bold">Lumina_Guest_1Gbps</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-stone-400">Password:</span>
                        <span class="text-white font-bold">sunlightandpasta</span>
                    </div>
                </div>

                <p class="text-[11px] text-stone-400">
                    Feel free to work, study, or meet as long as you enjoy our dishes or beverages!
                </p>
            </div>
        </div>
    </div>

    <!-- Live Kitchen Order Dispatch Queue -->
    <div class="bg-white border border-stone-200 rounded-2xl p-6 space-y-6 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
                <h3 class="font-heading text-xl font-bold text-stone-900 flex items-center gap-2">
                    <i data-lucide="list-ordered" class="w-5 h-5 text-amber-700"></i>
                    Live Kitchen Dispatch & Order Pipeline
                </h3>
                <p class="text-xs text-stone-500">Real-time orders placed via the website or tables. Change status with one click.</p>
            </div>
            <button onclick="location.reload()" class="btn-secondary text-xs py-2 px-3.5">
                <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
                Refresh Orders
            </button>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-stone-700">
                <thead class="bg-stone-50 text-stone-500 font-heading uppercase tracking-wider text-[11px] border-b border-stone-200">
                    <tr>
                        <th class="py-3 px-4">Order Token</th>
                        <th class="py-3 px-4">Guest Name</th>
                        <th class="py-3 px-4">Seating Desk</th>
                        <th class="py-3 px-4">Dishes Ordered</th>
                        <th class="py-3 px-4">Total</th>
                        <th class="py-3 px-4">Kitchen Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100">
                    <?php foreach ($orders as $o): 
                        $items = json_decode($o['items_json'], true) ?: [];
                    ?>
                        <tr class="hover:bg-stone-50/80 transition-colors">
                            <td class="py-3.5 px-4 font-mono font-bold text-amber-800"><?= htmlspecialchars($o['order_code']) ?></td>
                            <td class="py-3.5 px-4 font-semibold text-stone-900"><?= htmlspecialchars($o['customer_name']) ?></td>
                            <td class="py-3.5 px-4 text-stone-600"><?= htmlspecialchars($o['table_number'] ?: $o['order_type']) ?></td>
                            <td class="py-3.5 px-4">
                                <?php foreach ($items as $it): ?>
                                    <span class="inline-block bg-stone-100 border border-stone-200 text-stone-800 px-2 py-0.5 rounded text-[10px] mr-1 mb-1 font-medium">
                                        <?= $it['qty'] ?>x <?= htmlspecialchars($it['name']) ?>
                                    </span>
                                <?php endforeach; ?>
                            </td>
                            <td class="py-3.5 px-4 font-bold text-stone-900 font-mono"><?= formatPrice($o['total']) ?></td>
                            <td class="py-3.5 px-4">
                                <select onchange="updateOrderStatus('<?= $o['order_code'] ?>', this.value)" class="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1 text-xs text-stone-800 font-semibold focus:outline-none">
                                    <option value="In the Kitchen" <?= $o['status'] === 'In the Kitchen' ? 'selected' : '' ?>>🍳 In the Kitchen</option>
                                    <option value="Plating / Brewing" <?= $o['status'] === 'Plating / Brewing' ? 'selected' : '' ?>>🍽️ Plating / Brewing</option>
                                    <option value="Ready to Serve" <?= $o['status'] === 'Ready to Serve' ? 'selected' : '' ?>>🔔 Ready to Serve</option>
                                    <option value="Completed" <?= $o['status'] === 'Completed' ? 'selected' : '' ?>>✅ Completed</option>
                                </select>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Kitchen Inventory Stock Toggles -->
    <div class="bg-white border border-stone-200 rounded-2xl p-6 space-y-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
                <h3 class="font-heading text-xl font-bold text-stone-900 flex items-center gap-2">
                    <i data-lucide="package-check" class="w-5 h-5 text-amber-700"></i>
                    Kitchen & Bakery Inventory Stock Toggles
                </h3>
                <p class="text-xs text-stone-500">Toggle food & drink items in/out of stock on the public menu instantly.</p>
            </div>
            <a href="menu.php" class="btn-secondary text-xs py-2 px-3.5">
                View Public Menu
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <?php foreach ($menuItems as $mi): ?>
                <div class="p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-3">
                    <div class="min-w-0 flex-1">
                        <div class="text-sm font-semibold text-stone-900 truncate"><?= htmlspecialchars($mi['name']) ?></div>
                        <div class="text-[11px] text-amber-800 font-mono font-bold"><?= formatPrice($mi['price']) ?></div>
                    </div>
                    <button id="stock-btn-<?= $mi['id'] ?>" onclick="toggleStock(<?= $mi['id'] ?>)" 
                            class="px-2.5 py-1 rounded-full text-xs font-semibold transition border <?= $mi['in_stock'] ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300' ?>">
                        <?= $mi['in_stock'] ? 'In Stock' : 'Sold Out' ?>
                    </button>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<script>
function updateClock() {
    const clockEl = document.getElementById('live-digital-clock');
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

async function updateOrderStatus(orderCode, newStatus) {
    try {
        const res = await fetch('api/orders.php?action=update_status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_code: orderCode, status: newStatus })
        });
        const result = await res.json();
        if (result.success) {
            window.showToast?.(`Order ${orderCode} updated to "${newStatus}"`, 'success');
        }
    } catch (err) {
        console.error(err);
    }
}

async function toggleStock(itemId) {
    try {
        const res = await fetch('api/menu.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: itemId, action: 'toggle_stock' })
        });
        const result = await res.json();
        if (result.success) {
            const btn = document.getElementById(`stock-btn-${itemId}`);
            if (btn) {
                if (result.in_stock === 1) {
                    btn.className = 'px-2.5 py-1 rounded-full text-xs font-semibold transition border bg-emerald-100 text-emerald-800 border-emerald-300';
                    btn.textContent = 'In Stock';
                } else {
                    btn.className = 'px-2.5 py-1 rounded-full text-xs font-semibold transition border bg-rose-100 text-rose-800 border-rose-300';
                    btn.textContent = 'Sold Out';
                }
            }
            window.showToast?.('Inventory status updated', 'info');
        }
    } catch (err) {
        console.error(err);
    }
}

function handleTableClick(tableId, zone, status) {
    if (status === 'available') {
        if (confirm(`Table ${tableId} (${zone}) is currently available! Would you like to reserve it?`)) {
            window.location.href = `reservation.php?table=${tableId}&zone=${encodeURIComponent(zone)}`;
        }
    } else {
        window.showToast?.(`Table ${tableId} is currently ${status}.`, 'info');
    }
}
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
