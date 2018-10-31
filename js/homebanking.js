//Declaración de variables
var nombreUsuario = 'Ludmila';
var saldoCuenta = 5000;
var limiteExtraccion = 2000;
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;
var nombreDelServicio1 = 'Agua';
var nombreDelServicio2 = 'Teléfono';
var nombreDelServicio3 = 'Luz';
var nombreDelServicio4 = 'Internet';
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var codigoDeCuenta = 0987;
var n = /[0-9]/;
var adelantoDisponible = 5000/2;

iniciarSesion();

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
  cargarNombreEnPantalla();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
  actualizarAdelantoEnPantalla();
}

// Nueva Función: validar datos ingresados
var validarDatosIngresados = function(dato){
  if (dato === null || dato === '' || !(n.test(dato))){
    return false;
  } else {
    return true;
  }
}

function cambiarLimiteDeExtraccion() {
  var nuevoLimite = parseInt(prompt('Ingrese el nuevo limite de extraccion.'));
  if (!(validarDatosIngresados(nuevoLimite))) {
    alert('Ingreso incorrecto.');
  } else {
    limiteExtraccion = nuevoLimite;
    actualizarLimiteEnPantalla();
    alert('Nuevo limite de extraccion: $' + limiteExtraccion);
  }
}

function extraerDinero() {
  var montoAExtraer = parseInt(prompt('Ingrese monto a extraer'));
  if (!(validarDatosIngresados(montoAExtraer))) {
    alert('Ingreso incorrecto.');
  } else {
    if (montoAExtraer > limiteExtraccion) {
      alert('La cantidad de dinero que deseas extraer es mayor a tu límite de extracción.');
    } else if (montoAExtraer > saldoCuenta) {
      alert('No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.');
    } else if (montoAExtraer % 100 !== 0) {
      alert('Sólo puedes extraer billetes de $100.');
    } else {
      var saldoAnterior = saldoCuenta;
      restarDinero(montoAExtraer);
      actualizarSaldoEnPantalla();
      alert('Has extraido: $' + montoAExtraer + '\n Saldo anterior: $' + saldoAnterior + '\n Saldo actual: $' + saldoCuenta);
    }
  }
}

function depositarDinero() {
  var montoADepositar = parseInt(prompt('Ingrese monto a depositar'));
  if (!validarDatosIngresados(montoADepositar)) {
    alert('Ingreso incorrecto.');
  } else {
    var saldoAnterior = saldoCuenta;
    sumarDinero(montoADepositar);
    actualizarSaldoEnPantalla();
    alert('Has depositado: $' + montoADepositar + '\n Saldo anterior: $' + saldoAnterior + '\n Saldo actual: $' + saldoCuenta);
  }
}

function pagarServicio() {
  var servicio = parseInt(prompt('Ingrese el número que corresponda con el servicio que quieres pagar: \n 1 - Agua. \n 2 - Luz. \n 3 - Internet. \n 4 - Teléfono.'));
  switch (servicio) {
    case 1:
      if (saldoCuenta < agua) {
        alert('No hay suficiente saldo en tu cuenta para pagar este servicio.');
      } else {
        var saldoAnterior = saldoCuenta;
        restarDinero(agua);
        actualizarSaldoEnPantalla();
        mensaje(nombreDelServicio1, saldoAnterior, agua, saldoCuenta);
      }
      break;
    case 2:
      if (saldoCuenta < luz) {
        alert('No hay suficiente saldo en tu cuenta para pagar este servicio.');
      } else {
        var saldoAnterior = saldoCuenta;
        restarDinero(luz);
        actualizarSaldoEnPantalla();
        mensaje(nombreDelServicio2, saldoAnterior, luz, saldoCuenta);
      }
      break;
    case 3:
      if (saldoCuenta < internet) {
        alert('No hay suficiente saldo en tu cuenta para pagar este servicio.');
      } else {
        var saldoAnterior = saldoCuenta;
        restarDinero(internet);
        actualizarSaldoEnPantalla();
        mensaje(nombreDelServicio3, saldoAnterior, internet, saldoCuenta);
      }
      break;
    case 4:
      if (saldoCuenta < telefono) {
        alert('No hay suficiente saldo en tu cuenta para pagar este servicio.');
      } else {
        var saldoAnterior = saldoCuenta;
        restarDinero(telefono);
        actualizarSaldoEnPantalla();
        mensaje(nombreDelServicio4, saldoAnterior, telefono, saldoCuenta);
      }
      break;
    default:
      alert('No existe el servicio que se ha seleccionado.');
      break;
  }
}

function transferirDinero() {
  var montoATransferir = parseInt(prompt('Ingrese el monto que desea transferir.'));
  if (!validarDatosIngresados(montoATransferir)) {
    alert('Ingreso incorrecto.');
  } else {
    if (montoATransferir > saldoCuenta) {
      alert('No puede transferir esa cantidad de dinero.');
    } else {
      var cuenta = parseInt(prompt('Ingrese el número de cuenta al que desea transferir el dinero.'));
      if ((cuenta !== cuentaAmiga1) && (cuenta !== cuentaAmiga2)) {
        alert('Sólo puede transferir dinero a una cuentra amiga.');
      } else {
        restarDinero(montoATransferir);
        actualizarSaldoEnPantalla();
        alert('Se han transferido: $' + montoATransferir + '\n Cuenta destino: ' + cuenta);
      }
    }
  }
}

function iniciarSesion() {
  var codigo = parseInt(prompt('Ingrese su codigo de cuenta.'));
  if (codigo === codigoDeCuenta) {
    alert('Bienvenida ' + nombreUsuario + ' ya puedes realizar operaciones.');
  } else {
    alert('Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.');
    saldoCuenta = 0;
    actualizarSaldoEnPantalla();
  }
}

// Funciones donde restamos y sumamos dinero a la cuenta.
var restarDinero = function (dinero) {
  saldoCuenta -= dinero;
};

var sumarDinero = function (dinero) {
  saldoCuenta += dinero;
};

// Función mensaje de alerta cuando se abona un servicio
var mensaje = function (tipoDeServicio, saldoAnterior, montoDelServicio, saldoCuenta) {
  alert('Has pagado el servicio de ' + tipoDeServicio + '.\n Saldo anterior: $' + saldoAnterior + '\n Dinero descontado: $ ' + montoDelServicio + '\n Saldo actual: $' + saldoCuenta);
};

// Nueva funcion: cambio de codigo de cuenta.
function cambiarCodigoDeCuenta() {
  var codigoViejo = parseInt(prompt('Ingrese su código de cuenta actual.'));
  if (!(validarDatosIngresados(codigoViejo))) {
    alert('Ingreso incorrecto.');
  } else if (codigoViejo !== codigoDeCuenta) {
    alert('No es su codigo de cuenta actual.');
  } else {
    var codigoDeCuentaNuevo = parseInt(prompt('Ingrese su nuevo codigo de cuenta.'));
    if (!(validarDatosIngresados(codigoDeCuentaNuevo))) {
      alert('error');
    } else if (codigoDeCuentaNuevo === codigoDeCuenta) {
      alert('No se puede utilizar el mismo codigo.')
    } else {
      codigoDeCuenta = codigoDeCuentaNuevo;
      alert('Codigo de cuenta modificado exitosamente.')
    }
  }
}

// Nueva funcion: adelanto en efectivo
function adelantoEnEfectivo() {
  var adelantoARetirar = parseInt(prompt('Ingrese el monto a retirar'));
  if (!(validarDatosIngresados(adelantoARetirar))){
    alert('Ingreso incorrecto.');
  } else if (adelantoARetirar > adelantoDisponible){
    alert('La cantidad de dinero que deseas extraer es mayor a tu adelanto disponible.');
  } else if (adelantoARetirar % 100 !== 0) {
    alert('Solo puedes extraer billetes de $ 100.')
  } else {
    var adelantoAnterior = adelantoDisponible;
    adelantoDisponible = adelantoARetirar
    restarDinero(adelantoARetirar);
    actualizarAdelantoEnPantalla();
    alert('Has extraido: $' + adelantoARetirar + '\n Adelanto anterior: $' + adelantoAnterior + '\n Adelanto Disponible: $' + adelantoDisponible);
  }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
  document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

function actualizarAdelantoEnPantalla() {
  document.getElementById("adelanto-disponible").innerHTML = "Adelanto disponible: $" + adelantoDisponible;
}