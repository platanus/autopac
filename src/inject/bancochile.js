/*
Script para autollenar el formulario de transferencias programadas de la pagina de Banco de Chile
*/




/***************** 
// Initial transferencia interface
transferencia 
{
monto
usuario
usuarioD
cuentaOrigen
cuentaDestinatario

programacion:
    frecuencia:
    inicio
    fin
    indefinida
}
***************** */

//TODO get params from extension
var transferencia = {
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

var scopeForm;
var tef;
var tefForm;
var scopeDest;
var scopeFreq;
// Derived used variables
var destinatarios;
var freqItems;


//Initialize form data
function init() {
    // Angularjs scope's objects used 
    scopeForm = angular.element(document.forms[0]).scope(); // Form's scope
    tef = scopeForm.tef; // TransferenciasTercerosCtrl
    tefForm = scopeForm.tefForm; // TransferenciasTercerosForm
    scopeDest = angular.element($('#destinatario')).scope();
    destinatarios = scopeDest.$select.items // list de destinatarios posibles para transferir
    // frecuencia select
    freqDOM = [...document.getElementsByClassName("ui-select-container ui-select-bootstrap dropdown")][3];
    scopeFreq = angular.element(freqDOM).scope();
    freqItems = tef.frecuencias;
    // Derived used variables
}

// auto fills the form
// function fillForm(transferencia) {
function fillForm() {

    //Step 1 : Datos de la Transferencia
    fillDestinatario(transferencia.rut_destinatario);
    fillMonto(transferencia.monto);
    // Step 2: ¿Cuándo deseas realizar la Transferencia?
    //TODO only if it's a proggrammed transfer
    waitStep1().then( () => {
        triggerProgramar();
        programarFrecuencia(transferencia.programacion);
    });
}

function fillDestinatario(rutDestinatario) {
    let destinatario = findDestinatarioByRUT(rutDestinatario, destinatarios)
    if (destinatario) {
        scopeDest.$select.select(destinatario) // trigger select
    }
    else {
        //TODO agregar destinatario automaticamente si no esta en la lista
    }
}

function fillMonto(monto) {
    // apply changes to model 
    scopeForm.$apply( () => { 
        scopeForm.tef.monto = String(monto); 
    });
    // trigger change's events
    tef.montoValidatorOnChange()
}

function triggerProgramar() {
        // get "Programar" radial button
        // scopeForm.$apply( () => { 
        //     tef.programada = true; 
        // });
        var programarBtn = [...document.getElementsByClassName("bch-custom-check radiobutton")]
                                .find( e => e.innerText.includes('Programar'));
        programarBtn.click();
}

function programarFrecuencia(programacion) {
    waitFrecuenciaTransferencias().then( ()=>{
        if (programacion.frecuencia){
            fillProgramacionFrecuencia(programacion.frecuencia);
        }

        if (programacion.fechaInicio) {
            fillFechaInicio(programacion.fechaInicio);
        }
        if (programacion.fechaTermino) {
            fillFechaTermino(programacion.fechaTermino);
        }
    });
}

function fillProgramacionFrecuencia(frecuencia){
    let freq = findFreqElement(frecuencia, tef.frecuencias)
    scopeForm.$apply( () => { 
        tef.frecuencia.selected = freq; 
    });
}

function fillFechaInicio(fechaInicio){
    scopeForm.$apply( () => { 
        tef.fechaInicio = new Date(fechaInicio); 
        tef.fechaInicioProgramada = new Date(fechaInicio); 
    });
}

function fillFechaTermino(fechaTermino){
    scopeForm.$apply( () => { 
        tef.fechaTermino = new Date(fechaTermino); 
    });
}

// Encuentra al destinatario por su RUT en la lista de destinatarios
function findDestinatarioByRUT(rut, destinatarios) {
    var strip = s => { return String(s).replace(/\D/g, '')}; // comparar solo por digitos
    return destinatarios.find( d => { return strip(rut) == strip(d.rut) } );
}

function findFreqElement(nombre, freqList) {
    var strip = s => { return String(s).toLocaleLowerCase()}; // comparar solo por digitos
    return freqList.find( f => { return strip(nombre) == strip(f.nombre) } );
}


function waitStep1() {
    return new Promise( function(resolve, reject) {
        var checkFlag = () => {
            tef.step1 ? resolve() : setTimeout(checkFlag, 100);
        }
        checkFlag();
    });
}

function waitFrecuenciaTransferencias() {
    return new Promise( function(resolve, reject) {
        var checkFlag = () => {
            tef.frecuencias && tef.programada ? resolve() : setTimeout(checkFlag, 100);
        }
        checkFlag();
    });
}

window.addEventListener("load", function(event) {
    setTimeout( () => {
        console.log("init")
        var fillBtn = document.getElementById('fillForm');
        fillBtn.addEventListener('click', fillForm);
        init();
        // fillForm(transferencia);
    }, 2000); //TODO get rid of timer and listen to load status
});

