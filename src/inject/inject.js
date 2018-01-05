var s = document.createElement('script');
// TODO: add "<script>.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('src/inject/aux_fun.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);


var transferenciaDefault = {
    origen: {},
    destinatario: {},
    monto: 5000,
    rut_destinatario: "8.199.935-k",
    programacion: {
        fechaInicio: "12-02-2018",
        fechaTermino: "05-09-2019",
        frecuencia: "MENSUAL"
    }
}

var transferencia;
//Get transgerencia from storage
chrome.storage.local.get("transferencia", t => {
    if (t){
        transferencia = t.transferencia;
    }
    else { 
        transferencia = transferenciaDefault;
    }
});

setTimeout( () => {
window.postMessage({
    from: "autopac",
    message: JSON.stringify(transferencia)
  }, "*");
}, 100);
