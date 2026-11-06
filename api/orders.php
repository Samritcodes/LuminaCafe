<?php
// api/orders.php - Order Placement & Kitchen Dispatch
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
    $stmt = $pdo->prepare("SELECT * FROM orders ORDER BY id DESC LIMIT ?");
    $stmt->execute([$limit]);
    $orders = $stmt->fetchAll();

    foreach ($orders as &$order) {
        $order['items'] = json_decode($order['items_json'], true) ?? [];
    }

    jsonResponse(['success' => true, 'data' => $orders]);
}

if ($method === 'POST' && (!isset($_GET['action']) || $_GET['action'] !== 'update_status')) {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['items']) || !is_array($input['items'])) {
        jsonResponse(['success' => false, 'error' => 'Tray is empty'], 400);
    }

    $customerName = sanitize($input['name'] ?? 'Lumina Guest');
    $customerEmail = sanitize($input['email'] ?? '');
    $customerPhone = sanitize($input['phone'] ?? '');
    $orderType = sanitize($input['order_type'] ?? 'dine-in');
    $tableNumber = sanitize($input['table_number'] ?? 'Express Counter');
    $notes = sanitize($input['notes'] ?? '');

    $items = $input['items'];
    $subtotal = 0;
    foreach ($items as $item) {
        $price = (float)($item['price'] ?? 0);
        $qty = (int)($item['qty'] ?? 1);
        $subtotal += $price * $qty;
    }

    $discount = 0;
    $promoCode = strtoupper(trim($input['promo_code'] ?? ''));
    if ($promoCode === 'LUMINA20') {
        $discount = $subtotal * 0.20; // 20% off
    } elseif ($promoCode === 'FIRSTVISIT') {
        $discount = min(5.00, $subtotal); // $5 off
    }

    $taxRate = 0.08; // 8% local tax
    $tax = ($subtotal - $discount) * $taxRate;
    $total = max(0, ($subtotal - $discount) + $tax);

    $orderCode = 'LUM-' . strtoupper(bin2hex(random_bytes(3)));

    $stmt = $pdo->prepare("
        INSERT INTO orders (order_code, customer_name, customer_email, customer_phone, order_type, table_number, items_json, subtotal, discount, tax, total, payment_status, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Paid', 'In the Kitchen', ?)
    ");

    $stmt->execute([
        $orderCode,
        $customerName,
        $customerEmail,
        $customerPhone,
        $orderType,
        $tableNumber,
        json_encode($items),
        $subtotal,
        $discount,
        $tax,
        $total,
        $notes
    ]);

    jsonResponse([
        'success' => true,
        'order_code' => $orderCode,
        'total' => $total,
        'subtotal' => $subtotal,
        'discount' => $discount,
        'tax' => $tax,
        'status' => 'In the Kitchen',
        'message' => 'Order received by the kitchen team!'
    ]);
}

if ($method === 'PATCH' || ($method === 'POST' && isset($_GET['action']) && $_GET['action'] === 'update_status')) {
    $input = json_decode(file_get_contents('php://input'), true);
    $orderCode = $input['order_code'] ?? '';
    $newStatus = sanitize($input['status'] ?? '');

    $allowedStatuses = ['In the Kitchen', 'Plating / Brewing', 'Ready to Serve', 'Completed', 'Cancelled'];

    if (!in_array($newStatus, $allowedStatuses)) {
        jsonResponse(['success' => false, 'error' => 'Invalid status'], 400);
    }

    $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE order_code = ?");
    $stmt->execute([$newStatus, $orderCode]);

    jsonResponse(['success' => true, 'order_code' => $orderCode, 'status' => $newStatus]);
}

jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
