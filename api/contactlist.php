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
        $where = "";
        if($obj->action == 'edit'){
            $where = " WHERE id = ".$obj->id;
        }
        $sql = "SELECT id, name, email, primaryphone, watsapp, phones, adress, number, neighborhood, zipcode  FROM contact ". $where;
        $result = mysqli_query($conn, $sql);

        $row_cnt = mysqli_num_rows($result);

        $array = array();
        if ($row_cnt > 0) {
            $i=0;
            while($row = mysqli_fetch_assoc($result)) {              
                $objUser[$i]->id = $row["id"];
                $objUser[$i]->name = $row["name"];
                $objUser[$i]->email = $row["email"];
                $objUser[$i]->primaryphone = $row["primaryphone"];
                $objUser[$i]->watsapp = $row["watsapp"];
                $objUser[$i]->phones = $row["phones"];
                $objUser[$i]->adress = $row["adress"];
                $objUser[$i]->number = $row["number"];
                $objUser[$i]->neighborhood = $row["neighborhood"];
                $objUser[$i]->zipcode = $row["zipcode"];
                $i++;
            }
          } else {
              $objUser->error = 1;
              $objUser->msg = "User not found. Try again.";
          }
    }
    echo json_encode($objUser);
?>