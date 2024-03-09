<?php
const DB_HOSTNAME = "localhost";
const DB_USERNAME = "root";
const DB_PASSWORD = "chanchal";
const DB_DATABASE = "nubtk_routine";

try {
    $pdo = new PDO(sprintf("mysql:host=%s;dbname=%s", DB_HOSTNAME, DB_DATABASE), DB_USERNAME, DB_PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: ", $e->getMessage();
    exit;
}

// Set the allowed origin(s)
$allowedOrigins = [
    'http://localhost:3000',  // Add any other allowed origins as needed
    'http://192.168.0.179:3000',  // Add any other allowed origins as needed
];

// Get the request origin
$origin = $_SERVER['HTTP_ORIGIN'] ?? "";

// Check if the request origin is in the list of allowed origins
if (in_array($origin, $allowedOrigins)) {
    // Set the appropriate CORS headers
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    // Additional headers for handling preflight requests (OPTIONS)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Max-Age: 86400'); // 24 hours
        header('Content-Length: 0');
        header('Content-Type: text/plain');
    }
}