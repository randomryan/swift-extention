document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('myForm');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var ipAddress = form.elements.ipAddress.value;
    var location = form.elements.location.value;
    var latitude = form.elements.latitude.value;
    var longitude = form.elements.longitude.value;
    var userAgent = form.elements.userAgent.value;
    var headers = [];
    var checkboxes = form.querySelectorAll('input[type=checkbox]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
      headers.push(checkboxes[i].value);
    }
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      
      if (ipAddress) {
        chrome.webRequest.onBeforeSendHeaders.addListener(
          function(details) {
            var requestHeaders = details.requestHeaders;
            requestHeaders.push({name: 'X-Forwarded-For', value: ipAddress});
            return {requestHeaders: requestHeaders};
          },
          {urls: ["<all_urls>"]},
