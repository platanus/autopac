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
       $.getJSON('active_pages.json', json => {
            var array_exp = new Array(); 
            for (var name in json) {
                array_exp.push(json[name].domain);                
            }
            var regex = new RegExp(array_exp.join("|"));

            // Identify URL matches(banks domain) 
            name = tabURL.match(regex)[0];
            name = name.split(/.cl/)[0];
            //console.log(name);
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
          $.getJSON("active_pages.json", json => {
                document.getElementById("text-holder").innerHTML = "<p>"+ json[bank_name].name  +"</p>" + "<p>"+ json[bank_name].domain  +"</p>";
                // Open form to fill in the same tab    
                if (bank_name=="santander") {    
                   santanderForm(); 
                }
                else {              
                    openForm(json[bank_name].form_url);
                }
            });
        }); 
    });

});

document.addEventListener('DOMContentLoaded', function() {
    var fillFormBtn = document.getElementById('fillFormBtn');
    fillFormBtn.addEventListener('click', fillButton);
});

function fillButton() {
    // document.getElementById("fillFormBtn").innerText += " 1";
    chrome.tabs.executeScript({
        code: 'location.href="javascript:fill_santander(); void 0";'
    });
}

function santanderForm() {
    chrome.tabs.executeScript({
        code: 'location.href="javascript:goToSantanderForm(); void 0";'
    });
}
