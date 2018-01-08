/**
 *  Receives transferencia data from the extension and loads it
 * to the page's script.
 */

// default value of transferencia
// TODO eliminar datos predeterminados de mi mama :)
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

// transferencia es variable global
window.transferencia = TRANSFERENCIA_DEFAULT;

// request transferencia from the extension's storage
function getTransferenciaFromContentScript() {
    let event = document.createEvent('Event');
    event.initEvent('getTransferencia');
    document.dispatchEvent(event);
}

// listens for the message that contains the transferencia data
window.addEventListener("message", function(event) {
    // only listen to autopac messages with data
    if (event.data.from != "autopac" || !event.data.transferencia)
        return;
    // assign the global variable transferencia
    window.transferencia = event.data.transferencia;
});

// TODO sendTransferenciaToContentScript() to send data to the extension 
