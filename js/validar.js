$(document).ready(function() {
    // Agrega un evento de clic al botón "Enviar respuestas"
    $("#enviarRespuestasBtn").on("click", function() {
        // Array para almacenar los id de las respuestas seleccionadas
        let respuestasSeleccionadas = [];

        // Recorre todos los elementos input de tipo radio
        $('input[type=radio]:checked').each(function() {
            // Obtiene el id y lo agrega al array
            respuestasSeleccionadas.push($(this).attr('id'));
        });

        // Muestra los id de las respuestas seleccionadas en la consola (puedes ajustar esto según tus necesidades)
        console.log("respuestas:", respuestasSeleccionadas);

        // Realiza la llamada AJAX para validar las respuestas
        $.ajax({
            url: "https://sdilearning-api.solucionesdeizajes.com.ar/answer/check",
            type: "POST",
            data: { respuestas: respuestasSeleccionadas }, // Envía el array de respuestas al servidor
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

