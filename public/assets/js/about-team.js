(function getTeamLeads() {
    let xhttp = new XMLHttpRequest();

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            console.log(xhttp.responseText);
        } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.log('error');
        }
    }

    
    xhttp.open("GET", 'https://dev.badgerloop.com/api/teamleads'); //FIXME: when moved to prod link needs to change
    xhttp.send();
})();