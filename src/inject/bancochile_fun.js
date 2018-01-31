/**
 * Script para autollenar el formulario de transferencias programadas de la pagina de Banco de Chile
 */


function fill_my_form() {
    // Get data from storage

    chrome.runtime.sendMessage(autopac_extension_id, { type: "getStorage" }, function (response) {
        transferencia_autopac = response;

        checkLoadings().then(() => {
            initDataFromBancoChile();
            fillForm();
            chrome.runtime.sendMessage(autopac_extension_id, { type: 'autopac_page_ok' }, function (response) {}); 
        });
    });
}

function checkLoadings() {
    let scopeForm = angular.element(document.forms[0]).scope(); // Form's scope
    let tef = scopeForm.tef; // TransferenciasTercerosCtrl

    return new Promise(function (resolve, reject) {
        var checkFlag = () => {
            !tef.isLoadingSelector &&
                !tef.loadingTransferencia &&
                !tef.loadingCajaDesafio ? resolve() : setTimeout(checkFlag, 100);
        }
        checkFlag();
    });
}

var scopeForm;
var tef;
var tefForm;
var scopeDest;
var scopeFreq;
// Derived used variables
var destinatarios;
var freqItems;

var transferencia_autopac = null;

// initialize data from the webpage form
function initDataFromBancoChile() {
    //getTransferenciaFromContentScript();
    // Angularjs scope's objects used 
    scopeForm = angular.element(document.forms[0]).scope(); // Form's scope
    tef = scopeForm.tef; // TransferenciasTercerosCtrl
    tefForm = scopeForm.tefForm; // TransferenciasTercerosForm
    scopeDest = angular.element($('#destinatario')).scope();
    destinatarios = scopeDest.$select.items // lista de destinatarios posibles para transferir
    // frecuencia select
    freqDOM = [...document.getElementsByClassName("ui-select-container ui-select-bootstrap dropdown")][3];
    scopeFreq = angular.element(freqDOM).scope();
    freqItems = tef.frecuencias;
    // Derived used variables
}

// auto fills the form

function fillForm() {

    //Step 1 : Datos de la Transferencia
    fillDestinatario(transferencia_autopac.destinatario);
    fillMonto(transferencia_autopac.monto);
    // Step 2: ¿Cuándo deseas realizar la Transferencia?
    //TODO only if it's a proggrammed transfer
    waitStep1().then(() => {
        triggerProgramar();
        programarFrecuencia(transferencia_autopac.programacion);
    });
}

function fillDestinatario(destinatario) {
    let selectedDestinatario = findDestinatarioByRUT(destinatario.rut, destinatarios)
    if (selectedDestinatario) {
        scopeDest.$select.select(selectedDestinatario) // trigger select
    }
    else {
        // automaticcaly adds the destinatario if it's not in the list
        addNuevoDestinatario(destinatario);
    }
}

function fillMonto(monto) {
    // apply changes to model
    scopeForm.$apply(() => {
        scopeForm.tef.monto = String(monto);
    });
    // trigger change's events
    tef.montoValidatorOnChange()
}
// clicks the "programar" button to reveal the "programacion" options
function triggerProgramar() {
    // get the radial button and clicks it
    var programarBtn = [...document.getElementsByClassName("bch-custom-check radiobutton")]
        .find(e => e.innerText.includes('Programar'));
    programarBtn.click();
}

// fills the part 2 of the form (programacion)
function programarFrecuencia(programacion) {
    waitFrecuenciaTransferencias().then(() => {
        if (programacion.frecuencia) {
            fillProgramacionFrecuencia(programacion.frecuencia);
        }
        if (programacion.fechaInicio) {
            var inicio = new Date(programacion.fechaInicio)
            fillFechaInicio(inicio);
        }
        if (programacion.fechaTermino) {
            var fin = new Date(programacion.fechaTermino)
            fillFechaTermino(fin);
        }
    });
}

function fillProgramacionFrecuencia(frecuencia) {
    let freq = findFreqElement(frecuencia, tef.frecuencias)
    scopeForm.$apply(() => {
        tef.frecuencia.selected = freq;
    });
}

function fillFechaInicio(fechaInicio) {
    scopeForm.$apply(() => {
        tef.fechaInicio = new Date(fechaInicio);
        tef.fechaInicioProgramada = new Date(fechaInicio);
    });
}

function fillFechaTermino(fechaTermino) {
    scopeForm.$apply(() => {
        tef.fechaTermino = new Date(fechaTermino);
    });
}

// Encuentra al destinatario por su RUT en la lista de destinatarios
function findDestinatarioByRUT(rut, destinatarios) {
    var strip = s => { return String(s).replace(/\D/g, '') }; // comparar solo por digitos
    return destinatarios.find(d => { return strip(rut) == strip(d.rut) });
}
// Encuentra la frecuencia elegida dentro del select
function findFreqElement(nombre, freqList) {
    var strip = s => { return String(s).toLocaleLowerCase() };
    return freqList.find(f => { return strip(nombre) == strip(f.nombre) });
}

function waitStep1() {
    return new Promise(function (resolve, reject) {
        var checkFlag = () => {
            tef.step1 ? resolve() : setTimeout(checkFlag, 100);
        }
        checkFlag();
    });
}

function waitFrecuenciaTransferencias() {
    return new Promise(function (resolve, reject) {
        var checkFlag = () => {
            tef.frecuencias && tef.programada ? resolve() : setTimeout(checkFlag, 100);
        }
        checkFlag();
    });
}

function addNuevoDestinatario(destinatario) {
    // get the radial button and click it
    var nuevoDestinatarioBtn = [...document.getElementsByClassName("btn-animado success-btn text-info")]
        .find(e => e.innerText.includes('Nuevo Destinatario'));
    nuevoDestinatarioBtn.click();
    //fill rut
    scopeForm.$apply(() => {
        tef.rutMostrar = destinatario.rut;
    });
    // click continue
    var continuarBtn = [...document.getElementsByClassName("btn info")]
        .find(e => e.innerText.includes('Continuar'));
    continuarBtn.click();
    // fill nombre
    scopeForm.$apply(() => {
        tef.beneficiarioExistente.nombreRazonSocial = destinatario.nombre;
    });
    // select banco
    var bancoSelectDOM = [...document.getElementsByClassName("ui-select-container ui-select-bootstrap dropdown")]
        .find(x => x.innerHTML.includes('tef.bancos'));
    var bancoSelectScope = angular.element(bancoSelectDOM).scope();
    var selectedBanco = bancoSelectScope.$select.items.find(x => x.toLowerCase().includes(destinatario.banco.toLowerCase()));
    bancoSelectScope.$select.select(selectedBanco);
    // select tipo de cuenta 
    var tipoCuentaSelectDOM = [...document.getElementsByClassName("ui-select-container ui-select-bootstrap dropdown")]
        .find(x => x.innerHTML.includes('tef.tipoCtas'));
    var tipoCuentaSelectScope = angular.element(tipoCuentaSelectDOM).scope();
    var selectedTipoCuenta = tipoCuentaSelectScope.$select.items.find(x => x.toLowerCase().includes(destinatario.tipoCuenta.toLowerCase()));
    tipoCuentaSelectScope.$select.select(selectedTipoCuenta);
    // fill numero de cuenta
    scopeForm.$apply(() => {
        tef.cuentaSeleccionada = {};
        tef.cuentaSeleccionada.numeroCuenta = String(destinatario.numeroCuenta).replace(/\D/g, '');
    });
    // * fill mail TODO
    if (destinatario.mail) {
        scopeForm.$apply(() => {
            tef.cuentaSeleccionada.mail = destinatario.mail;
        });
    }
    document.getElementsByName("emailEdit")[0].value = destinatario.mail;
    //click continue to add
    var addNuevoDestinatarioBtn = [...document.getElementsByClassName("btn success pull-right mr-0 ml-10")]
        .find(e => e.innerText.includes('Continuar'));
    addNuevoDestinatarioBtn.click();

    // add this value to the form to let the user known the selected email
    document.getElementById("email-0").value = destinatario.mail;
}