var transferencia = null;
var inicio = null;
var fin = null;
/*
chrome.storage.local.get('transferencia', result => {        
        console.log(result.transferencia);
});
*/




function fill_my_form2() {
  fillFirstForm();
}

function fill_my_form(){
  chrome.runtime.sendMessage("ikamfbnjifbkelbmhbdkpfjkckfoelmc",{type: "getStorage"}, function(response) {
    transferencia = response;
    var my_date = new Date(transferencia.programacion.fechaInicio);
    inicio = {
        diainicio : my_date.getDate(),
        mesinicio : my_date.getMonth(),
        anoinicio : my_date.getYear()
      };
    my_date = new Date(transferencia.programacion.fechaTermino);
    fin = {
        diatermino : my_date.getDate(),
        mestermino : my_date.getMonth(),
        anotermino : my_date.getYear()
      };
    
    fillFirstForm();
  });
}

/*Script para completar banco Santander*/

function goToSantanderForm() {
  document.getElementById("2").contentWindow.clickMenu(0, 'OTP');
  document.getElementById("2").contentWindow.clickMenu(1, 'TPO');
  document.getElementById("2").contentWindow.clickMenu(2, 'OPO');
}

//Check every .5 seg if the payment page has been loaded
function waitStep1() {
  var my_frame = document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document;
  return new Promise(function(resolve, reject) {
    var checkFlag = () => {
      var monto = my_frame.getElementsByName("monto").item(0);
      monto ? resolve() : setTimeout(checkFlag, 500);
      console.log("waiting", monto);
    }
    checkFlag();
  });
}

function fillFirstForm() {

  //Get the iframe document
  var my_frame = document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document;
  //Can t use  jQuery inside the context in a new iFrame
  my_frame.getElementById("TipoAgenda_2").click();
  my_frame.getElementById("TipoPeriodica_3").click();

  my_frame.getElementsByName("diames").item(0).value = inicio.diainicio;
  //First payment
  my_frame.getElementsByName("diainicio").item(0).value = inicio.diainicio;
  //Months go from 0 to 10, the select need months as 2 digits string
  my_frame.getElementsByName("mesinicio").item(0).value = (inicio.mesinicio+1).toString().padStart(2, "0");
  //getMonth() returns (year - 1900)
  my_frame.getElementsByName("anoinicio").item(0).value = inicio.anoinicio + 1900;

   //Last payment
  //my_frame.getElementById("FechaTermino_1").click();
  my_frame.getElementById("FechaTermino_2").click();
  my_frame.getElementsByName("diatermino").item(0).value = fin.diatermino;
  my_frame.getElementsByName("mestermino").item(0).value = (fin.mestermino+1).toString().padStart(2, "0");
  my_frame.getElementsByName("anotermino").item(0).value = fin.anotermino+ 1900;

  //Sleep for .5 second, the user can check the form
  setTimeout(() => {
    my_frame.getElementsByName("Continuar").item(0).click();
  }, 500);

  waitStep1().then(() => {
    console.log("next form!");
    fillSecondForm();
  });
}

function fillSecondForm() {
  //Get the iframe document
  var my_frame = document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document;

  //TODO Check with real form
  my_frame.getElementsByName("numcuenta").item(0).click();


  
  //This value is only for Santander select
  //TODO remove this shit
  //my_frame.getElementsByName("banco").item(0).value = "1:Banco de Chile / Edwards-Citi:1";
  var selectElement =  my_frame.getElementsByName("banco").item(0);
  selectBank(selectElement, transferencia.destinatario.banco);


  my_frame.getElementsByName("tipo_cuenta").item(0).value = 1;
  if (transferencia.destinatario){
    if (transferencia.destinatario.rut)
        my_frame.getElementsByName("RutDestinatario").item(0).value = transferencia.destinatario.rut;
    if (transferencia.destinatario.numeroCuenta)
        my_frame.getElementsByName("cuenta_destino").item(0).value = transferencia.destinatario.numeroCuenta;
    if (transferencia.destinatario.mail)
        my_frame.getElementsByName("maildestino").item(0).value = transferencia.destinatario.mail;
  }
  my_frame.getElementsByName("monto").item(0).value = tranferencia.monto;
  my_frame.getElementsByName("motivomail").item(0).value = "FINTUAL";

  //Sleep for .5 second, the user can check the form
  setTimeout(() => {
    my_frame.getElementsByName("Aceptar").item(0).click();
  }, 500);

};


//a.value=arr.filter(x=> x.value.match("3"))[0].value

//Find the elemet that match our bank and change the select value
//var selectElement =  my_frame.getElementsByName("mesinicio").item(0)
//var arr = Array.prototype.slice.call( selectElement.options )
//Take the first match
//a.value = arr.find(x=> x.value.toLowerCase.match(my_bank.toLowerCase())).value

function selectBank(selectElement, my_bank){
  var arr = Array.prototype.slice.call( selectElement.options )
  // Change the value that matches
  selectElement.value = arr.find(x=> x.value.toLowerCase().match(my_bank.toLowerCase())).value
}
