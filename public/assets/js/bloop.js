function testRequest() {
    var url = document.getElementById("url-textbox").value;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            console.log(xhttp.responseText);
        } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.log('error');
        }
    }

    xhttp.open("POST", 'https://dev.badgerloop.com/api/' + url) //TODO: need full link to server API when implemented.
    xhttp.send();




}