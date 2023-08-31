document.addEventListener('DOMContentLoaded', function() {
  const calcularButton = document.getElementById('calcularButton');
  const recuperarButton = document.getElementById('recuperarButton');
  const resultadoDiv = document.getElementById('resultadoDiv');

  calcularButton.addEventListener('click', function(event) {
    event.preventDefault();

    const valorTotalInput = document.getElementById('valorTotal');
    const cantidadCuotasInput = document.getElementById('cantidadCuotas');

    const valorTotal = parseFloat(valorTotalInput.value);
    const cantidadCuotas = parseInt(cantidadCuotasInput.value);

    if (isNaN(valorTotal) || isNaN(cantidadCuotas)) {
      resultadoDiv.innerHTML = "Ingrese valores numéricos válidos.";
      return;
    }

    if (cantidadCuotas <= 0) {
      resultadoDiv.innerHTML = "Usted seleccionó 0 cuotas, por lo tanto el valor total es: " + valorTotal;
      return;
    }

    const cuotasCalculadas = calcularPromedioCuotas(valorTotal, cantidadCuotas);
    guardarDatosEnStorage(cuotasCalculadas);
    mostrarCuotasCalculadas(cuotasCalculadas);
  });

  recuperarButton.addEventListener('click', function(event) {
    event.preventDefault();
    cargarDatosDesdeStorage();
  });

  function calcularPromedioCuotas(valorTotal, cantidadCuotas) {
    const cuotasCalculadas = [];

    for (let i = 0; i < cantidadCuotas; i++) {
      const valorCuota = valorTotal / cantidadCuotas;
      const cuotaCalculada = {
        numeroCuota: i + 1,
        valor: valorCuota.toFixed(2),
      };
      cuotasCalculadas.push(cuotaCalculada);
    }

    return cuotasCalculadas;
  }

  function mostrarCuotasCalculadas(cuotasCalculadas) {
    let resultado = "Los valores de cada cuota son:<br>";
    cuotasCalculadas.forEach(function(cuota) {
      resultado += "Cuota " + cuota.numeroCuota + ": " + cuota.valor + "<br>";
    });
    resultadoDiv.innerHTML = resultado;
  }

function mostrarCuotasCalculadas(cuotasCalculadas) {
  var resultado = "Los valores de cada cuota son:<br>";
  cuotasCalculadas.forEach(function(cuota) {
    resultado += "Cuota " + cuota.numeroCuota + ": " + cuota.valor + "<br>";
  });
  resultadoDiv.innerHTML = resultado;

  var numerosCuotas = cuotasCalculadas.map(function(cuota) {
    return cuota.numeroCuota;
  });
  var valoresCuotas = cuotasCalculadas.map(function(cuota) {
    return parseFloat(cuota.valor);
  });

  var ctx = document.getElementById('graficoCuotas').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: numerosCuotas,
      datasets: [{
        label: 'Valores de Cuotas',
        data: valoresCuotas,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

  function guardarDatosEnStorage(datos) {
    localStorage.setItem('cuotasCalculadas', JSON.stringify(datos));
  }

  function cargarDatosDesdeStorage() {
    const storedData = localStorage.getItem('cuotasCalculadas');
    if (storedData) {
      const cuotasCalculadas = JSON.parse(storedData);
      mostrarCuotasCalculadas(cuotasCalculadas);
    }
  }
});
