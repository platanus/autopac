// inject transferencia_fun script to page script
var script_transferencia = document.createElement('script');
// TODO: add "<script>.js" to web_accessible_resources in manifest.json
script_transferencia.src = chrome.extension.getURL('src/inject/transferencia_fun.js');
script_transferencia.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(script_transferencia);

// transferencia messanger 
const TRANSFERENCIA_DEFAULT = {
    origen: {},
    destinatario: {},
    monto: 50000,
    rut_destinatario: "8.199.935-k",
    programacion: {
        fechaInicio: "12-02-2018",
        fechaTermino: "05-09-2019",
        frecuencia: "MENSUAL"
    }
};

var transferencia = TRANSFERENCIA_DEFAULT;
//Get transgerencia from storage
chrome.storage.local.get("transferencia", t => {
    if (t){
        transferencia = t.transferencia;
    }
    else { 
        transferencia = TRANSFERENCIA_DEFAULT;
    }
});

// TODO eliminar timeout y esperar a que la pagina pregunte por el valor de la transferencia
setTimeout( () => {
    window.postMessage({
        from: "autopac",
        message: JSON.stringify(transferencia)
      }, "*");
    }, 300);
