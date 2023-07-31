document.addEventListener('DOMContentLoaded', function() {
  
  var calcularButton = document.getElementById('calcularButton');

  calcularButton.addEventListener('click', function() {
    var cuotasCalculadas = [];

    function calcularPromedioCuotas() {
      do {
        var valorTotal = parseFloat(prompt("Ingrese el valor del producto:"));
        var cantidadCuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"));

        if (isNaN(valorTotal) || isNaN(cantidadCuotas)) {
          alert("Ingrese valores numéricos válidos.");
          continue;
        }

        if (cantidadCuotas <= 0) {
          alert("Usted seleccionó 0 cuotas, por lo tanto el valor total es: " + valorTotal);
          continue;
        }

        var valorCuota = valorTotal / cantidadCuotas;

        var cuotaCalculada = {
          numeroCuota: cuotasCalculadas.length + 1,
          valor: valorCuota.toFixed(2),
          fechaVencimiento: obtenerFechaVencimiento(cuotasCalculadas.length + 1)
        };

        cuotasCalculadas.push(cuotaCalculada);

        alert("El valor de cada cuota es: " + cuotaCalculada.valor);

        var opcion = prompt("¿Desea realizar otro cálculo de cuotas? (si/no)");

        if (opcion.toLowerCase() !== "si") {
          break;
        }
      } while (true);

      mostrarCuotasCalculadas();
    }

    function mostrarCuotasCalculadas() {
      var resultado = "Los valores de cada cuota calculados son:\n";
      cuotasCalculadas.forEach(function(cuota) {
        resultado += "Cuota " + cuota.numeroCuota + ": " + cuota.valor + "\n";
      });
      alert(resultado);
    }

    function obtenerFechaVencimiento(numeroCuota) {
      var diasParaVencer = 30;
      var fechaVencimiento = new Date();
      fechaVencimiento.setDate(fechaVencimiento.getDate() + (numeroCuota * diasParaVencer));
      return fechaVencimiento.toDateString();
    }

    calcularPromedioCuotas();
  });
});