# 🍽️ Lumina Café & Kitchen

> A bright, modern, high-end cafe & kitchen web application built in **pure PHP**, featuring dynamic **3D spatial transitions & card tilt effects**, a **mesmerizing live seating radar & kitchen command center**, an all-day food & dining menu (brunch, pastas, sourdough paninis, and pastries), co-working amenities showcase (1Gbps fiber & power at desks), and instant table/desk reservation passes.

---

## 🌟 Key Features

### 1. 🌿 The Spaces & Environment Showcase with 3D Spatial Transitions
- **Dynamic 3D Card Tilt**: Mousemove-driven 3D perspective shifts (`perspective: 1000px`, `rotateX`, `rotateY`, `scale3d`) across all interactive cards.
- **Interactive Space Navigator**: Smooth spatial transition flips between the 4 zones of the cafe:
  1. **The Sunlit Botanical Atrium**: Natural skylight, living ficus plants, acoustic serenity.
  2. **Co-Working & Creator Study Pods**: Dedicated 1Gbps Fiber Wi-Fi, dual AC sockets at every desk, USB-C fast charging.
  3. **Open Kitchen & Bakery Counter**: Stone-baked sourdough, handmade pastas, fresh daily pastries.
  4. **Alfresco Garden Terrace**: 100% pet-friendly, fresh garden air, evening fairy lights.

### 2. ⚡ Mesmerizing Live Cafe Radar & Kitchen Command (`dashboard.php`)
- **Interactive Floor Radar Matrix**: 14 tables across Co-Working Pods, Botanical Terrace, Velvet Lounge, and Kitchen Bar with real-time status (Available, Reserved, Occupied) and click-to-book shortcut.
- **Live Kitchen Dispatch Pipeline**: Live incoming order tickets with status transitions (`In the Kitchen` ➔ `Plating / Brewing` ➔ `Ready to Serve` ➔ `Completed`).
- **Work Amenities Health**: Wi-Fi network throughput monitor (984 Mbps), indoor air quality (AQI 12), noise levels (48 dB quiet library vibe), and 100% power socket uptime.
- **Inventory Stock Management**: Real-time toggles for food and beverage items between "In Stock" and "Sold Out".

### 3. 🍳 All-Day Culinary & Beverage Menu (`menu.php`)
- **Real Food for Real Hunger**:
  - *Heirloom Truffle Avocado Sourdough*
  - *Wild Berry Brioche French Toast*
  - *Cast-Iron Mediterranean Shakshuka*
  - *Smoked Salmon Eggs Benedict*
  - *Herb-Roasted Chicken & Pesto Panini*
  - *Handcrafted Truffle Mushroom Pappardelle*
  - *Wood-Fired Burrata & Fig Flatbread*
  - *Nordic Salmon & Quinoa Harvest Bowl*
  - *Sicilian Pistachio Supreme Croissant*
  - *Basque Burnt Caramel Cheesecake*
  - *Velvet Vanilla Latte & Iced Matcha Zen*
- **Instant Keyword Search & Category Filters**: Search by ingredients, dietary tags, or prep time.
- **Dish Customizer Modal**: Custom bread options, portion sizes, and kitchen instructions.
- **Slide-Out Tray & Checkout**: Promo codes (`LUMINA20`), tax calculation, celebratory confetti, and digital receipts.

### 4. 🛋️ Table & Desk Reservation Engine (`reservation.php`)
- Choose between Work Pods, Botanical Terrace, Dining Lounge, or Kitchen Bar.
- Select date, time slot, party size, and special work requirements.
- Generates an instant printable/savable **VIP Pass** with booking reference and simulated QR code.

---

## 🚀 How to Run

### Option A: Quick Launch
Double-click `run.bat` in the project root. It will start the server and open:
```
http://localhost:8000
```

### Option B: Command Line (PowerShell)
```powershell
C:\xampp\php\php.exe -S localhost:8000
```
Then visit `http://localhost:8000` in your browser.
