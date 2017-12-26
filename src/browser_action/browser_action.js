
function getPage(){
    
    var tabURL;
    var tabTitle;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        tabURL = tabs[0].url;
        tabTitle = tabs[0].title;
        console.log("Title");
        console.log(tabURL);
        document.getElementById("text-holder").innerHTML = tabURL;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('mainButton');
    // onClick's logic below:
    link.addEventListener('click', function() {
        getPage();
    });
});
