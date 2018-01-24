//Get the url in the current tab and extract the domain name
function getPage(callback) {
  var tabURL;
  var tabTitle;
  var name;
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    tabURL = tabs[0].url;
    tabTitle = tabs[0].title;
    $.getJSON('active_pages.json', json => {
      var array_exp = new Array();
      for (var name in json) {
        array_exp.push(json[name].domain);
      }
      var regex = new RegExp(array_exp.join("|"));

      // Identify URL matches(banks domain)
      name = tabURL.match(regex)[0];
      name = name.split(/.cl/)[0];
      //console.log(name);
      if (callback) {
        callback(name)
      }
    });
  });
}

//map with the function names
var map = {
  santander: "santanderForm",
  bancochile: "genericForm"
};

//Open form in the same tab
function openForm(json, bank_key) {
  // Open in the same tab the form to fill
  //console.log(json[bank_key].name);

  //Get the function for the bank
  var my_bank_fun = map[bank_key];
  //Get the form url for my bank (if exist)
  var form_url = json[bank_key].form_url;
  //Call the function
  window[my_bank_fun](form_url);

}

// Add listener for main button
document.addEventListener('DOMContentLoaded', function () {

  var mainButton = document.getElementById('main-button');

  getPage(bank_name => {
    $.getJSON("active_pages.json", json => {

      chrome.storage.sync.get('transfer', result => {
        var transferencia = result.transfer;
        document.getElementById("text-holder").innerHTML += "<br>" + transferencia.destinatario.nombre + "<br> RUT: " + transferencia.destinatario.rut + "<br> Monto: " + transferencia.monto;
      });
      // onClick's logic below:
      mainButton.addEventListener('click', function () {
        // Open form to fill in the same tab        
        openForm(json, bank_name);

        //wait until the page is loaded
        setTimeout(() => {
          fillButton();
        }, 3000);

        setTimeout(() => {
          document.getElementById("text-holder").innerHTML = "El formulario se ha completado con éxito. <br> Sigue el proceso en la página de tu banco para confirmar.";
          document.getElementById("main-button").style.display = "none";
          document.getElementById("ok-button").style.display = "inline";
        }, 1500);
      });
    });
  });
});

// Add listener for OK button
document.addEventListener('DOMContentLoaded', function () {
  var okButton = document.getElementById('ok-button');

  // onClick's logic below:
  okButton.addEventListener('click', function () {
    //Close popup
    window.close();
  });
});

function fillButton() {
  chrome.tabs.executeScript({
    code: 'location.href="javascript:fill_my_form(); void 0";'
  });
}

//Santander dont change its URL, need a fun
function santanderForm(form_url) {
  chrome.tabs.executeScript({
    code: 'location.href="javascript:goToSantanderForm(); void 0";'
  });
}

function genericForm(form_url) {
  chrome.tabs.update({
    url: form_url
  });
}
