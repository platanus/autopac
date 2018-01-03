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

console.log('bancochile inject init')

//TODO get params from extension
var transferencia = {
    origen: {},
    destinatario: {},
    monto: 5000,
    rut_destinatario: "8.199.935-k",
    programacion: {
        inicio: "14-01-2018",
        fin: "11-01-2019",
        nombre: "MENSUAL"
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
    // frecuencia select
    freqDOM = [...document.getElementsByClassName("ui-select-container ui-select-bootstrap dropdown")][3];
    scopeFreq = angular.element(freqDOM).scope();
    freqItems = tef.frecuencias;
    // Derived used variables
    destinatarios = scopeDest.$select.items // list de destinatarios posibles para transferir
}

// auto fills the form
function fillForm(transferencia) {
    //Step 1 : Datos de la Transferencia
    fillDestinatario(transferencia.rut_destinatario);
    fillMonto(transferencia.monto);
    // Step 2: ¿Cuándo deseas realizar la Transferencia?
    //TODO only if it's a proggrammed transfer
    triggerProgramar();
    programarFrecuencia(transferencia.programacion);
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
        var programarBtn = [...document.getElementsByClassName("bch-custom-check radiobutton")]
                                .find( e => e.innerText.includes('Programar'));
        programarBtn.click();
}

function programarFrecuencia(programacion) {
    let freq = findFreqElement(programacion.nombre, tef.frecuencias)
    scopeForm.$apply( () => { 
        tef.frecuencia.selected = tef.frecuencias[2]; 
    });

    if (programacion.inicio) {
        document.getElementById("fechaInicioInput").value = programacion.inicio;
        scopeForm.$apply( () => { 
            tef.fechaInicio = new Date("3-5-2019"); 
        });
    }
    if (programacion.fin) {
        document.getElementById("fechaTerminoInput").value = programacion.fin;
        scopeForm.$apply( () => { 
            tef.fechaTermino = new Date("3-5-2020"); 
        });
    }
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
// document.addEventListener('load', () => {
// init();
// fillForm(transferencia)
// });
//Init script 
// (function main() {
//     console.log("init bancochile transferencia");
//     //init variables when page is loaded

//     // document.addEventListener('load', init);
//     console.log('finish main')
    
//     // var fillBtn = document.createElement('div');
//     // fillBtn.className = "autopac-fixed-div";
//     // fillBtn.innerHTML = `<button id='fillForm' 
//     //                         class='mdl-button 
//     //                         mdl-js-button 
//     //                         mdl-button--raised 
//     //                         mdl-js-ripple-effect 
//     //                         mdl-button--accent'>
//     //                     Fill form
//     //                 </button>`;

//     // fillBtn.addEventListener('click', autoFill)
//     // document.body.insertBefore(fillBtn, document.body.childNodes[0]);

// })();
