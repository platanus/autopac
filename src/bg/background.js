// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

function getMatches(callback){
  var matches;
  $.getJSON('src/browser_action/bancos.json', json => {
    var array_exp = new Array(); 
    for (var name in json) {
     array_exp.push(json[name].domain);                
    }
    var matches = array_exp.join("|");
    if (callback) {
      callback(matches)        
    }
  });
}

chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules
  var matches ;
  getMatches(matches) ;
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // Match pages
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: matches}
          })
        ],
        // Activate extension actions
        actions: [ new chrome.declarativeContent.ShowPageAction() ];
      }
    ]);
  });
});

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
