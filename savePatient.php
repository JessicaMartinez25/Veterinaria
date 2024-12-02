<?php
include('db_connect.php'); // Incluir la conexión a la base de datos}


ini_set('display_errors', 1);
error_reporting(E_ALL);


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $patientName = $_POST['patientName'];
    $patientOwner = $_POST['patientOwner'];
    $patientAge = $_POST['patientAge'];
    $patientBirthdate = $_POST['patientBirthdate'];
    $patientBreed = $_POST['patientBreed'];

    $stmt = $conn->prepare("INSERT INTO patients (name, owner, age, birthdate, breed) 
    VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiss", $patientName, $patientOwner, $patientAge, $patientBirthdate, $patientBreed);

    if ($stmt->execute()) {
        echo "Paciente registrado con éxito.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
