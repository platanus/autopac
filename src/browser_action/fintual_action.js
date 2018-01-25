// Add listener for OK button
document.addEventListener('DOMContentLoaded', function () {
  
  var okButton = document.getElementById('ok-button');

  // Show the storage data
  chrome.storage.sync.get('transfer', result => {
    var transferencia = result.transfer;
    document.getElementById("text-holder").innerHTML += "<br>" + transferencia.destinatario.nombre + "<br> RUT: " + transferencia.destinatario.rut + "<br> Monto: " + transferencia.monto;
  });

  // onClick's logic below:
  okButton.addEventListener('click', function () {
    //Close popup
    window.close();
  });
});
