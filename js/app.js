




function toggleForm(formId) {
    const form = document.getElementById(formId);
    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("service-worker.js")
            .then((registration) => {
                console.log("Service Worker registrado con éxito:", registration);
            })
            .catch((error) => {
                console.error("Error al registrar el Service Worker:", error);
            });
    });
}   


function loadPatients() {
    fetch('view_data.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('patientsList').innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
}

// Llamar a la función para cargar los pacientes cada vez que se registre uno nuevo
// Evento para el formulario de pacientes
document.getElementById('patientsFormContent').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    const formData = new FormData(this);
    
    fetch('savePatient.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Solo mostrar el mensaje de éxito o error
    })
    .catch(error => console.error('Error:', error));
});

// Evento para el formulario de propietarios
document.getElementById('ownersFormContent').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    const formData = new FormData(this);
    
    fetch('save_owner.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Solo mostrar el mensaje de éxito o error
    })
    .catch(error => console.error('Error:', error));
});

// Evento para el formulario de tratamientos
document.getElementById('treatmentsFormContent').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    const formData = new FormData(this);
    
    fetch('save_treatment.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Solo mostrar el mensaje de éxito o error
    })
    .catch(error => console.error('Error:', error));
});

// Evento para el formulario de citas
document.getElementById('appointmentsFormContent').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    const formData = new FormData(this);
    
    fetch('save_appointment.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Solo mostrar el mensaje de éxito o error
    })
    .catch(error => console.error('Error:', error));
});



/* Pantall  carag */
 // Función para comprobar si hay conexión a Internet
function isOnline() {
    return navigator.onLine;
}

// Función para ocultar la pantalla de carga
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');
}

// Mostrar la pantalla de carga durante un tiempo
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.remove('hidden'); // Asegura que se muestre el spinner

    // Aquí puedes definir el tiempo en milisegundos, por ejemplo 3 segundos.
    const timeout = 3000; // 3000ms = 3 segundos

    // Verificamos si ya hay conexión antes de que pase el tiempo
    const checkConnection = setInterval(() => {
        if (isOnline()) {
            clearInterval(checkConnection); // Detenemos la verificación
            hideLoadingScreen(); // Ocultamos el spinner
        }
    }, 1000); // Comprobamos la conexión cada segundo

    // Si después de 'timeout' segundos no hay conexión, ocultamos la pantalla de carga
    setTimeout(() => {
        clearInterval(checkConnection); // Detenemos la verificación
        hideLoadingScreen(); // Ocultamos el spinner
    }, timeout);
}

// Llamamos a la función cuando cargue la página
window.onload = showLoadingScreen;
