<?php
// api/menu.php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $category = $_GET['category'] ?? 'all';
    $search = $_GET['search'] ?? '';

    $query = "SELECT * FROM menu_items WHERE 1=1";
    $params = [];

    if ($category !== 'all' && !empty($category)) {
        $query .= " AND category = ?";
        $params[] = $category;
    }

    if (!empty($search)) {
        $query .= " AND (name LIKE ? OR description LIKE ? OR dietary LIKE ?)";
        $params[] = "%$search%";
        $params[] = "%$search%";
        $params[] = "%$search%";
    }

    $query .= " ORDER BY id ASC";
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $items = $stmt->fetchAll();

    jsonResponse(['success' => true, 'data' => $items]);
}

if ($method === 'POST') {
    // For admin toggling stock or updating price
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    $action = $input['action'] ?? '';

    if (!$id) {
        jsonResponse(['success' => false, 'error' => 'Missing item ID'], 400);
    }

    if ($action === 'toggle_stock') {
        $stmt = $pdo->prepare("UPDATE menu_items SET in_stock = 1 - in_stock WHERE id = ?");
        $stmt->execute([$id]);
        $updated = $pdo->prepare("SELECT in_stock FROM menu_items WHERE id = ?");
        $updated->execute([$id]);
        $newStock = $updated->fetchColumn();
        jsonResponse(['success' => true, 'in_stock' => (int)$newStock]);
    }

    jsonResponse(['success' => false, 'error' => 'Invalid action'], 400);
}

jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
