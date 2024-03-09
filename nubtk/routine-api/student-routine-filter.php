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
    $department_id = getInput("department_id");
    $section_id = getInput("section_id");
    $semester_id = getInput("semester_id");
    $shift_name = getInput("shift_name");

    // Check if required parameters are missing or invalid
    if (!$department_id || !$section_id || !$semester_id || !$shift_name) {
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
                t1.section_id = ? AND t1.department_id = ? AND t1.semester_id = ? AND t1.shift = ?
            ORDER BY t3.course_code
            SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$section_id, $department_id, $semester_id, $shift_name]);
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
                t1.section_id = ? AND t1.department_id = ? AND t1.semester_id = ? AND t1.shift = ?
            ORDER BY t2.day
            SQL;
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$section_id, $department_id, $semester_id, $shift_name]);
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
                t1.section_id = ? AND t1.department_id = ? AND t1.semester_id = ? AND t1.shift = ?
            ORDER BY t3.start_time
            SQL;
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$section_id, $department_id, $semester_id, $shift_name]);
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
                t1.section_id = ? AND t1.department_id = ? AND t1.semester_id = ? AND t1.shift = ?
            ORDER BY t3.room_title
            SQL;
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$section_id, $department_id, $semester_id, $shift_name]);
    $rooms = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Teachers
    $sql = <<<SQL
            SELECT
                DISTINCT t3.*
            FROM
                routines t1
            JOIN schedules t2 ON
                t2.routine_id = t1.id
            INNER JOIN teachers t3 ON
                t3.id = t2.teacher_id
            WHERE
                t1.section_id = ? AND t1.department_id = ? AND t1.semester_id = ? AND t1.shift = ?
            ORDER BY t3.short_name
            SQL;
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$section_id, $department_id, $semester_id, $shift_name]);
    $teachers = $stmt->fetchAll(PDO::FETCH_OBJ);

    $response = [
        "status" => "SUCCESS",
        "message" => "Query success!",
        "query" => [
            "section_id" => $section_id,
            "department_id" => $department_id,
            "semester_id" => $semester_id,
            "shift" => $shift_name
        ],
        "data" => [
            "courses" => $courses,
            "days" => $days,
            "times" => $times,
            "rooms" => $rooms,
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