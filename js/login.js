const validarFormulario = () => {
    //TODO: Obtener valores de DNI y Contrasena
    let dniInput = document.getElementById('dni');
    let contraseñaInput = document.getElementById('contraseña');

    //TODO: Validacion
    if (dniInput && contraseñaInput) {
        let dni = dniInput.value
        let contraseña = contraseñaInput.value

        console.log(`Longitidu de la contrasena ${contraseña.length}`)
        if (/^\d{8}$/.test(dni)) {
            console.log("DNI APROBADO")
            if (contraseña.length >8) {
                //TODO: Dirigir a la pantalla principal\
                window.location.href= 'inicio.html';
            }else{
                alert("La contraseña debe tener al menos 8 caracteres");
            }
        }else {
            alert("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
        }
    }else {
        console.log("Error en el formulario");
    }
}