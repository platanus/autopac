// default transferencia value
const TRANSFERENCIA_DEFAULT = {
    origen: {},
    destinatario: {
        nombre: "asd",
        rut: "8.199.935-k",
        mail: "fitnual_test@fintual.com",
        numeroCuenta: "111111111",
        banco: "banco de chile",
        tipoCuenta: "corriente"
    },
    monto: 50000,
    programacion: {
        fechaInicio: "2018-02-03",
        fechaTermino: "2019-05-06",
        frecuencia: "mensual"
    }
};


// object that contains the data of the tranferencia 
var transferencia = new TransferenciaOptions();

var storage = chrome.storage.local; //alias 
// saves the transferencia data to the local storage
function saveTransferenciaToLocalStorage(){
    storage.set({"transferencia": transferencia.toObject()});
}
// loads the data from the local storage
function loadTransferenciaFromLocalStorage(){
    storage.get("transferencia", (data) => {
        transferencia = new TransferenciaOptions(data.transferencia)
        // set to default value if empty
        if (Object.keys(transferencia.toObject()).length === 0) { 
            transferencia = new TransferenciaOptions(TRANSFERENCIA_DEFAULT);
            saveTransferenciaToLocalStorage();
        }
    });
}
// add logic to the option page buttons
document.getElementById('save').addEventListener('click', saveTransferenciaToLocalStorage);
document.getElementById('get').addEventListener('click', loadTransferenciaFromLocalStorage);
loadTransferenciaFromLocalStorage();


