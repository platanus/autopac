
console.log("inject button!!!");

var tmp = document.createElement('div');
tmp.className = "autopac-fixed-div";

tmp.innerHTML = "<button id='fillForm' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent' onclick='fillForm()'>Fill form</button>";
document.body.insertBefore(tmp, document.body.childNodes[0]);

