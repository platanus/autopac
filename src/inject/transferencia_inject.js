/**
 *  Script that that sends messages with the transferencia data to the 
 * website. It must inject the client side first on the website.
 */

// inject transferencia_fun script to page script
var script_transferencia = document.createElement('script');
// TODO: add "<script>.js" to web_accessible_resources in manifest.json
script_transferencia.src = chrome.extension.getURL('src/inject/transferencia_fun.js');
script_transferencia.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(script_transferencia);

// logic behind the interaction between the webpage and the content script from the extension
var transferencia = null;
// get transferencia from storage, resolves when loaded
function loadTransferenciaFromStorage() {
    return new Promise( function(resolve, reject) {
        chrome.storage.local.get("transferencia", data => {
            data && (transferencia = data.transferencia); // if transferencia exists in local storage
            resolve(transferencia);
        });
    });
}

// send message with transferencia data to page script
function sendTransferenciaToPageScript() {
    loadTransferenciaFromStorage()
    .then( transferencia => { 
        window.postMessage({ // send message to page script
            from: "autopac", // from autopac extension
            transferencia: transferencia
          }, "*"); // to any targetOrigin
    });
}

// return transferencia as requested 
document.addEventListener("getTransferencia", (event) => {
    sendTransferenciaToPageScript();
});
