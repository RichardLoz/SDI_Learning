// Obtener el botón "Enviar respuestas"
const enviarRespuestasBtn = document.getElementById("enviarRespuestasBtn");

// Obtener todos los módulos de preguntas
const preguntas = document.querySelectorAll(".modal .modal-body");

// Función para verificar si se ha seleccionado una respuesta por módulo
function verificarRespuestasSeleccionadas() {
  // Variable para contar las preguntas con respuesta seleccionada
  let respuestasSeleccionadas = 0;

  // Recorrer los módulos de preguntas
  for (const preguntasModulo of preguntas) {
    // Obtener el nombre del módulo actual
    const moduloActual = preguntasModulo.dataset.modulo;

    // Recorrer las preguntas del módulo actual
    for (const pregunta of preguntasModulo.querySelectorAll(".form-check-input")) {
      if (pregunta.checked) {
        respuestasSeleccionadas++;
        break;
      }
    }
  }

  // Habilitar el botón si se ha seleccionado una respuesta por pregunta
  if (respuestasSeleccionadas === preguntas.length) {
    enviarRespuestasBtn.disabled = false;
  } else {
    enviarRespuestasBtn.disabled = true;
  }
}

// Agregar un evento "change" a cada opción de respuesta
for (const opcion of document.querySelectorAll(".form-check-input")) {
  opcion.addEventListener("change", verificarRespuestasSeleccionadas);
}

// Verificar si hay respuestas preseleccionadas al cargar el modal
verificarRespuestasSeleccionadas();





