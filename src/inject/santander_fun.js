function fill_my_form() {
  fillFirstForm();
}

/*Script para completar banco Santander*/

function goToSantanderForm() {
  document.getElementById("2").contentWindow.clickMenu(0, 'OTP');
  document.getElementById("2").contentWindow.clickMenu(1, 'TPO');
  document.getElementById("2").contentWindow.clickMenu(2, 'OPO');

}

function waitStep1() {
  return new Promise(function(resolve, reject) {
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

  document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("diames").item(0).value = 1;
  //First payment
  document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("diainicio").item(0).value = 30;
  document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("mesinicio").item(0).value = "01";
  document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("anoinicio").item(0).value = 2018;

   //Last payment
  //document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementById("FechaTermino_1").click();
  document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementById("FechaTermino_2").click();
  document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("diatermino").item(0).value = 30;
  document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("mestermino").item(0).value = "01";
  document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("anotermino").item(0).value = 2019;

  //Sleep for 1 second, the user can check the form
  setTimeout(() => {
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("Continuar").item(0).click();
  }, 1000);

  waitStep1().then(() => {
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

  //Sleep for 1 second, the user can check the form
  setTimeout(() => {
    document.getElementById("2").contentWindow.document.getElementById("p4").contentWindow.document.getElementsByName("Aceptar").item(0).click();
  }, 1000);

}
