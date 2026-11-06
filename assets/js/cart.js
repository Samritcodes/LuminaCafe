/**
 * assets/js/cart.js - Lumina Tray & Checkout
 */

class CafeCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('lumina_cart_items')) || [];
        this.promoCode = localStorage.getItem('lumina_cart_promo') || '';
        this.taxRate = 0.08;

        this.init();
    }

    init() {
        this.updateBadge();
        this.renderDrawer();

        const cartToggle = document.getElementById('cart-toggle-btn');
        const cartClose = document.getElementById('cart-close-btn');
        const cartOverlay = document.getElementById('cart-overlay');

        if (cartToggle) {
            cartToggle.addEventListener('click', () => this.openDrawer());
        }
        if (cartClose) {
            cartClose.addEventListener('click', () => this.closeDrawer());
        }
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => this.closeDrawer());
        }

        const checkoutBtn = document.getElementById('cart-checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.openCheckoutModal());
        }

        const promoApplyBtn = document.getElementById('promo-apply-btn');
        if (promoApplyBtn) {
            promoApplyBtn.addEventListener('click', () => this.applyPromoCode());
        }
    }

    save() {
        localStorage.setItem('lumina_cart_items', JSON.stringify(this.items));
        localStorage.setItem('lumina_cart_promo', this.promoCode);
        this.updateBadge();
        this.renderDrawer();
    }

    addItem(item) {
        const existingIndex = this.items.findIndex(i => 
            i.name === item.name && 
            (i.size || '') === (item.size || '') && 
            (i.milk || '') === (item.milk || '')
        );

        if (existingIndex > -1) {
            this.items[existingIndex].qty += (item.qty || 1);
        } else {
            this.items.push({
                id: item.id || Date.now(),
                name: item.name,
                price: parseFloat(item.price),
                image: item.image || 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=160&auto=format&fit=crop&q=80',
                size: item.size || 'Standard',
                milk: item.milk || 'Country Sourdough',
                notes: item.notes || '',
                qty: item.qty || 1
            });
        }

        this.save();
        this.openDrawer();
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 28,
                spread: 55,
                origin: { y: 0.85 }
            });
        }
        window.showToast?.(`Added "${item.name}" to your tray!`, 'success');
    }

    removeItem(index) {
        const removed = this.items.splice(index, 1);
        this.save();
        if (removed.length > 0) {
            window.showToast?.(`Removed "${removed[0].name}"`, 'info');
        }
    }

    updateQty(index, delta) {
        if (!this.items[index]) return;
        this.items[index].qty += delta;
        if (this.items[index].qty <= 0) {
            this.removeItem(index);
        } else {
            this.save();
        }
    }

    clear() {
        this.items = [];
        this.promoCode = '';
        this.save();
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    getDiscount() {
        const subtotal = this.getSubtotal();
        if (this.promoCode.toUpperCase() === 'LUMINA20') {
            return subtotal * 0.20;
        } else if (this.promoCode.toUpperCase() === 'FIRSTVISIT') {
            return Math.min(5.00, subtotal);
        }
        return 0;
    }

    getTax() {
        const taxable = this.getSubtotal() - this.getDiscount();
        return Math.max(0, taxable * this.taxRate);
    }

    getTotal() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscount();
        const tax = this.getTax();
        return Math.max(0, (subtotal - discount) + tax);
    }

    updateBadge() {
        const badges = document.querySelectorAll('.cart-count-badge');
        const count = this.items.reduce((sum, item) => sum + item.qty, 0);
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-flex' : 'none';
        });
    }

    openDrawer() {
        const overlay = document.getElementById('cart-overlay');
        const drawer = document.getElementById('cart-drawer');
        if (overlay && drawer) {
            overlay.classList.add('open');
            drawer.classList.add('open');
        }
    }

    closeDrawer() {
        const overlay = document.getElementById('cart-overlay');
        const drawer = document.getElementById('cart-drawer');
        if (overlay && drawer) {
            overlay.classList.remove('open');
            drawer.classList.remove('open');
        }
    }

    applyPromoCode() {
        const input = document.getElementById('promo-input');
        if (!input) return;
        const code = input.value.trim().toUpperCase();

        if (code === 'LUMINA20' || code === 'FIRSTVISIT') {
            this.promoCode = code;
            this.save();
            window.showToast?.(`Promo code "${code}" applied!`, 'success');
        } else {
            window.showToast?.('Invalid code. Try LUMINA20 or FIRSTVISIT', 'warning');
        }
    }

    renderDrawer() {
        const listContainer = document.getElementById('cart-items-list');
        const subtotalEl = document.getElementById('cart-subtotal');
        const discountEl = document.getElementById('cart-discount');
        const discountRow = document.getElementById('cart-discount-row');
        const taxEl = document.getElementById('cart-tax');
        const totalEl = document.getElementById('cart-total');
        const emptyState = document.getElementById('cart-empty-state');
        const checkoutBtn = document.getElementById('cart-checkout-btn');

        if (!listContainer) return;

        if (this.items.length === 0) {
            listContainer.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
            if (checkoutBtn) checkoutBtn.disabled = true;
            if (subtotalEl) subtotalEl.textContent = '$0.00';
            if (taxEl) taxEl.textContent = '$0.00';
            if (totalEl) totalEl.textContent = '$0.00';
            if (discountRow) discountRow.style.display = 'none';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = false;

        let html = '';
        this.items.forEach((item, idx) => {
            html += `
                <div class="cart-item bg-stone-50 border border-stone-200" style="padding: 12px; margin-bottom: 12px; display: flex; gap: 12px; align-items: center; border-radius: 14px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 58px; height: 58px; object-fit: cover; border-radius: 10px; border: 1px solid #E8E2D8;">
                    <div style="flex: 1; min-width: 0;">
                        <h4 style="font-size: 0.95rem; font-weight: 700; color: #1C1917; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h4>
                        <p style="font-size: 0.78rem; color: #78716C;">${item.size ? item.size + ' · ' : ''}${item.milk || ''}</p>
                        <div style="font-size: 0.9rem; font-weight: 700; color: #B45309; margin-top: 4px;">$${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; background: #FFFFFF; border: 1px solid #E8E2D8; padding: 4px 8px; border-radius: 9999px;">
                        <button onclick="window.cafeCart.updateQty(${idx}, -1)" style="background: none; border: none; color: #1C1917; cursor: pointer; width: 18px; font-weight: 700;">-</button>
                        <span style="font-size: 0.85rem; font-weight: 700; min-width: 14px; text-align: center; color: #1C1917;">${item.qty}</span>
                        <button onclick="window.cafeCart.updateQty(${idx}, 1)" style="background: none; border: none; color: #1C1917; cursor: pointer; width: 18px; font-weight: 700;">+</button>
                    </div>
                    <button onclick="window.cafeCart.removeItem(${idx})" style="background: none; border: none; color: #EF4444; cursor: pointer; padding: 4px;" title="Remove">
                        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                    </button>
                </div>
            `;
        });

        listContainer.innerHTML = html;

        const subtotal = this.getSubtotal();
        const discount = this.getDiscount();
        const tax = this.getTax();
        const total = this.getTotal();

        if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
        if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);
        if (totalEl) totalEl.textContent = '$' + total.toFixed(2);

        if (discountRow) {
            if (discount > 0) {
                discountRow.style.display = 'flex';
                if (discountEl) discountEl.textContent = '-$' + discount.toFixed(2);
            } else {
                discountRow.style.display = 'none';
            }
        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    openCheckoutModal() {
        if (this.items.length === 0) return;
        this.closeDrawer();

        const modal = document.getElementById('checkout-modal');
        if (modal) {
            modal.classList.add('open');
            const summaryTotal = document.getElementById('checkout-summary-total');
            if (summaryTotal) summaryTotal.textContent = '$' + this.getTotal().toFixed(2);
        }
    }

    async submitOrder(formData) {
        try {
            const payload = {
                name: formData.get('name') || 'Lumina Guest',
                email: formData.get('email') || '',
                phone: formData.get('phone') || '',
                order_type: formData.get('order_type') || 'dine-in',
                table_number: formData.get('table_number') || 'Express Counter',
                notes: formData.get('notes') || '',
                promo_code: this.promoCode,
                items: this.items
            };

            const response = await fetch('api/orders.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                this.clear();
                const modal = document.getElementById('checkout-modal');
                if (modal) modal.classList.remove('open');

                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 90,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#D97706', '#15803D', '#1C1917']
                    });
                }

                this.showReceiptModal(data, payload);
            } else {
                window.showToast?.(data.error || 'Failed to place order', 'warning');
            }
        } catch (err) {
            console.error('Order error:', err);
            window.showToast?.('Connection error. Please try again.', 'warning');
        }
    }

    showReceiptModal(orderResult, customerData) {
        const receiptModal = document.getElementById('receipt-modal');
        if (!receiptModal) return;

        const codeEl = document.getElementById('receipt-order-code');
        const totalEl = document.getElementById('receipt-order-total');
        const tableEl = document.getElementById('receipt-order-table');
        const nameEl = document.getElementById('receipt-customer-name');

        if (codeEl) codeEl.textContent = orderResult.order_code;
        if (totalEl) totalEl.textContent = '$' + parseFloat(orderResult.total).toFixed(2);
        if (tableEl) tableEl.textContent = customerData.table_number;
        if (nameEl) nameEl.textContent = customerData.name;

        receiptModal.classList.add('open');
    }
}

window.cafeCart = new CafeCart();
