/*
Script para autollenar el formulario de transferencias programadas de la pagina de Banco de Chile
*/

// Script parameters 
//TODO get params from extension
var monto = 50000;
var rutDestinatario = "8.199.935-k";

// Angularjs scope's objects used 
var scopeForm = angular.element(document.forms[0]).scope(); // Form's scope
var tef = scopeForm.tef; // TransferenciasTercerosCtrl
var tefForm = scopeForm.tefForm; // TransferenciasTercerosForm
var scopeDest = angular.element($('destinatario')).scope();

// Derived used variables
var destinatarios = scopeDest.$select.items // list de destinatarios posibles para transferir


// auto fills the form
function autofillForm() {
    fillStep1();
    fillStep2();
}

// Datos de la Transferencia
function fillStep1() {
    fillDestinatario();
    fillMonto();
}
// ¿Cuándo deseas realizar la Transferencia?
function fillStep2() {
    //TODO only if it's a proggrammed transfer
    triggerProgramar();

}

function fillDestinatario() {
    let destinatario = findDestinatarioByRUT(rutDestinatario, destinatarios)
    if (destinatario) {
        scopeDest.$select.select(destinatario) // trigger select
    }
    else {
        //TODO agregar destinatario automaticamente si no esta en la lista
    }
}

function fillMonto() {
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
                                .find( e => e.innerText.includes('Programar'))
        programarBtn.click()
}

// Encuentra al destinatario por su RUT en la lista de destinatarios
function findDestinatarioByRUT(rut, destinatarios) {
    var strip = s => { return String(s).replace(/\D/g, '')} // comparar solo por digitos
    return destinatarios.find( d => { return strip(rut) == strip(d.rut) } )
}

//MAIN
autofillForm();
