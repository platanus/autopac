
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

        var name = tabURL.split(/\.(.+)/)[1];;
        document.getElementById("text-holder").innerHTML = name.split(/\.com|\.cl/)[0];
    });
}

function getName(url){
    
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('mainButton');
    // onClick's logic below:
    link.addEventListener('click', function() {
        getPage();
    });
});
