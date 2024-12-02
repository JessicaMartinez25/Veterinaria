<?php
include('db_connect.php'); // Incluir la conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $treatmentDisease = $_POST['treatmentDisease'];
    $treatmentMedicines = $_POST['treatmentMedicines'];
    $treatmentDate = $_POST['treatmentDate'];
    $treatmentPatient = $_POST['treatmentPatient'];

    
    $stmt = $conn->prepare("INSERT INTO treatments (disease, medicines, date, patient) 
    VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $treatmentDisease, $treatmentMedicines, $treatmentDate, $treatmentPatient);

    
    if ($stmt->execute()) {
        echo "Tratamiento registrado con éxito.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Cerrar la conexión
    $stmt->close();
    $conn->close();
}
?>
