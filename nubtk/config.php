<?php
// Database Connection
try {
    $db = new PDO("mysql:host=162.241.194.27;dbname=cybersec_routine", "cybersec_routine", "Na3Vh?SX[2@H");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    exit("Database Connection failed: " . $e->getMessage());
}