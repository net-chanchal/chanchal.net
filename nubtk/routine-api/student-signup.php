<?php
include "config.php";
/**
 * @var PDO $pdo
 */

try {
    // Departments
    $stmt = $pdo->prepare("SELECT * FROM departments ORDER BY department_short_name");
    $stmt->execute();
    $departments = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Sections
    $stmt = $pdo->prepare("SELECT * FROM sections ORDER BY section_name");
    $stmt->execute();
    $sections = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Semesters
    $stmt = $pdo->prepare("SELECT * FROM semesters ORDER BY semester_name");
    $stmt->execute();
    $semesters = $stmt->fetchAll(PDO::FETCH_OBJ);


    $shifts = [
        ["shift_name" => "1st Shift"],
        ["shift_name" => "2nd Shift"],
        ["shift_name" => "Evening Shift"]
    ];

    $response = [
        "status" => "SUCCESS",
        "message" => "Query success!",
        "data" => [
            "departments" => $departments,
            "sections" => $sections,
            "semesters" => $semesters,
            "shifts" => $shifts,
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