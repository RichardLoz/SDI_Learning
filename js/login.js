const validarFormulario = () => {
    //TODO: Obtener valores de DNI y Contrasena
    let dniInput = document.getElementById('dni');
    let passInput = document.getElementById('contraseña');

    //TODO: Validacion
    if (dniInput && passInput) {
        let dni = dniInput.value
        let pass = passInput.value

        loginAdmin(dni, pass)
        //console.log(`Longitidu de la contrasena ${contraseña.length}`)
        // if (/^\d{8}$/.test(dni)) {
        //     console.log("DNI APROBADO")
        //     if (contraseña.length >8) {
        //         //TODO: Dirigir a la pantalla principal\
        //         window.location.href= 'inicio.html';
        //     }else{
        //         alert("La contraseña debe tener al menos 8 caracteres");
        //     }
        // }else {
        //     alert("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
        }
    // }else {
    //     console.log("Error en el formulario");
    // }
}

//Login
function loginAdmin(dni, pass) {
    const credentials = btoa(dni + ':' + pass)

    //Solicitud Login
    $.ajax({
        url: "https://sdilearning-api.solucionesdeizajes.com.ar/users/login",
        type: "POST",
        headers: {
            "X-API-key": "aguantevokita123_",
            "Authorization": "Basic " + credentials
        },
        xhrFields: {
            withCredentials: true
        },

        success: function(response) {
            // Una vez que la autenticación es exitosa, puedes proceder a enviar los datos
            sendData(response.token); // Suponiendo que el token está en la respuesta
        },
        error: function(error) {
            console.error("Error en la solicitud de login:", error);
        }
    })
}
