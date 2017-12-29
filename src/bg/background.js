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
    matches = array_exp.join("|");
    if (callback) {
      callback(matches)        
    }
  });
}

chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules
  getMatches(page_matches => { 
      chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
          {
            // Match pages
            conditions: [
              new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { urlMatches: page_matches },
              })
            ],
            // Activate extension actions
            actions: [ new chrome.declarativeContent.ShowPageAction() ]
          }
        ]);
      });
  });
});

// React when a browser action's icon is clicked.
/*
chrome.pageAction.onClicked.addListener(function() {
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var myTab = tabs[0];
  if (myTab) { // Sanity check
    chrome.pageAction.setPopup({myTab, popup: 'src/browser_action/bank_action.html'})
  }
});

});
*/


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
