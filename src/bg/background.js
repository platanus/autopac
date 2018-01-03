// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

function getMatches(callback){
  var matches;
  $.getJSON('src/browser_action/active_pages.json', json => {
    var array_exp = new Array(); 
    for (var name in json) {
     array_exp.push(json[name].domain);                
    }
    matches = array_exp.join("|");
    //console.log(matches);
    if (callback) {
      callback(matches)        
    }
  });
}

function getNonBanks(callback){
  var nonBanks;
  $.getJSON('src/browser_action/active_pages.json', json => {
    var array_exp = new Array(); 
    for (var name in json) {
        if (json[name].type == "externo") {
            array_exp.push(json[name].domain);  
        }              
    }
    nonBanks = array_exp.join("|");
    //console.log(nonBanks);
    if (callback) {
      callback(nonBanks)        
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

// React when open or refresh a tab

chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var myTab = tabs[0];
      getNonBanks(nonBanks => { 
          // Select the HTML popup for each page
          if (myTab.url.match(new RegExp(nonBanks))) { 
            chrome.pageAction.setPopup({tabId: myTab.id, popup: 'src/browser_action/fintual_action.html'});
          }
          else {
            chrome.pageAction.setPopup({tabId: myTab.id, popup: 'src/browser_action/bank_action.html'});
          }
      });
    });
});


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
