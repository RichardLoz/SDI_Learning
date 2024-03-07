var modulosAprobados = [];
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
          data: JSON.stringify(respuestasSeleccionadas), // Convierto a JSON y enviar el array de respuestas al SRV
          success: function(response) {
              // Manejar la respuesta del servidor
              console.log("Respuesta del servidor:", response);
              if (response.Respuesta.aprobo) {
                console.log("El usuario aprobo")
                // Si el usuario aprobó, muestra un alert
                alert("¡Has aprobado el test!");
                $('#testModal2').modal('hide'); // Cerrar ventana modal
                $('[id$="ApprovalIcon"]').show(); // mostrar icono de Aprobacion
            } else {
                // Si el usuario no aprobó, cambia el orden de las preguntas en el modal
                cambiarOrdenPreguntas();
                // $('input[type=radio]:checked').prop('checked', false); // Limpiar las respuestas seleccionadas
            }
          },
          error: function(error) {
              console.error("Error en la llamada AJAX:", error);
          }
      });
  });

  // Función para cambiar el orden de las preguntas en el modal
  function cambiarOrdenPreguntas() {
    // Encuentra todos los elementos "modal-body"
    let preguntas = $('.modal-body');
    // Invierte el orden de los elementos
    preguntas.each(function(index, pregunta) {
        $(pregunta).prependTo(pregunta.parentNode);
        $(pregunta).find('p').text(`Pregunta ${index + 1}: ${$(pregunta).find('p').text()}`);
    });
    }

});

$(document).ready(function () {
    // Función para generar el certificado PDF
    function generarCertificadoPDF() {
        // Crear un nuevo documento PDF
        var doc = new jsPDF();

        // Agregar un borde alrededor de la página
        doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');

        // Agregar un logo al certificado
        var logo = new Image();
        logo.src = '/img/core-img/logo.png'; // Cambia 'ruta_del_logo.png' por la URL o la ruta de tu logo
        doc.addImage(logo, 'PNG', 15, 15, 40, 30); // Ajusta las coordenadas y el tamaño del logo según sea necesario

        // Agregar el título principal
        doc.setFontSize(18);
        doc.text('Certificado de Finalización', 70, 30); // Ajusta las coordenadas del título principal según sea necesario

        // Agregar un mensaje de felicitaciones
        doc.setFontSize(12);
        doc.text('¡Felicidades por completar el curso!', 70, 45); // Ajusta las coordenadas del mensaje de felicitaciones según sea necesario

        // Agregar el nombre del curso
        doc.setFontSize(14);
        doc.text('Curso: ASME B30.2_2005', 70, 60); // Ajusta las coordenadas del nombre del curso según sea necesario

        // Descargar el documento como un archivo PDF
        doc.save('certificado.pdf');
    }

    // Agregar un controlador de eventos al botón de descarga del certificado
    $('#descargarCertificadoBtn').on('click', function () {
        generarCertificadoPDF();
    });
});



