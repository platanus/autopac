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
    origen = {},
    destinatario,
    monto = 5000,
    rut_destinatario = "8.199.935-k"
}

//Initialize form data
function init() {
    // Angularjs scope's objects used 
    var scopeForm = angular.element(document.forms[0]).scope(); // Form's scope
    var tef = scopeForm.tef; // TransferenciasTercerosCtrl
    var tefForm = scopeForm.tefForm; // TransferenciasTercerosForm
    var scopeDest = angular.element($('#destinatario')).scope();

    // Derived used variables
    var destinatarios = scopeDest.$select.items // list de destinatarios posibles para transferir
}


// auto fills the form
function autofillForm(transferencia) {

    //Step 1 : Datos de la Transferencia
    fillDestinatario(transferencia.rut_destinatario, destinatarios);
    fillMonto(transferencia.monto);
    // Step 2: ¿Cuándo deseas realizar la Transferencia?
    //TODO only if it's a proggrammed transfer
    triggerProgramar()
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
                                .find( e => e.innerText.includes('Programar'))
        programarBtn.click()
}

// Encuentra al destinatario por su RUT en la lista de destinatarios
function findDestinatarioByRUT(rut, destinatarios) {
    var strip = s => { return String(s).replace(/\D/g, '')}; // comparar solo por digitos
    return destinatarios.find( d => { return strip(rut) == strip(d.rut) } );
}


//Init script 
(function main(){
    console.log("init")
    //init variables when page is loaded
    // document.addEventListener('DOMContentLoaded', init);
    document.addEventListener('load', init);

})();
