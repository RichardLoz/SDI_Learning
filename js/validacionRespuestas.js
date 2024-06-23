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

function validarRespuestas3() {
    var todasRespondidas = true;

    // Iterar sobre cada módulo
    $('[data-modulo3]').each(function () {
        var modulo = $(this);

        // Verificar si al menos una opción está seleccionada en el módulo
        if (modulo.find('input[type="radio"]:checked').length === 0) {
            todasRespondidas = false;
            return false; // Salir del bucle si no se ha respondido en este módulo
        }
    });

    // Habilitar o deshabilitar el botón "Enviar respuestas" según la validación
    $('#enviarRespuestasBtnModulo3').prop('disabled', !todasRespondidas);
}

// Asociar la función de validación a los eventos de cambio en los radio buttons del Módulo 3
$('input[type="radio"]').on('change', validarRespuestas3);


function validarRespuestas4() {
    var todasRespondidas = true;

    // Iterar sobre cada módulo
    $('[data-modulo4]').each(function () {
        var modulo = $(this);

        // Verificar si al menos una opción está seleccionada en el módulo
        if (modulo.find('input[type="radio"]:checked').length === 0) {
            todasRespondidas = false;
            return false; // Salir del bucle si no se ha respondido en este módulo
        }
    });

    // Habilitar o deshabilitar el botón "Enviar respuestas" según la validación
    $('#enviarRespuestasBtnModulo4').prop('disabled', !todasRespondidas);
}

// Asociar la función de validación a los eventos de cambio en los radio buttons del Módulo 3
$('input[type="radio"]').on('change', validarRespuestas4);



function validarRespuestas5() {
    var todasRespondidas = true;

    // Iterar sobre cada módulo
    $('[data-modulo5]').each(function () {
        var modulo = $(this);

        // Verificar si al menos una opción está seleccionada en el módulo
        if (modulo.find('input[type="radio"]:checked').length === 0) {
            todasRespondidas = false;
            return false; // Salir del bucle si no se ha respondido en este módulo
        }
    });

    // Habilitar o deshabilitar el botón "Enviar respuestas" según la validación
    $('#enviarRespuestasBtnModulo5').prop('disabled', !todasRespondidas);
}

// Asociar la función de validación a los eventos de cambio en los radio buttons del Módulo 3
$('input[type="radio"]').on('change', validarRespuestas5);


$(document).ready(function() {
    var todosModulosAprobados = false;

    // Agrega un evento de clic al botón "Enviar respuestas" del Módulo 2
    $("#enviarRespuestasBtn").on("click", function() {
        // Llama a la función para enviar las respuestas del Módulo 2
        enviarRespuestasModulo(2);
    });

    // Agrega un evento de clic al botón "Enviar respuestas" del Módulo 3
    $("#enviarRespuestasBtnModulo3").on("click", function() {
        // Llama a la función para enviar las respuestas del Módulo 3
        enviarRespuestasModulo(3);
    });

    // Agrega un evento de clic al botón "Enviar respuestas" del Módulo 4
    $("#enviarRespuestasBtnModulo4").on("click", function() {
        // Llama a la función para enviar las respuestas del Módulo 4
        enviarRespuestasModulo(4);
    });

    // Agrega un evento de clic al botón "Enviar respuestas" del Módulo 5
    $("#enviarRespuestasBtnModulo5").on("click", function() {
        // Llama a la función para enviar las respuestas del Módulo 5
        enviarRespuestasModulo(5);
    });

    // Función para enviar respuestas de cada módulo
    function enviarRespuestasModulo(numeroModulo) {
        // Array para almacenar los id de las respuestas seleccionadas
        let respuestasSeleccionadas = [];

        // Recorre todos los elementos input de tipo radio del módulo correspondiente
        $(`#testModal${numeroModulo} input[type=radio]:checked`).each(function() {
            // Obtiene el id y lo agrega al array
            respuestasSeleccionadas.push($(this).attr('id'));
        });

        // Realiza la llamada AJAX para validar las respuestas
        $.ajax({
            url: "https://sdilearning-api.solucionesdeizajes.com.ar/answer/check",
            type: "POST",
            headers: {
                "X-API-key": "aguanteVokita123_",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(respuestasSeleccionadas),
            success: function(response) {
                console.log("Respuesta del servidor:", response);
                if (response.Respuesta.aprobo) {
                    Swal.fire({
                        title: '¡Felicidades!',
                        text: 'Has aprobado el test',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            popup: 'aceptar_m2'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $(`#testModal${numeroModulo}`).modal('hide');
                            $(`#module${numeroModulo}ApprovalIcon`).show();
                            verificarTodosModulosAprobados();
                          }
                    })
                } else {
                    Swal.fire({
                        title: 'Lo sentimos',
                        text: 'No has aprobado el test',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          cambiarOrdenPreguntas(numeroModulo);
                          $('input[type=radio]:checked').prop('checked', false); // Limpiar las respuestas seleccionadas
                          $(`#testModal${numeroModulo}`).modal('hide');
                        }
                      });
                }
            },
            error: function(error) {
                console.error("Error en la llamada AJAX:", error);
            }
        });
    }

  // Función para cambiar el orden de las preguntas en el modal
function cambiarOrdenPreguntas(numeroModulo) {
    // Encuentra todos los elementos "modal-body" del módulo correspondiente
    let preguntas = $(`#testModal${numeroModulo} .modal-body`);
    
    // Recorre cada pregunta
    preguntas.each(function(index, pregunta) {
        // Encuentra el elemento <p> dentro de la pregunta
        let parrafo = $(pregunta).find('p');
        
        // Obtiene el texto actual del párrafo
        let textoActual = parrafo.text();
        
        // Elimina cualquier número de pregunta existente
        let textoSinNumero = textoActual.replace(/^Pregunta \d+: /, '');
        
        // Establece el nuevo texto con el número de pregunta
        parrafo.text(`Pregunta ${index + 1}: ${textoSinNumero}`);
        
        // Cambia el orden de la pregunta en el DOM
        $(pregunta).prependTo(pregunta.parentNode);
    });
}


    // Función para verificar si todos los módulos están aprobados
    function verificarTodosModulosAprobados() {
        todosModulosAprobados = true;
        $('[id^="module"][id$="ApprovalIcon"]').each(function() {
            // Si encuentra algún icono de aprobación oculto, entonces no todos los módulos están aprobados
            if ($(this).css('display') === 'none') {
                todosModulosAprobados = false;
                return false; // Salir del bucle
            }
        });

        // Habilitar o deshabilitar el botón "Descargar Certificado" según el estado de aprobación de todos los módulos
        //$('#descargarCertificadoBtn').prop('disabled', !todosModulosAprobados);
    }

    // Llamar a la función para verificar el estado de aprobación de todos los módulos al cargar la página
    verificarTodosModulosAprobados();

});




$(document).ready(function () {
    // Función para generar el certificado PDF
    function generarCertificadoPDF() {
        // Crear un nuevo documento PDF
        var doc = new jsPDF();

        //Borde color negro
        doc.setDrawColor(128, 128, 128); // Color negro
        doc.setLineWidth(2); // Grosor de línea más delgado para el borde interno
        doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');

        // Borde interno gris con transparencia
        doc.setDrawColor(128, 128, 128); // Color gris
        doc.setLineWidth(1); // Grosor de línea más delgado
        doc.setFillColor(128, 128, 128, 0.5); // Color gris con 50% de transparencia
        doc.rect(7, 7, doc.internal.pageSize.width - 14, doc.internal.pageSize.height - 15, 'S');

        // Agregar un logo al certificado
        var logo = new Image();
        logo.src = '/img/core-img/logo_pdf.jpeg'; // Cambia 'ruta_del_logo.png' por la URL o la ruta de tu logo
        doc.addImage(logo, 'JPEG', 85, 10, 30, 45); // Ajusta las coordenadas y el tamaño del logo según sea necesario (Derecha,arriba,ancho,alto)

        // Agregar el título principal
        doc.setFont("helvetica","normal")
        doc.setFontSize(38);
        doc.text('CERTIFICADO', 60, 75, {align: 'center'}); // Ajusta las coordenadas del título principal según sea necesario

        doc.setFontSize(12);
        doc.text('Se otorga el presente', 80, 85, { align: 'center'}); // Ajusta las coordenadas del mensaje de felicitaciones según sea necesario

        // Agregar un mensaje de para quien:
        doc.setFontSize(14);
        doc.text('CERTIFICADO DE APROBACION AL Sr.: ', 60, 92, { align: 'center'}); // Ajusta las coordenadas del mensaje dfelicitaciones según sea necesario

        // Nombre del alumno
        doc.setFontSize(12);
        doc.text('D.N.I.:', 95,105, {align: 'center'});

        // Mensaje de participo:
        doc.setFontSize(12);
        doc.text('Por la participaciòn y Aprobaciòn del Curso: ', 60,  111, {align: 'center'});

        // Agregar el nombre del curso
        doc.setFontSize(12);
        doc.text('Norma ASME B30.2.', 80, 116, { align: 'center'}); // Ajusta las coordenadas del nombre del curso según sea necesario

        // Mensaje de contenido del curso:
        doc.setFontSize(12);
        doc.text('Temas incluidos: ', 85,  121, {align: 'center'});

        //Listas de modulos
        doc.setFontSize(12);
        doc.text('Módulo 1: Definiciones y Referencias.', 60,  126, {align: 'center'});
        doc.text('Módulo 2: Construcción e Instalación (PRIMERA PARTE).', 50,  131, {align: 'center'});
        doc.text('Módulo 3: Construcción e Instalación (SEGUNDA PARTE).', 50,  136, {align: 'center'});
        doc.text('Módulo 4: Inspección, Pruebas y mantenimiento.', 55,  141, {align: 'center'});
        doc.text('Módulo 5: Operación.', 75,  146, {align: 'center'});
        
        // Mensaje de duracion del curso:
        doc.setFontSize(10);
        doc.text('Curso dictado con una duración de 4 horas ', 70,  155, {align: 'center'});

        //Firma digital
        var firma = new Image();
        firma.src = '/img/core-img/firma_certi.png'; // Cambia 'ruta_del_logo.png' por la URL o la ruta de tu logo
        doc.addImage(firma, 'PNG', 30, 170, 30, 25); // Ajusta las coordenadas y el tamaño del logo según sea necesario


          // Agregar la firma digital del profesional
        doc.setFontSize(12);
        doc.text('Responsable que certifica', 30,  200, {align: 'center'});

        // Agregar el footer con el nombre de la empresa que certifica
        doc.setFontSize(10);
        doc.text('Certificado emitido por: SDI - Soluciones de Izajes', 65, 220, { align: 'center' });

        // Descargar el documento como un archivo PDF
        doc.save('certificado_aprobacion.pdf');
        }

    // Agregar un controlador de eventos al botón de descarga del certificado
    $('#descargarCertificadoBtn').on('click', function () {
        generarCertificadoPDF();
    });
});


