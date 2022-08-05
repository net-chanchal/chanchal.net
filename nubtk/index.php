<?php
/**
 * @var object $db
 */

include "config.php";

// Class Room
$stmt = $db->prepare("SELECT * FROM class_rooms");
$stmt->execute();
$class_rooms = $stmt->fetchAll(PDO::FETCH_OBJ);

// Sections
$stmt = $db->prepare("SELECT * FROM sections");
$stmt->execute();
$sections = $stmt->fetchAll(PDO::FETCH_OBJ);

// Courses
$stmt = $db->prepare("SELECT * FROM courses");
$stmt->execute();
$courses = $stmt->fetchAll(PDO::FETCH_OBJ);

// Teachers
$stmt = $db->prepare("SELECT * FROM teachers");
$stmt->execute();
$teachers = $stmt->fetchAll(PDO::FETCH_OBJ);
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Routine Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

</head>
<body>



    <div class="container">

        <div class="row">
            <div class="col-md-6 offset-md-3 mt-4 mb-2">
                <h2 class="text-center">Routine Registration</h2>
            </div>
            <div class="col-md-6 offset-md-3">
                <div class="alert alert-dismissible fade show" role="alert" style="display: none">
                    <span id="message"><!-- For Javascript Response --></span>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 offset-md-4 mt-5">
                <form action="submit.php" class="form" method="post">
                    <div class="mb-3">
                        <label for="class_room_id" class="form-label">Class Room</label>
                        <select name="class_room_id" id="class_room_id" class="form-control select2" required>
                            <option value="">Choose...</option>
                            <?php
                            foreach ($class_rooms as $row) {
                                echo "<option value=\"$row->id\">$row->room_name</option>";
                            }
                            ?>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="section_id" class="form-label">Section</label>
                        <select name="section_id" id="section_id" class="form-control select2" required>
                            <option value="">Choose...</option>
                            <?php
                            foreach ($sections as $row) {
                                echo "<option value=\"$row->id\">$row->section_name</option>";
                            }
                            ?>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="course_id" class="form-label">Course Code</label>
                        <select name="course_id" id="course_id" class="form-control select2" required>
                            <option value="">Choose...</option>
                            <?php
                            foreach ($courses as $row) {
                                echo "<option value=\"$row->id\">$row->course_code</option>";
                            }
                            ?>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="teacher_id" class="form-label">Teacher</label>
                        <select name="teacher_id" id="teacher_id" class="form-control select2" required>
                            <option value="">Choose...</option>
                            <?php
                            foreach ($teachers as $row) {
                                echo "<option value=\"$row->id\">$row->short_name - $row->full_name</option>";
                            }
                            ?>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="time" class="form-label">Time</label>
                        <select name="time" id="time" class="form-control select2" required>
                            <option value="">Choose...</option>
                            <option value="09:00:00-10:30:00">9:00 AM - 10:30 AM</option>
                            <option value="10:30:00-12:00:00">10:30 AM - 12:00 PM</option>
                            <option value="12:00:00-13:30:00">12:00 AM - 01:30 AM</option>
                            <option value="14:00:00-15:30:00">02:00 AM - 03:30 AM</option>
                            <option value="15:30:00-16:45:00">03:30 AM - 04:45 AM</option>
                            <option value="16:00:00-18:00:00">04:45 AM - 06:00 AM</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="days" class="form-label">Days</label>
                        <select name="days" id="days" class="form-control select2" required>
                            <option value="">Choose...</option>
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <button type="submit" class="btn btn-secondary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script>
        $(document).ready(function() {
             $('.select2').select2();

             $(".btn-close").on("click", function() {
                 $(".alert").hide();
             });

             $("form").submit(function(e) {
                 e.preventDefault();

                 let form = $(this);

                 $.ajax({
                     url: form.attr("action"),
                     method: "post",
                     data: form.serialize(),
                     beforeSend: function() {
                         $(".btn").text("Please wait...");
                         $(".btn").addClass("disabled");
                     },
                     success: function(data) {
                         data = JSON.parse(data);

                         $(".alert").show();

                         if (parseInt(data.status) === 0) {
                             $(".alert")
                                 .removeClass("alert-success")
                                 .addClass("alert-danger");
                         } else {
                             $(".alert")
                                 .addClass("alert-success")
                                 .removeClass("alert-danger");

                             $(".select2").val(null).trigger("change");
                         }

                         $("#message").text(data.message);

                         $(".btn").text("Save");
                         $(".btn").removeClass("disabled");
                     }
                 });
             });


        });

    </script>

</body>
</html>