function testRequest() {
  var url = document.getElementById('url-textbox').value;

  let req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
      console.log(req.responseText);
    } else if (req.readyState === 4 && req.status !== 200) {
      console.log('error');
    }
  };

  req.open('GET', 'https://badgersolarracing.org/api/' + url); //TODO: need full link to server API when implemented.
  req.send();
}
