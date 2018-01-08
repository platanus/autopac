class Transferencia {

    constructor(obj){
        obj && Object.entries(obj).forEach( attr => {
            this[attr[0]] = attr[1];
        });
    }
    
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

    toObject() {
        let obj = {};
        this.monto && (obj.monto = this.monto);
        this.rutDestinatario && (obj.rutDestinatario = this.rutDestinatario);
        this.frecuencia && (obj.frecuencia = this.frecuencia);
        this.fechaInicio && (obj.fechaInicio = this.fechaInicio);
        this.fechaTermino && (obj.fechaTermino = this.fechaTermino);

        return obj;
    }
}

var transferencia = new Transferencia();
var t = transferencia;

function saveTransferencia(){
    chrome.storage.local.set({"transferencia": transferencia.toObject()});
}

function getTransferencia(){
    chrome.storage.local.get("transferencia", function(x) {
        transferencia = new Transferencia(x.transferencia)
    });
}


var storage = chrome.storage.local;
document.getElementById('save').addEventListener('click', saveTransferencia);
document.getElementById('get').addEventListener('click', getTransferencia);
getTransferencia();


