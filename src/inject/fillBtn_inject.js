//inject fillbutton
var fillBtn= document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
fillBtn.src = chrome.extension.getURL('src/inject/fillBtn.js');
fillBtn.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(fillBtn);
