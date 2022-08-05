<?php
/**
 * @var object $db
 */

include "config.php";


$response = array(
    "status" => 0,
    "message" => "Failed to action. Tray again."
);

// Form Submit
if (isset($_POST)) {

    $stmt = $db->prepare("SELECT * FROM routines WHERE section_id=?");
    $stmt->execute(array($_POST["section_id"]));
    $row = $stmt->fetch(PDO::FETCH_OBJ);

    if (empty($row)) {
        $response = array(
            "status" => 0,
            "message" => "Failed to create routine. Contact Chanchal."
        );
    } else {

        $time = explode("-", $_POST["time"]);


        $data = array(
            "routine_id"    => $row->id,
            "class_room_id" => $_POST["class_room_id"],
            "course_id"     => $_POST["course_id"],
            "teacher_id"    => $_POST["teacher_id"],
            "start_time"    => $time[0],
            "end_time"      => $time[1],
            "days"          => $_POST["days"]
        );

        try {
            $stmt = $db->prepare("INSERT INTO routine_schedules(routine_id, class_room_id, course_id, teacher_id, start_time, end_time, days) VALUES (?,?,?,?,?,?,?)");
            $stmt->execute(array($data["routine_id"], $data["class_room_id"], $data["course_id"], $data["teacher_id"], $data["start_time"], $data["end_time"], $data["days"]));

            $response = array(
                "status" => 1,
                "message" => "Information has been saved successfully!",
                "data" => $data
            );

        } catch (Exception $e) {

            $response = array(
                "status" => 0,
                "message" => $e->getMessage(),
                "data" => $data
            );
        }


    }
}

echo json_encode($response);