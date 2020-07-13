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
        $sql = " DELETE FROM contact WHERE id = ".$obj->id;
 
        if (mysqli_query($conn, $sql)) {
           $objUser->error = 0;
           $objUser->msg = "Contact deleted successfully";
        } else {
            $objUser->error = 1;
            $objUser->msg = "Error connection database.";
            die("Connection failed: " . $conn->connect_error);
        }
    }
    echo json_encode($objUser);
?>