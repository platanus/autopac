//inject fillbutton
var fillBtn= document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
fillBtn.src = chrome.extension.getURL('src/browser_action/inject_button.js');
fillBtn.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(fillBtn);
// inject bancochile.js
var bancochile= document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
bancochile.src = chrome.extension.getURL('src/inject/bancochile.js');
bancochile.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(bancochile);

