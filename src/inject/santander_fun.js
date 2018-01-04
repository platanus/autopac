function fill_my_form(){
    fillFirstForm();
}


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

/*
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
        // var fillBtn = document.getElementById('fillForm');
        // fillBtn.addEventListener('click', fillForm);
        init();
        // fillForm(transferencia);
    }, 4000); //TODO get rid of timer and listen to load status
});
*/

/*Script para completar banco Santander*/

function goToSantanderForm(){
    document.getElementById("2").contentWindow.clickMenu(0,'OTP');
    document.getElementById("2").contentWindow.clickMenu(1,'TPO');
    document.getElementById("2").contentWindow.clickMenu(2,'OPO');

}

function waitStep1() {
    return new Promise( function(resolve, reject) {
        var checkFlag = () => {
            var monto = document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("monto").item(0);
            monto ? resolve() : setTimeout(checkFlag, 500);
            console.log("waiting", monto);
        }
        checkFlag();
    });
}

function fillFirstForm() {
    //Can t use  jQuery inside the context in a new iFrame
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementById("TipoAgenda_2").click();
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementById("TipoPeriodica_3").click();

    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("diames").item(0).value = 1 ;
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("diainicio").item(0).value = 30 ;
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("mesinicio").item(0).value =  '01' ;
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("anoinicio").item(0).value = 2018 ;

    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementById("FechaTermino_1").click();

    //Sleep for 1 second, the user can check the form
    setTimeout( () => {
        document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("Continuar").item(0).click() ;
    }, 1000);

    waitStep1().then( () => {
        console.log("next form!");
        fillSecondForm(); 
    });
}

function fillSecondForm() {
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("numcuenta").item(0).click();
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("banco").item(0).value = "1:Banco de Chile / Edwards-Citi:1";
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("tipo_cuenta").item(0).value = 1
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("RutDestinatario").item(0).value = 111111111
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("cuenta_destino").item(0).value = 1111
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("maildestino").item(0).value = "1@1.com"
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("motivomail").item(0).value = "FINTUAL"
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("monto").item(0).value = 1000

    //document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("Aceptar").item(0).click() ;

}
