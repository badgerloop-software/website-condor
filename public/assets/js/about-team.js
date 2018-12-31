(function getTeamLeads() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === xhttp.DONE) {
            // if ( xhttp.status === 200) {
                teamLeadCardDriver(JSON.parse(xhttp.responseText));
            // } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            //     //TODO: decide how to handle errors with
            // }
        } 
    }

    
    xhttp.open("GET", 'https://dev.badgerloop.com/api/teamleads'); //FIXME: when moved to prod link needs to change
    xhttp.send();
})();

/* 
    info: Array of objects holding each team leads information
*/
function teamLeadCardDriver(info) {
    let container = document.createElement("div");
    container.setAttribute('class', 'team-lead-container');
    for (let x of info) {
       container.appendChild(createTeamLeadCard(x));
    }

    document.getElementById('wrapper').insertBefore(container, document.getElementById('footer'));
}

function createTeamLeadCard(obj) {
    let div = document.createElement("div");
    div.classList.add('team-lead-card');
    div.setAttribute('id', obj._id);
    let card = `
        <div class='team-lead-img'>
            <img src=/images/teamleads/${obj.Picture}
        </div>
        <div class='team-lead-name'>
            ${obj.Name}
        </div>
        <div class='team-lead-text'>
            ${obj.Position}
        </div>
        <div class='team-lead-text'>
            ${obj.Major}
        </div>
        <div class='team-lead-text'>
            ${obj.Year}
        </div>
    `;
    div.innerHTML = card;

    return div;
}