<?php
include "config.php";
/**
 * @var PDO $pdo
 */

/**
 * @param string $name
 * @return mixed
 */
function getInput(string $name): mixed
{
    return $_GET[$name] ?? null;
}

try {
    // Check the request method
    if ($_SERVER["REQUEST_METHOD"] !== "GET") {
        throw new Exception("Invalid request method.");
    }

    // Validate and sanitize input parameters
    $semester_id = getInput("semester_id");
    $teacher_id = getInput("teacher_id");

    // Check if required parameters are missing or invalid
    if (!$semester_id || !$teacher_id) {
        throw new Exception("Invalid input parameters.");
    }

    // Courses
    $sql = <<<SQL
            SELECT
                DISTINCT t3.*
            FROM
                routines t1
            JOIN schedules t2 ON
                t2.routine_id = t1.id
            INNER JOIN courses t3 ON
                t3.id = t2.course_id
            WHERE
                t1.semester_id = ? AND t2.teacher_id = ?
            ORDER BY t3.course_code
            SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$semester_id, $teacher_id]);
    $courses = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Days
    $sql = <<<SQL
            SELECT
                DISTINCT t2.day
            FROM
                routines t1
            JOIN schedules t2 ON
                t2.routine_id = t1.id
            WHERE
                t1.semester_id = ? AND t2.teacher_id = ?
            ORDER BY t2.day
            SQL;
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$semester_id, $teacher_id]);
    $days = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Times
    $sql = <<<SQL
            SELECT
                DISTINCT t3.*,
                TIME_FORMAT(t3.start_time, '%h:%i %p') AS start_time12,
                TIME_FORMAT(t3.end_time, '%h:%i %p') AS end_time12
            FROM
                routines t1
            JOIN schedules t2 ON
                t2.routine_id = t1.id
            INNER JOIN times t3 ON
                t3.id = t2.time_id
            WHERE
                t1.semester_id = ? AND t2.teacher_id = ?
            ORDER BY t3.start_time
            SQL;
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$semester_id, $teacher_id]);
    $times = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Rooms
    $sql = <<<SQL
            SELECT
                DISTINCT t3.*
            FROM
                routines t1
            JOIN schedules t2 ON
                t2.routine_id = t1.id
            INNER JOIN rooms t3 ON
                t3.id = t2.room_id
            WHERE
                t1.semester_id = ? AND t2.teacher_id = ?
            ORDER BY t3.room_title
            SQL;
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$semester_id, $teacher_id]);
    $rooms = $stmt->fetchAll(PDO::FETCH_OBJ);

    $response = [
        "status" => "SUCCESS",
        "message" => "Query success!",
        "query" => [
            "semester_id" => $semester_id,
            "teacher_id" => $teacher_id
        ],
        "data" => [
            "courses" => $courses,
            "days" => $days,
            "times" => $times,
            "rooms" => $rooms,
            "teachers" => [],
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