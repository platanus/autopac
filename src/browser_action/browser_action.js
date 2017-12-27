
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

function getName(url){
    
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('mainButton');
    // onClick's logic below:
    link.addEventListener('click', function() {
        getPage( bank_name => {
          //console.log("banco", bank_name);
          $.getJSON("bancos.json", json => {
                console.log(bank_name);
                
                document.getElementById("text-holder").innerHTML = "<p>"+ json[bank_name].name  +"</p>" + "<p>"+ json[bank_name].url  +"</p>";
            });
        });  
    });
});
