<?php
include "config.php";
/**
 * @var PDO $pdo
 */

try {
    // Departments
    $stmt = $pdo->prepare("SELECT value FROM settings WHERE name='HELP'");
    $stmt->execute();
    $help = $stmt->fetchColumn();

    $response = [
        "status" => "SUCCESS",
        "message" => "Query success!",
        "help" => $help
    ];
} catch (Exception $exception) {
    $response = [
        "status" => "FAILED",
        "message" => $exception->getMessage()
    ];
}

header('Content-Type: application/json');

echo json_encode($response);