<?php
include('db_connect.php'); // Incluir la conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $appointmentDate = $_POST['appointmentDate'];
    $appointmentDay = $_POST['appointmentDay'];
    $appointmentHour = $_POST['appointmentHour'];
    $appointmentAssignedBy = $_POST['appointmentAssignedBy'];

    $stmt = $conn->prepare("INSERT INTO appointments (date, day, hour, assigned_by) 
    VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $appointmentDate, $appointmentDay, $appointmentHour, $appointmentAssignedBy);

    
    if ($stmt->execute()) {
        echo "Cita registrada con éxito";
    } else {
        echo "Error: " . $stmt->error;
    }

    
    $stmt->close();
    $conn->close();
}
?>
