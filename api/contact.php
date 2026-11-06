<?php
// api/contact.php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $name = sanitize($input['name'] ?? '');
    $email = sanitize($input['email'] ?? '');
    $subject = sanitize($input['subject'] ?? 'General Inquiry');
    $message = sanitize($input['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        jsonResponse(['success' => false, 'error' => 'Please provide your name, email, and message.'], 400);
    }

    $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $subject, $message]);

    jsonResponse(['success' => true, 'message' => 'Your message has been received by our concierge. We will reply within 24 hours.']);
}

jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
