//Get the url in the current tab and extract the domain name 
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
        //console.log(tabURL);
       $.getJSON('bancos.json', json => {
            var array_exp = new Array(); 
            for (var name in json) {
                array_exp.push(json[name].domain);                
            }
            var regex = new RegExp(array_exp.join("|"));

            // Identify URL matches(banks domain) 
            name = tabURL.match(regex)[0];
            name = name.split(/.cl/)[0];

            if (callback) {
                callback(name)        
            }
        });
    });
}

//Open form in the same tab
function openForm(bank_form){
    // Open in the same tab the form to fill
    chrome.tabs.update({ url: bank_form });
}

// Add lsitener for main button
document.addEventListener('DOMContentLoaded', function() {
    var mainButton = document.getElementById('mainButton');
    // onClick's logic below:
    mainButton.addEventListener('click', function() {
        getPage( bank_name => {
          //console.log("banco", bank_name);
          $.getJSON("bancos.json", json => {

                document.getElementById("text-holder").innerHTML = "<p>"+ json[bank_name].name  +"</p>" + "<p>"+ json[bank_name].domain  +"</p>";
                // Open form to fill in the same tab  
                openForm(json[bank_name].form_url);
                // 
                document.getElementById("fill-button-div").innerHTML = "<button id='make-fill-button' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'>Make button</button>";

                // Add listener for the new button in the extension
                var fillButton = document.getElementById('make-fill-button');
                // onClick's logic below:
                fillButton.addEventListener('click', function() {
                    document.getElementById("text-holder").innerHTML = "<p>Completando formulario</p>";
                    // Inject new button in the source page
                    chrome.tabs.executeScript(null, {file: "src/browser_action/inject_button.js" });
                });
            });
        });  
    });
});