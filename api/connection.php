<?php

function getConnection() {
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $schema = "testeapp";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $schema);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    return $conn;
    //echo "Connected successfully";
}

?>