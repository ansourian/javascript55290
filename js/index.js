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
  
      alert("El valor de cada cuota es: " + valorCuota.toFixed(2));
  
      var opcion = prompt("¿Desea realizar otro cálculo de cuotas? (si/no)");
  
      if (opcion.toLowerCase() !== "si") {
        break;
      }
    } while (true);
  }
  
  calcularPromedioCuotas();
  