document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('myForm');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var data = new FormData(form);
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    
    xhr.open('POST', 'https://example.com/submit.php', true);
    xhr.send(data);
  });
});
