<?php
include "config.php";

/**
 * Database connected object
 *
 * @var PDO $pdo
 */


/**
 * @param string $name
 * @return mixed
 */
function postInput(string $name): mixed
{
    return $_POST[$name] ?? null;
}

/**
 * @return string
 */
function getClientIpAddress(): string
{
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if (getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if (getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if (getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if (getenv('HTTP_FORWARDED'))
        $ipaddress = getenv('HTTP_FORWARDED');
    else if (getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

try {
    // Check the request method
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception("Invalid request method.");
    }

    // Required Fields
    $department_id = postInput("department_id");
    $section_id = postInput("section_id");
    $semester_id = postInput("semester_id");
    $student_id = postInput("student_id");
    $student_name = postInput("student_name");
    $student_email = postInput("student_email");
    $shift_name = postInput("shift_name");
    $uuid = postInput("uuid");
    $created_at = date("Y-m-d H:i:s");

    $ip = getClientIpAddress();

    // Check if required parameters are missing or invalid
    if (!$department_id || !$section_id || !$semester_id || !$shift_name || !$student_id || !$student_name || !$student_email) {
        throw new Exception("Invalid input parameters.");
    }

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM student_profile WHERE uuid=:uuid");
    $stmt->bindParam(":uuid", $uuid, PDO::PARAM_INT);
    $stmt->execute();
    $exist = $stmt->fetchColumn();


    // Build the SQL query
    if ($exist) {
        // Update
        $sql = <<<SQL
        UPDATE student_profile 
        SET 
             department_id=:department_id,
             section_id=:section_id,
             semester_id=:semester_id,
             student_id=:student_id,
             student_name=:student_name,
             student_email=:student_email,
             shift_name=:shift_name,
             ip=:ip
        WHERE uuid=:uuid
    SQL;
    } else {
        // Insert
        $sql = <<<SQL
        INSERT INTO 
            student_profile (uuid, department_id, section_id, semester_id, student_id, student_name, student_email, shift_name, ip) 
            VALUES (:uuid, :department_id, :section_id, :semester_id, :student_id, :student_name, :student_email, :shift_name, :ip);
    SQL;
    }

    // Prepare and execute the query with parameters
    $stmt = $pdo->prepare($sql);

    // Prepare and execute the query with parameters
    $stmt->bindParam(":department_id", $department_id, PDO::PARAM_INT);
    $stmt->bindParam(":section_id", $section_id, PDO::PARAM_INT);
    $stmt->bindParam(":semester_id", $semester_id, PDO::PARAM_INT);
    $stmt->bindParam(":student_id", $student_id);
    $stmt->bindParam(":student_name", $student_name);
    $stmt->bindParam(":student_email", $student_email);
    $stmt->bindParam(":shift_name", $shift_name);
    $stmt->bindParam(":ip", $ip);
    $stmt->bindParam(":uuid", $uuid);

    $stmt->execute();

    $response = [
        "status" => "SUCCESS",
        "message" => ($exist) ? "Data updated successfully" : "Data inserted successfully",
    ];
} catch (Exception $exception) {
    $response = [
        "status" => "FAILED",
        "message" => $exception->getMessage()
    ];
}

header('Content-Type: application/json');

echo json_encode($response);