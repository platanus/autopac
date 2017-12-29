// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });



    
    var name;
       $.getJSON('bancos.json', json => {
            var array_exp = new Array(); 
            for (var name in json) {
                array_exp.push(json[name].domain);                
            }
          


            // Identify URL matches
            name = array_exp.join("|");
            //console.log("asd");

            //document.getElementById("text-holder").innerHTML = name;
            if (callback) {
                callback(name)        
            }

        });




chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

  //matchedUrl(matches => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // Match pages
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '(bancoestado.cl|bancochile.cl)' }
            //pageUrl: { urlMatches: matches },
          })
        ],
        // Activate extension actions
        actions: [ new chrome.declarativeContent.ShowPageAction() ];
      }
    ]);
  });
  //});
});

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
