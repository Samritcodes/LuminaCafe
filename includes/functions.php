<?php
// includes/functions.php - Utility and formatting functions

function formatPrice($price) {
    return '$' . number_format((float)$price, 2);
}

function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function generateOrderCode() {
    return 'AUR-' . strtoupper(bin2hex(random_bytes(3)));
}

function generateBookingCode() {
    return 'RES-' . strtoupper(bin2hex(random_bytes(3)));
}

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}
