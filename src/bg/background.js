// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // Match pages
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '(bancoestado.cl|bancochile.cl)' },
          })
        ],
        // Activate exetnsion actions
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
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
