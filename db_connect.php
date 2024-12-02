<?php
// db_connect.php
$username = "if0_37837517";
$password = "proyectoveter28";
$servername="";
$dbname = "if0_37837517_veteriB";
$host = "sql207.infinityfree.com";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
