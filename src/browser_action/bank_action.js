//Get the url in the current tab and extract the domain name
function getPage(callback) {
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
function openForm(json) {
  // Open in the same tab the form to fill
  console.log(json);
  console.log(tabURL)
  if (json.domain == "santander.cl") {
    santanderForm();
  } else {
    chrome.tabs.update({
      url: json.form_url
    });


  }
}

// Add listener for main button
document.addEventListener('DOMContentLoaded', function() {
  var mainButton = document.getElementById('mainButton');

  getPage(bank_name => {
    $.getJSON("active_pages.json", json => {
      document.getElementById("text-holder").innerHTML += "<p> Origen:" + json[bank_name].name + "</p>";

      // onClick's logic below:
      mainButton.addEventListener('click', function() {
        // Open form to fill in the same tab

        openForm(json[bank_name]);

        //wait until the page is loaded
        setTimeout(() => {
          fillButton();
        }, 3000);
      });
    });
  });

});

function fillButton() {
  chrome.tabs.executeScript({
    code: 'location.href="javascript:fill_my_form(); void 0";'
  });
}

//Santander dont change its URL, need a fun
function santanderForm() {
  chrome.tabs.executeScript({
    code: 'location.href="javascript:goToSantanderForm(); void 0";'
  });
}

