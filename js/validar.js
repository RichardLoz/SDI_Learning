//Login
function loginAdmin() {
    const credentials = btoa(user1.name + ':' + user1.password)

    //Solicitud Login
    $.ajax({
        url: "https://sdilearning-api.solucionesdeizajes.com.ar/users/login",
        type: "POST",
        headers: {
            "X-API_key": "aguantevokita123_",
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


$(document).ready(function() {
    // Agrega un evento de clic al botón "Enviar respuestas"
    $("#enviarRespuestasBtn").on("click", function() {
        // Array para almacenar los id de las respuestas seleccionadas
        let respuestasSeleccionadas = [];

        // Recorre todos los elementos input de tipo radio seleccionados
        $('input[type=radio]:checked').each(function() {
            // Obtiene el id y lo agrega al array
            respuestasSeleccionadas.push($(this).attr('id'));
        });

        // Muestra los id de las respuestas seleccionadas en la consola
        console.log("respuestas:", respuestasSeleccionadas);

        // Realiza la llamada AJAX para validar las respuestas
        $.ajax({
            url: "https://sdilearning-api.solucionesdeizajes.com.ar/answer/check",
            type: "POST",
            data: JSON.stringify({ respuestas: respuestasSeleccionadas }), // Envía el array de respuestas al servidor
            //Headers
            headers: {
                "X-API-key": "aguanteVokita123_",
                "Content-Type": "application/json"
            },
            success: function(response) {
                // Manejar la respuesta del servidor
                console.log("Respuesta del servidor:", response);
            },
            error: function(error) {
                console.error("Error en la llamada AJAX:", error);
            }
        });
    });
});

