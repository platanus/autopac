/**
 *  Receives transferencia data from the extension and loads it
 * to the page's script.
 */

// default value of transferencia
// TODO eliminar datos predeterminados de mi mama :)
var tomorrow = new Date();
var today  = new Date();
tomorrow.setDate(today.getDate()+1);

const TRANSFERENCIA_DEFAULT = {
    origen: {},
    destinatario: {
        nombre: "asd",
        rut: "8.199.935-k",
        mail: "fitnual_test@fintual.com",
        cuenta: "111111111",
        banco: "banco de chile"
    },
    monto: 50000,
    programacion: {
        //mm-dd-yyyy
        fechaInicio: "".concat(tomorrow.getMonth()+1,"-",tomorrow.getDate() ,"-",tomorrow.getYear()+1900),
        fechaTermino: "".concat(tomorrow.getMonth()+1,"-",tomorrow.getDate() ,"-",tomorrow.getYear() +1901),
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
