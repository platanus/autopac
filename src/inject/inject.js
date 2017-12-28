var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('src/inject/aux_fun.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

/*
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('src/inject/inject.css');
document.head.appendChild(style);
*/
