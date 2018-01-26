document.getElementById('send').addEventListener('click', sendToStorage);
document.getElementById('install').addEventListener('click', installAutopac);

function sendToStorage(){
  console.log("sup");
  var my_data = getData();
  chrome.runtime.sendMessage(window.autopac_extension_id ,{type: "sendData", data:my_data}, function(response) {});
}

function installAutopac(){
 chrome.webstore.install("https://chrome.google.com/webstore/detail/gnhmemcbpgpoldkclcllbakonfeokdjd",successCallback, failureCallback)
}

function successCallback(){}
function failureCallback(){}

function getData() {
  var obj = {};
  monto && (obj.monto = monto.value);

  obj.destinatario = {};
  rutDestinatario && (obj.destinatario.rut = rutDestinatario.value);
  bancoDestinatario && (obj.destinatario.banco = bancoDestinatario.value);
  nombreDestinatario && (obj.destinatario.nombre = nombreDestinatario.value);
  numeroCuentaDestinatario && (obj.destinatario.numeroCuenta = 	numeroCuentaDestinatario.value);
  tipoCuentaDestinatario && (obj.destinatario.tipoCuenta = tipoCuentaDestinatario.value);
  mailDestinatario && (obj.destinatario.mail = mailDestinatario.value);
  
  obj.programacion = {};
  frecuencia && (obj.programacion.frecuencia = frecuencia.value);
  fechaInicio && (obj.programacion.fechaInicio = fechaInicio.value);
  fechaTermino && (obj.programacion.fechaTermino = fechaTermino.value);
  // delete property if empty
  if (Object.keys(obj.destinatario).length === 0) delete obj.destinatario; 
  if (Object.keys(obj.programacion).length === 0) delete obj.programacion;
        

  return obj;
}
