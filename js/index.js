document.addEventListener('DOMContentLoaded', function() {
  var calcularButton = document.getElementById('calcularButton');
  var recuperarButton = document.getElementById('recuperarButton');
  var resultadoDiv = document.getElementById('resultadoDiv');

  calcularButton.addEventListener('click', function(event) {
    event.preventDefault();

    var valorTotalInput = document.getElementById('valorTotal');
    var cantidadCuotasInput = document.getElementById('cantidadCuotas');

    var valorTotal = parseFloat(valorTotalInput.value);
    var cantidadCuotas = parseInt(cantidadCuotasInput.value);

    if (isNaN(valorTotal) || isNaN(cantidadCuotas)) {
      resultadoDiv.innerHTML = "Ingrese valores numéricos válidos.";
      return;
    }

    if (cantidadCuotas <= 0) {
      resultadoDiv.innerHTML = "Usted seleccionó 0 cuotas, por lo tanto el valor total es: " + valorTotal;
      return;
    }

    var cuotasCalculadas = calcularPromedioCuotas(valorTotal, cantidadCuotas);
    guardarDatosEnStorage(cuotasCalculadas);
    mostrarCuotasCalculadas(cuotasCalculadas);
  });

  recuperarButton.addEventListener('click', function(event) {
    event.preventDefault();
    cargarDatosDesdeStorage();
  });

  function calcularPromedioCuotas(valorTotal, cantidadCuotas) {
    var cuotasCalculadas = [];

    for (var i = 0; i < cantidadCuotas; i++) {
      var valorCuota = valorTotal / cantidadCuotas;
      var cuotaCalculada = {
        numeroCuota: i + 1,
        valor: valorCuota.toFixed(2),
      };
      cuotasCalculadas.push(cuotaCalculada);
    }

    return cuotasCalculadas;
  }

  function mostrarCuotasCalculadas(cuotasCalculadas) {
    var resultado = "Los valores de cada cuota son:<br>";
    cuotasCalculadas.forEach(function(cuota) {
      resultado += "Cuota " + cuota.numeroCuota + ": " + cuota.valor + "<br>";
    });
    resultadoDiv.innerHTML = resultado;
  }

  function guardarDatosEnStorage(datos) {
    localStorage.setItem('cuotasCalculadas', JSON.stringify(datos));
  }

  function cargarDatosDesdeStorage() {
    var storedData = localStorage.getItem('cuotasCalculadas');
    if (storedData) {
      var cuotasCalculadas = JSON.parse(storedData);
      mostrarCuotasCalculadas(cuotasCalculadas);
    }
  }
});
