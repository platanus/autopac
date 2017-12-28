var formDict = { bancochile:"https://login.bancochile.cl/bancochile-web/persona/login/index.html#/login", 
                 bancoestado: "https://www.bancoestado.cl/imagenes/comun2008/nuevo_paglg_pers2.html" };

function getPage(callback){
    
    var tabURL;
    var tabTitle;
    var name;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        tabURL = tabs[0].url;
        tabTitle = tabs[0].title;
        //console.log("Title");
        //console.log(tabURL);

        // Identify URL matches
        // TODO add new matches
        name = tabURL.match(/bancochile.cl|bancoestado.cl/)[0];
        name = name.split(/.cl/)[0];
        
        //document.getElementById("text-holder").innerHTML = name;
        if (callback) {
            callback(name)        
        }
    });
}

function openForm(bank_name){
    // Open in the same tab the form to fill
    chrome.tabs.update({ url: formDict[bank_name] });
}

// Add lsitener for main button
document.addEventListener('DOMContentLoaded', function() {
    var mainButton = document.getElementById('mainButton');
    // onClick's logic below:
    mainButton.addEventListener('click', function() {
        getPage( bank_name => {
          //console.log("banco", bank_name);
          $.getJSON("bancos.json", json => {
                //console.log(bank_name);
                document.getElementById("text-holder").innerHTML = "<p>"+ json[bank_name].name  +"</p>" + "<p>"+ json[bank_name].url  +"</p>";
                // Open form to fill in the same tab  
                openForm(bank_name);




                document.getElementById("fill-button-div").innerHTML = "<button id='fillButton' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'>Fill form</button>";

                // Add listener for fill button
                var fillButton = document.getElementById('fillButton');
                // onClick's logic below:
                fillButton.addEventListener('click', function(tab) {
                    document.getElementById("text-holder").innerHTML = "<p>Completando formulario</p>";
                        chrome.tabs.executeScript(null, {file: "src/js/jquery-3.2.1.min.js"});
                        chrome.tabs.executeScript(null, {file: "src/browser_action/inject_button.js" });
                });
            });
        });  
    });
});


