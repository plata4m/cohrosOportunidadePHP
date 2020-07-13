<?php
    header('Content-Type: application/json');
    include 'connection.php'; 
    
    $json = json_encode($_POST);
    $obj = json_decode($json);

    $conn = getConnection();

    if ($conn->connect_error) {
        $objUser->error = 1;
        $objUser->msg = "Error connection database.";
        die("Connection failed: " . $conn->connect_error);
    } else {
        $sql = " INSERT INTO contact ( name, email, primaryphone, watsapp, phones, adress, number, neighborhood, zipcode ) ".
               " VALUES ('".$obj->name."','".$obj->email."','".$obj->primaryphone."',".$obj->watsapp.",'".$obj->phones."','".$obj->adress."','".$obj->number."','".$obj->neighborhood."','".$obj->zipcode."') ";
        if (mysqli_query($conn, $sql)) {
           $objUser->error = 0;
           $objUser->msg = "New contact created successfully";
        } else {
            $objUser->error = 1;
            $objUser->msg = "Error connection database.";
            die("Connection failed: " . $conn->connect_error);
        }
    }
    echo json_encode($objUser);
?>