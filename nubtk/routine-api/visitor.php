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
    $uuid = postInput("uuid");
    $name = postInput("name");
    $ip = getClientIpAddress();
    $data = postInput("data");
    $created_at = date("Y-m-d H:i:s");


    // Check if required parameters are missing or invalid
    if (!$name || !$data || !$uuid) {
        throw new Exception("Invalid input parameters.");
    }

    // Build the SQL query
    $sql = <<<SQL
        INSERT INTO 
            visitors (uuid, name, ip, data, created_at) 
            VALUES (:uuid, :name, :ip, :data, :created_at);
    SQL;
    // Prepare and execute the query with parameters
    $stmt = $pdo->prepare($sql);

    // Prepare and execute the query with parameters
    $stmt->bindParam(":uuid", $uuid);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":ip", $ip);
    $stmt->bindParam(":data", $data);
    $stmt->bindParam(":created_at", $created_at);

    $stmt->execute();

    $response = [
        "status" => "SUCCESS",
        "message" => "Data inserted successfully",
    ];
} catch (Exception $exception) {
    $response = [
        "status" => "FAILED",
        "message" => $exception->getMessage()
    ];
}

header('Content-Type: application/json');

echo json_encode($response);