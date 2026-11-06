<?php
// api/reviews.php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM reviews ORDER BY id DESC LIMIT 20");
    $reviews = $stmt->fetchAll();
    jsonResponse(['success' => true, 'data' => $reviews]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $name = sanitize($input['name'] ?? 'Coffee Lover');
    $rating = max(1, min(5, (int)($input['rating'] ?? 5)));
    $comment = sanitize($input['comment'] ?? '');
    $drinkName = sanitize($input['drink_name'] ?? 'Specialty Blend');

    if (empty($comment)) {
        jsonResponse(['success' => false, 'error' => 'Please provide your review thoughts.'], 400);
    }

    $avatarUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';

    $stmt = $pdo->prepare("
        INSERT INTO reviews (customer_name, rating, comment, drink_name, avatar_url)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([$name, $rating, $comment, $drinkName, $avatarUrl]);

    jsonResponse(['success' => true, 'message' => 'Thank you for your review! It shines on our wall.']);
}

jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
