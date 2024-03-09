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

    // Required Fields
    $semester_id = getInput("semester_id");
    $teacher_id = getInput("teacher_id");

    // Check if required parameters are missing or invalid
    if (!$semester_id || !$teacher_id) {
        throw new Exception("Invalid input parameters.");
    }

    // Create an array to hold conditions for optional parameters
    $conditions = [];

    $queryParameters = [];

    $queryParameters["semester_id"] = $semester_id;
    $queryParameters["teacher_id"] = $teacher_id;

    // Optional Fields (It's for only filter routine)
    $course_id = getInput("course_id");
    $day = getInput("day");
    $room_id = getInput("room_id");
    $time_id = getInput("time_id");

    if ($course_id) {
        $conditions[] = "t2.course_id = :course_id";
        $queryParameters["course_id"] = $course_id;
    }
    if ($day) {
        $conditions[] = "t2.day = :day";
        $queryParameters["day"] = $day;
    }
    if ($room_id) {
        $conditions[] = "t2.room_id = :room_id";
        $queryParameters["room_id"] = $room_id;
    }
    if ($time_id) {
        $conditions[] = "t2.time_id = :time_id";
        $queryParameters["time_id"] = $time_id;
    }

    // Build the SQL query
    $sql = <<<SQL
        SELECT
            t2.course_id,
            t3.course_title,
            t3.course_code,
            t3.credit,
            t4.section_name,
            t7.department_short_name,
            t5.id AS time_id,
            t5.start_time,
            t5.end_time,
            TIME_FORMAT(t5.start_time, '%h:%i %p') AS start_time12,
            TIME_FORMAT(t5.end_time, '%h:%i %p') AS end_time12,
            t6.id AS room_id,
            t6.level,
            t6.room_title,
            t2.day,
            t1.shift
        FROM
            routines t1
        JOIN schedules t2 ON
            t2.routine_id = t1.id
        JOIN courses t3 ON
            t3.id = t2.course_id
        JOIN sections t4 ON
            t4.id = t1.section_id
        JOIN times t5 ON
            t5.id = t2.time_id
        JOIN rooms t6 ON
            t6.id = t2.room_id
        JOIN departments t7 ON 
            t7.id = t1.department_id
        WHERE
            t1.semester_id = :semester_id
            AND t2.teacher_id = :teacher_id
    SQL;

    // Add conditions for optional parameters if they exist
    if (!empty($conditions)) {
        $sql .= " AND " . implode(" AND ", $conditions);
    }

    $sql .= " ORDER BY t5.start_time";

    // Prepare and execute the query with parameters
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':semester_id', $semester_id, PDO::PARAM_INT);
    $stmt->bindParam(':teacher_id', $teacher_id, PDO::PARAM_INT);

    // Bind parameters for optional fields
    if ($course_id) {
        $stmt->bindParam(':course_id', $course_id, PDO::PARAM_INT);
    }
    if ($day) {
        $stmt->bindParam(':day', $day);
    }
    if ($room_id) {
        $stmt->bindParam(':room_id', $room_id, PDO::PARAM_INT);
    }
    if ($time_id) {
        $stmt->bindParam(':time_id', $time_id, PDO::PARAM_INT);
    }

    $stmt->execute();

    $response = [
        "status" => "SUCCESS",
        "message" => "Query success!",
        "query" => $queryParameters,
        "data" => $stmt->fetchAll(PDO::FETCH_OBJ)
    ];
} catch (Exception $exception) {
    $response = [
        "status" => "FAILED",
        "message" => $exception->getMessage()
    ];
}

header('Content-Type: application/json');

echo json_encode($response);