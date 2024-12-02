<?php
include('db_connect.php'); // Incluir la conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $ownerFullName = $_POST['ownerFullName'];
    $ownerAddress = $_POST['ownerAddress'];
    $ownerPhone = $_POST['ownerPhone'];
    $ownerAge = $_POST['ownerAge'];

    
    $stmt = $conn->prepare("INSERT INTO owners (full_name, address, phone, age) 
    VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $ownerFullName, $ownerAddress, $ownerPhone, $ownerAge);

    
    if ($stmt->execute()) {
        echo "Propietario registrado con éxito.";
    } else {
        echo "Error: " . $stmt->error;
    }

    
    $stmt->close();
    $conn->close();
}
?>
