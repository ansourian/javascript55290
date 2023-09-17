document.addEventListener('DOMContentLoaded', async function() {
  const calcularButton = document.getElementById('calcularButton');
  const recuperarButton = document.getElementById('recuperarButton');
  const resultadoDiv = document.getElementById('resultadoDiv');
  const graficoCanvas = document.getElementById('graficoCuotas');
  const ctx = graficoCanvas.getContext('2d');

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Valores de Cuotas',
        data: [],
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

  calcularButton.addEventListener('click', async function(event) {
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
    await guardarDatosEnStorage(cuotasCalculadas);
    mostrarCuotasCalculadas(cuotasCalculadas);
  });

  recuperarButton.addEventListener('click', async function(event) {
    event.preventDefault();
    const cuotasCalculadas = await cargarDatosDesdeStorage();
    if (cuotasCalculadas) {
      mostrarCuotasCalculadas(cuotasCalculadas);
    }
  });

  async function guardarDatosEnStorage(datos) {
    await localStorage.setItem('cuotasCalculadas', JSON.stringify(datos));
  }

  async function cargarDatosDesdeStorage() {
    const storedData = await localStorage.getItem('cuotasCalculadas');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  }

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

    const numerosCuotas = cuotasCalculadas.map(function(cuota) {
      return cuota.numeroCuota;
    });
    const valoresCuotas = cuotasCalculadas.map(function(cuota) {
      return parseFloat(cuota.valor);
    });

    myChart.data.labels = numerosCuotas;
    myChart.data.datasets[0].data = valoresCuotas;
    myChart.update();
  }
});

let dolarBlueData;

function obtenerDatosDolarBlue() {
  fetch("https://dolarapi.com/v1/dolares/blue")
    .then(response => response.json())
    .then(data => {
      dolarBlueData = data;
    })
    .catch(error => {
      console.error("Error al cargar los datos del dólar blue:", error);
    });
}

obtenerDatosDolarBlue();

function mostrarValorDolarBlue() {
  if (dolarBlueData) {
    const valorDolarBlue = dolarBlueData.compra;
    const resultadoDiv = document.getElementById('resultadoDiv');
    resultadoDiv.innerHTML = `Valor del dólar blue: $${valorDolarBlue}`;
  } else {
    console.log("Los datos del dólar blue aún no se han cargado.");
  }
}

const mostrarValorDolarBlueButton = document.getElementById('mostrarValorDolarBlueButton');
mostrarValorDolarBlueButton.addEventListener('click', () => {
  mostrarValorDolarBlue();
});
