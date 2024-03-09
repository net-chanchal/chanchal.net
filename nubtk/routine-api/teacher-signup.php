<?php
include "config.php";
/**
 * @var PDO $pdo
 */

try {
    // Semesters
    $stmt = $pdo->prepare("SELECT * FROM semesters ORDER BY semester_name");
    $stmt->execute();
    $semesters = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Teachers
    $stmt = $pdo->prepare("SELECT * FROM teachers ORDER BY short_name");
    $stmt->execute();
    $teachers = $stmt->fetchAll(PDO::FETCH_OBJ);

    $response = [
        "status" => "SUCCESS",
        "message" => "Query success!",
        "data" => [
            "semesters" => $semesters,
            "teachers" => $teachers,
        ]
    ];
} catch (Exception $exception) {
    $response = [
        "status" => "FAILED",
        "message" => $exception->getMessage()
    ];
}

header('Content-Type: application/json');

echo json_encode($response);