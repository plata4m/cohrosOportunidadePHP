<?php
    header('Content-Type: application/json');
    include 'connection.php'; 
    
    $json = json_encode($_POST);
    $obj = json_decode($json);
    
    $conn = getConnection();

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        $sql = "SELECT id, name FROM users WHERE user = '".$obj->{'user'}."' AND pass = '".$obj->{'pass'}."' ";
        $result = mysqli_query($conn, $sql);

        $row_cnt = mysqli_num_rows($result);

        if ($row_cnt > 0) {
            while($row = mysqli_fetch_assoc($result)) {
              $objUser->error = 0;
              $objUser->id = $row["id"];
              $objUser->name = $row["name"];
            }
          } else {
              $objUser->error = 1;
              $objUser->msg = "User not found. Try again.";
          }
    }
    echo json_encode($objUser);
?>