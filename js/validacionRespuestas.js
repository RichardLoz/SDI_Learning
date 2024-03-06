$(document).ready(function () {
  // Función para validar respuestas seleccionadas
  function validarRespuestas() {
      var todasRespondidas = true;

      // Iterar sobre cada módulo
      $('[data-modulo]').each(function () {
          var modulo = $(this);

          // Verificar si al menos una opción está seleccionada en el módulo
          if (modulo.find('input[type="radio"]:checked').length === 0) {
              todasRespondidas = false;
              return false; // Salir del bucle si no se ha respondido en este módulo
          }
      });

      // Habilitar o deshabilitar el botón "Enviar respuestas" según la validación
      $('#enviarRespuestasBtn').prop('disabled', !todasRespondidas);
  }

  // Asociar la función de validación a los eventos de cambio en los radio buttons
  $('input[type="radio"]').on('change', validarRespuestas);
});



// Llamada enviando el objeto respuestas
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
          headers: {
            "X-API-key": "aguanteVokita123_",
            "Content-Type": "application/json" // Establecer el tipo de contenido como JSON
           // "Authorization": "Basic " + credentials
            },
          data: JSON.stringify({ respuestas: respuestasSeleccionadas }), // Convierto a JSON y enviar el array de respuestas al SRV
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



