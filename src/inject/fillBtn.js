
var fillBtn = document.createElement('div');
fillBtn.className = "autopac-fixed-div";
fillBtn.innerHTML = `<button id='fillForm' 
                         class='mdl-button 
                         mdl-js-button 
                         mdl-button--raised 
                         mdl-js-ripple-effect 
                         mdl-button--accent'
                         style='position: fixed;
                         bottom: 0;
                         right: 10;'>
                    Fill form
                 </button>`;

document.body.insertBefore(fillBtn, document.body.childNodes[0]);




