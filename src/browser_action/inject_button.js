
console.log("inject button!!!");

function bancochileButton(){
    var tmp = document.createElement('div');
    tmp.className = "autopac-fixed-div";

    tmp.innerHTML = "<button id='fillForm' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent' onclick='fill_bancochile()'>Fill form</button>";
    //document.body.insertBefore(tmp, document.body.childNodes[0]);
    document.head.parentNode.insertBefore(tmp, document.head);
}
