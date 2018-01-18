// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

var TRANSFERENCIA_DEFAULT = null;

function getDefault(){
  var tomorrow = new Date();
  var today  = new Date();
  var oneYear = new Date();
  tomorrow.setDate(today.getDate()+1);
  oneYear.setDate(today.getDate()+366);

  TRANSFERENCIA_DEFAULT = {
      origen: {},
      destinatario: {
          nombre: "Fintual Bg",
          rut: "8.388.364-2",
          mail: "fitnual_test@fintual.com",
          numeroCuenta: "111111111",
          banco: "banco de chile",
          tipoCuenta: "corriente"
      },
      monto: 50000,
      programacion: {
          //mm-dd-yyyy
          fechaInicio: tomorrow.toDateString(),
          fechaTermino: oneYear.toDateString(),
          frecuencia: "MENSUAL"
      }
  };
}


function getMatches(callback){
  var matches;
  $.getJSON('src/browser_action/active_pages.json', json => {
    var array_exp = new Array();
    for (var name in json) {
     array_exp.push(json[name].extension_domain);
    }
    matches = array_exp.join("|");
    //console.log(matches);
    if (callback) {
      callback(matches)
    }
  });
}

function getRequesters(callback){
  var requesters;
  $.getJSON('src/browser_action/active_pages.json', json => {
    var array_exp = new Array();
    for (var name in json) {
        if (json[name].type == "requester") {
            array_exp.push(json[name].extension_domain);
        }
    }
    requesters = array_exp.join("|");
    //console.log(requesters);
    if (callback) {
      callback(requesters)
    }
  });
}

chrome.runtime.onInstalled.addListener(function() {
  // Set default values in storage
  var storage = chrome.storage.sync;  
  getDefault();
  storage.set({"transfer": TRANSFERENCIA_DEFAULT});

  // Replace all rules
  getMatches(page_matches => {
      chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
          {
            // Match pages
            conditions: [
              new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { urlMatches: page_matches },
              })
            ],
            // Activate extension actions
            actions: [ new chrome.declarativeContent.ShowPageAction() ]
          }
        ]);
      });
  });
});

// React when open or refresh a tab

chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var myTab = tabs[0];
      getRequesters(requesters => {
          // Select the HTML popup for each page
          if (myTab.url.match(new RegExp(requesters))) {
            chrome.pageAction.setPopup({tabId: myTab.id, popup: 'src/browser_action/fintual_action.html'});
          }
          else {
            chrome.pageAction.setPopup({tabId: myTab.id, popup: 'src/browser_action/bank_action.html'});
          }
      });
    });
});

chrome.runtime.onMessageExternal.addListener(  
  function(request, sender, sendResponse) {    
    if (request.type == "getStorage"){
      chrome.storage.sync.get('transfer', result => {    
        sendResponse(result.transfer);    
        //console.log(result.transfer);
      });      
    }
    return true
  });