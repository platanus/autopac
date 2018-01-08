// helper class that syncs the form with the data of the options page
class TransferenciaOptions {

    // initialize form data from another transferencia 
    constructor(obj){
        if (!obj) return;
        obj.monto && (this.monto = obj.monto);
        this.destinatario = {};
        if (obj.destinatario) {
            obj.destinatario.rut && (this.rutDestinatario = obj.destinatario.rut);
        }
        this.programacion = {};
        if (obj.programacion) {
            obj.programacion.frecuencia && (this.frecuencia = obj.programacion.frecuencia);
            obj.programacion.fechaInicio && (this.fechaInicio = obj.programacion.fechaInicio);
            obj.programacion.fechaTermino && (this.fechaTermino = obj.programacion.fechaTermino);
        }
    }
    // Setters and getter helper functions to get and set data to the form 
    get monto(){
        return document.getElementById("monto").value
    }
    set monto(val){
        document.getElementById("monto").value = val;
    }

    get frecuencia(){
        return document.getElementById("frecuencia").value
    }
    set frecuencia(val){
        document.getElementById("frecuencia").value = val;
    }
    get fechaInicio(){
        return document.getElementById("fechaInicio").value
    }
    set fechaInicio(val){
        document.getElementById("fechaInicio").value = val;
    }
    get fechaTermino(){
        return document.getElementById("fechaTermino").value
    }
    set fechaTermino(val){
        document.getElementById("fechaTermino").value = val;
    }
    get rutDestinatario(){
        return document.getElementById("rutDestinatario").value
    }
    set rutDestinatario(val){
        document.getElementById("rutDestinatario").value = val;
    }

    // returns raw data of the object (without setters and gettes) 
    toObject() {
        let obj = {};
        this.monto && (obj.monto = this.monto);
        obj.destinatario = {};
        this.rutDestinatario && (obj.destinatario.rut = this.rutDestinatario);
        obj.programacion = {};
        this.frecuencia && (obj.programacion.frecuencia = this.frecuencia);
        this.fechaInicio && (obj.programacion.fechaInicio = this.fechaInicio);
        this.fechaTermino && (obj.programacion.fechaTermino = this.fechaTermino);

        return obj;
    }
}


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
    });
}
// add logic to the option page buttons
document.getElementById('save').addEventListener('click', saveTransferenciaToLocalStorage);
document.getElementById('get').addEventListener('click', loadTransferenciaFromLocalStorage);
loadTransferenciaFromLocalStorage();





