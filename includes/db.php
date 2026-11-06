<?php
// includes/db.php - SQLite Database with Comprehensive Food, Brunch, Bowls & Beverage Catalog

$dbDir = __DIR__ . '/../data';
if (!is_dir($dbDir)) {
    mkdir($dbDir, 0777, true);
}

$dbPath = $dbDir . '/cafe.db';

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Auto-create tables
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS menu_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            image_url TEXT,
            badge TEXT DEFAULT '',
            dietary TEXT DEFAULT '',
            prep_time TEXT DEFAULT '10-12 mins',
            calories INTEGER DEFAULT 350,
            in_stock INTEGER DEFAULT 1,
            rating REAL DEFAULT 4.9,
            reviews_count INTEGER DEFAULT 140
        );

        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_code TEXT UNIQUE NOT NULL,
            customer_name TEXT NOT NULL,
            customer_email TEXT,
            customer_phone TEXT,
            order_type TEXT DEFAULT 'dine-in',
            table_number TEXT DEFAULT 'Table 4',
            items_json TEXT NOT NULL,
            subtotal REAL NOT NULL,
            discount REAL DEFAULT 0,
            tax REAL DEFAULT 0,
            total REAL NOT NULL,
            payment_status TEXT DEFAULT 'Paid',
            status TEXT DEFAULT 'In the Kitchen',
            notes TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            booking_code TEXT UNIQUE NOT NULL,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone TEXT NOT NULL,
            reservation_date TEXT NOT NULL,
            reservation_time TEXT NOT NULL,
            party_size INTEGER DEFAULT 2,
            seating_area TEXT DEFAULT 'Botanical Garden Terrace',
            work_amenities TEXT DEFAULT 'Power Outlets, High-Speed Wi-Fi',
            special_requests TEXT DEFAULT '',
            status TEXT DEFAULT 'Confirmed',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            rating INTEGER NOT NULL DEFAULT 5,
            comment TEXT NOT NULL,
            item_enjoyed TEXT DEFAULT 'Truffle Avocado Sourdough',
            avatar_url TEXT DEFAULT '',
            date_added DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            is_read INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS cafe_tables (
            table_id TEXT PRIMARY KEY,
            zone TEXT NOT NULL,
            capacity INTEGER NOT NULL,
            status TEXT DEFAULT 'available',
            guest_name TEXT DEFAULT '',
            has_power INTEGER DEFAULT 1
        );
    ");

    // Check if menu is seeded
    $countCheck = $pdo->query("SELECT COUNT(*) as cnt FROM menu_items")->fetch();
    if ($countCheck['cnt'] == 0) {
        $stmt = $pdo->prepare("
            INSERT INTO menu_items (name, category, price, description, image_url, badge, dietary, prep_time, calories, in_stock, rating, reviews_count)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $seedMenu = [
            // BRUNCH & BREAKFAST
            [
                'Heirloom Truffle Avocado Toast',
                'Breakfast & Brunch',
                13.50,
                'Crispy 36-hour slow-fermented country sourdough, smashed organic Hass avocado, whipped feta, heirloom cherry tomatoes, poached pasture egg, black truffle oil, and micro-cilantro.',
                'assets/images/hero-dish.jpg',
                'Chef Signature',
                'Vegetarian &bull; High Protein',
                '10 mins',
                420,
                1,
                4.98,
                428
            ],
            [
                'Wild Berry Brioche French Toast',
                'Breakfast & Brunch',
                14.20,
                'Golden griddled brioche soaked in orange blossom custard, layered with whipped vanilla mascarpone, fresh blackberries, roasted pistachios, and pure Grade A Vermont maple syrup.',
                'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop&q=80',
                'Brunch Favorite',
                'Vegetarian',
                '12 mins',
                540,
                1,
                4.96,
                382
            ],
            [
                'Cast-Iron Mediterranean Shakshuka',
                'Breakfast & Brunch',
                14.80,
                'Simmered San Marzano tomatoes, roasted bell peppers, garlic confit, cumin, and two poached free-range eggs, topped with crumbled goat cheese and warm grilled herb pita bread.',
                'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&auto=format&fit=crop&q=80',
                'Warm & Hearty',
                'Vegetarian &bull; Gluten-Free Option',
                '14 mins',
                480,
                1,
                4.94,
                295
            ],
            [
                'Smoked Salmon Eggs Benedict',
                'Breakfast & Brunch',
                15.50,
                'Toasted artisan English muffin, Scottish smoked salmon, organic poached eggs, wilted baby spinach, and velvety house-made Meyer lemon hollandaise sauce.',
                'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&auto=format&fit=crop&q=80',
                'Weekend Special',
                'Pescatarian &bull; Rich Omega-3',
                '12 mins',
                510,
                1,
                4.97,
                340
            ],

            // ARTISAN SANDWICHES & WARM PANINIS
            [
                'Herb-Roasted Chicken & Pesto Panini',
                'Sandwiches & Paninis',
                13.90,
                'Slow-roasted rosemary chicken breast, fresh basil walnut pesto, melted fior di latte mozzarella, sun-dried tomatoes, and wild arugula pressed on house rosemary focaccia.',
                'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
                'Crispy & Melty',
                'Freshly Pressed',
                '10 mins',
                580,
                1,
                4.95,
                312
            ],
            [
                'Caprese Mozzarella Rustica',
                'Sandwiches & Paninis',
                12.50,
                'Fresh buffalo mozzarella slices, vine-ripened beefsteak tomatoes, fresh basil leaves, aged balsamic reduction glaze, and extra virgin olive oil on toasted olive ciabatta.',
                'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
                'Italian Classic',
                'Vegetarian',
                '8 mins',
                460,
                1,
                4.91,
                210
            ],
            [
                'Artisan Pastrami Melt & Gruyère',
                'Sandwiches & Paninis',
                15.20,
                'Spiced beef brisket pastrami, caramelized sweet onions, whole grain Dijon mustard, and melted French Gruyère cheese on butter-crisped artisanal seeded rye.',
                'assets/images/pastrami.jpg',
                'House Cured',
                'Comfort Classic',
                '11 mins',
                620,
                1,
                4.93,
                188
            ],

            // NOURISHING MAINS & HARVEST BOWLS
            [
                'Handcrafted Truffle Mushroom Pappardelle',
                'Gourmet Mains',
                16.80,
                'Fresh handmade ribbon pasta, sautéed wild chanterelle and cremini mushrooms, white truffle cream sauce, fresh thyme, and shaved 24-month aged Parmigiano Reggiano.',
                'assets/images/pasta.jpg',
                'Chef Pride',
                'Vegetarian &bull; Fresh Pasta',
                '15 mins',
                590,
                1,
                4.99,
                460
            ],
            [
                'Wood-Fired Burrata & Fig Flatbread',
                'Gourmet Mains',
                14.50,
                'Stone-baked thin flatbread, creamy whole burrata, mission figs, caramelized onions, crisp prosciutto di Parma, wild baby arugula, and wild thyme honey drizzle.',
                'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
                'Wood-Fired',
                'Sharing Plate',
                '12 mins',
                520,
                1,
                4.94,
                275
            ],
            [
                'Nordic Salmon & Quinoa Harvest Bowl',
                'Gourmet Mains',
                16.20,
                'Seared miso-glazed Atlantic salmon, tri-color warm quinoa, steamed edamame, roasted sweet potatoes, sliced avocado, pickled ginger, and toasted sesame ginger dressing.',
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
                'Superfood',
                'Gluten-Free &bull; High Protein',
                '12 mins',
                560,
                1,
                4.97,
                389
            ],

            // BAKERY & SWEET DELIGHTS
            [
                'Sicilian Pistachio Supreme Croissant',
                'Bakery & Pastries',
                6.50,
                'Flaky 72-layer European butter pastry filled with rich roasted Sicilian pistachio praline cream, topped with white chocolate drizzle and toasted emerald pistachio crumbs.',
                'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
                'Baked Fresh at Dawn',
                'Vegetarian',
                'Ready to Serve',
                390,
                1,
                4.99,
                680
            ],
            [
                'Basque Burnt Caramel Cheesecake',
                'Bakery & Pastries',
                7.80,
                'Caramelized deeply scorched golden crust with a molten, ultra-velvety cream cheese center, infused with Madagascar vanilla bean and served with sea salt flakes.',
                'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80',
                'Best Seller',
                'Vegetarian',
                'Ready to Serve',
                440,
                1,
                4.98,
                520
            ],
            [
                'Warm Valrhona Dark Chocolate Molten Tart',
                'Bakery & Pastries',
                7.20,
                'Crispy almond sable shell with a warm flowing 70% dark chocolate ganache center, paired with house espresso whipped cream and cocoa dusting.',
                'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
                'Decadent',
                'Vegetarian',
                '5 mins',
                460,
                1,
                4.95,
                345
            ],

            // DRINKS & REFRESHMENTS
            [
                'Velvet Caramel Vanilla Latte',
                'Beverages',
                5.90,
                'Double shot of single-origin espresso pulled over steamed Madagascar vanilla oat milk, finished with silky microfoam and salted caramel drizzle.',
                'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=80',
                'Guest Favorite',
                'Vegetarian &bull; Dairy Free Option',
                '4 mins',
                210,
                1,
                4.96,
                430
            ],
            [
                'Ceremonial Uji Iced Matcha Zen',
                'Beverages',
                6.50,
                'First-harvest ceremonial matcha whisked fresh to order, layered over creamy cold almond milk and natural agave nectar over crystal ice spheres.',
                'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80',
                'Antioxidant Rich',
                'Vegan &bull; Organic',
                '4 mins',
                140,
                1,
                4.94,
                380
            ],
            [
                'Cold-Pressed Green Glow Botanical Juice',
                'Beverages',
                6.80,
                'Freshly pressed daily: Granny Smith apple, crisp cucumber, celery, fresh ginger root, baby kale, and zesty fresh lime. Never pasteurized.',
                'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&auto=format&fit=crop&q=80',
                'Raw & Pure',
                '100% Organic &bull; Detox',
                'Ready to Serve',
                110,
                1,
                4.92,
                240
            ]
        ];

        foreach ($seedMenu as $item) {
            $stmt->execute($item);
        }
    }

    // Seed tables
    $tableCount = $pdo->query("SELECT COUNT(*) as cnt FROM cafe_tables")->fetch();
    if ($tableCount['cnt'] == 0) {
        $tables = [
            ['W1', 'Co-Working & Creator Pods', 1, 'available', '', 1],
            ['W2', 'Co-Working & Creator Pods', 2, 'occupied', 'Sarah Jenkins (Working)', 1],
            ['W3', 'Co-Working & Creator Pods', 2, 'available', '', 1],
            ['W4', 'Co-Working & Creator Pods', 4, 'occupied', 'Tech Design Sync', 1],
            ['T1', 'Sunlit Botanical Terrace', 2, 'available', '', 1],
            ['T2', 'Sunlit Botanical Terrace', 4, 'occupied', 'Marcus & Liam', 0],
            ['T3', 'Sunlit Botanical Terrace', 2, 'available', '', 1],
            ['T4', 'Sunlit Botanical Terrace', 6, 'reserved', 'Brunch Party · 1:00 PM', 0],
            ['L1', 'Velvet Dining Lounge', 4, 'occupied', 'Dr. Thorne', 1],
            ['L2', 'Velvet Dining Lounge', 4, 'available', '', 1],
            ['L3', 'Velvet Dining Lounge', 6, 'reserved', 'Family Gathering', 1],
            ['B1', 'Open Kitchen Bar', 1, 'occupied', 'Elena V.', 1],
            ['B2', 'Open Kitchen Bar', 1, 'available', '', 1],
            ['B3', 'Open Kitchen Bar', 1, 'available', '', 1]
        ];
        $tStmt = $pdo->prepare("INSERT INTO cafe_tables (table_id, zone, capacity, status, guest_name, has_power) VALUES (?, ?, ?, ?, ?, ?)");
        foreach ($tables as $t) {
            $tStmt->execute($t);
        }
    }

    // Seed reviews
    $revCount = $pdo->query("SELECT COUNT(*) as cnt FROM reviews")->fetch();
    if ($revCount['cnt'] == 0) {
        $reviews = [
            [
                'Sophia Reynolds',
                5,
                'The atmosphere here is pure perfection. I spent 4 hours finishing my project on the Botanical Terrace with ultra-fast Wi-Fi, and the Truffle Mushroom Pappardelle was restaurant-quality excellence!',
                'Handcrafted Truffle Mushroom Pappardelle',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
            ],
            [
                'Daniel Kim',
                5,
                'Hands down the best cafe food in the city. The Pastrami Melt was savory, juicy, and crisped to absolute perfection. The power sockets at every booth make it my favorite workday haven.',
                'Artisan Pastrami Melt & Gruyère',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
            ],
            [
                'Amara Vance',
                5,
                'That Pistachio Croissant literally melted in my mouth. Plus the staff is so warm and welcoming. Beautiful lighting, calm music, and great desk spaces.',
                'Sicilian Pistachio Supreme Croissant',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
            ]
        ];
        $rStmt = $pdo->prepare("INSERT INTO reviews (customer_name, rating, comment, item_enjoyed, avatar_url) VALUES (?, ?, ?, ?, ?)");
        foreach ($reviews as $r) {
            $rStmt->execute($r);
        }
    }

    // Seed sample orders
    $ordCount = $pdo->query("SELECT COUNT(*) as cnt FROM orders")->fetch();
    if ($ordCount['cnt'] == 0) {
        $orders = [
            [
                'LUM-1042',
                'Elena Rostova',
                'elena@example.com',
                '+1 (555) 234-8901',
                'dine-in',
                'Table T2 (Botanical Terrace)',
                json_encode([
                    ['name' => 'Heirloom Truffle Avocado Toast', 'price' => 13.50, 'qty' => 1, 'notes' => 'Well toasted'],
                    ['name' => 'Velvet Caramel Vanilla Latte', 'price' => 5.90, 'qty' => 1, 'milk' => 'Oat Milk']
                ]),
                19.40,
                3.88,
                1.24,
                16.76,
                'Paid',
                'In the Kitchen',
                'Dine-in at terrace'
            ],
            [
                'LUM-1043',
                'David Hayes',
                'david@example.com',
                '+1 (555) 345-6789',
                'dine-in',
                'Table W2 (Work Pod)',
                json_encode([
                    ['name' => 'Herb-Roasted Chicken & Pesto Panini', 'price' => 13.90, 'qty' => 1],
                    ['name' => 'Ceremonial Uji Iced Matcha Zen', 'price' => 6.50, 'qty' => 1]
                ]),
                20.40,
                0,
                1.63,
                22.03,
                'Paid',
                'Ready to Serve',
                'Deliver to study pod W2'
            ]
        ];
        $oStmt = $pdo->prepare("
            INSERT INTO orders (order_code, customer_name, customer_email, customer_phone, order_type, table_number, items_json, subtotal, discount, tax, total, payment_status, status, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        foreach ($orders as $o) {
            $oStmt->execute($o);
        }
    }

} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
