<?php
// api/reservations.php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $action = $_GET['action'] ?? 'all';

    if ($action === 'tables') {
        $tables = $pdo->query("SELECT * FROM cafe_tables ORDER BY table_id ASC")->fetchAll();
        jsonResponse(['success' => true, 'tables' => $tables]);
    }

    $stmt = $pdo->query("SELECT * FROM reservations ORDER BY id DESC LIMIT 30");
    $reservations = $stmt->fetchAll();

    jsonResponse(['success' => true, 'data' => $reservations]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $name = sanitize($input['name'] ?? '');
    $email = sanitize($input['email'] ?? '');
    $phone = sanitize($input['phone'] ?? '');
    $date = sanitize($input['date'] ?? date('Y-m-d'));
    $time = sanitize($input['time'] ?? '18:00');
    $partySize = (int)($input['party_size'] ?? 2);
    $seatingArea = sanitize($input['seating_area'] ?? 'Velvet Lounge');
    $specialRequests = sanitize($input['special_requests'] ?? '');

    if (empty($name) || empty($email) || empty($phone)) {
        jsonResponse(['success' => false, 'error' => 'Please fill in all required fields.'], 400);
    }

    $bookingCode = generateBookingCode();

    $stmt = $pdo->prepare("
        INSERT INTO reservations (booking_code, customer_name, customer_email, customer_phone, reservation_date, reservation_time, party_size, seating_area, special_requests, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')
    ");

    $stmt->execute([
        $bookingCode,
        $name,
        $email,
        $phone,
        $date,
        $time,
        $partySize,
        $seatingArea,
        $specialRequests
    ]);

    // Update an available table in that zone to reserved
    $zoneMatch = "%" . explode(' ', $seatingArea)[0] . "%";
    $availTable = $pdo->prepare("SELECT table_id FROM cafe_tables WHERE zone LIKE ? AND status = 'available' LIMIT 1");
    $availTable->execute([$zoneMatch]);
    $tblId = $availTable->fetchColumn();

    if ($tblId) {
        $updTbl = $pdo->prepare("UPDATE cafe_tables SET status = 'reserved', guest_name = ? WHERE table_id = ?");
        $updTbl->execute([$name . " · " . $time, $tblId]);
    }

    jsonResponse([
        'success' => true,
        'booking_code' => $bookingCode,
        'table_id' => $tblId ? $tblId : 'Assigned upon arrival',
        'customer_name' => $name,
        'date' => $date,
        'time' => $time,
        'party_size' => $partySize,
        'seating_area' => $seatingArea,
        'message' => 'Table reservation confirmed! We look forward to welcoming you.'
    ]);
}

jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
