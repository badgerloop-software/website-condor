// calls the HTTP server from index.html
(function getSponsors() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                sponsorsCardDriver(JSON.parse(xhttp.responseText)); // sends the JSON data to sponsorsCardDriver
            } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
                //TODO: decide how to handle errors - slack channel? 
            }
        }
    }

    xhttp.open("GET", '/api/sponsors');
    xhttp.send();
})();

// calls the HTTP server from index.html
(function getSponsors() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                executiveLeadDriver(JSON.parse(xhttp.responseText)); // sends the JSON data to executiveLeadDriver
            } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
                //TODO: decide how to handle errors - slack channel? 
            }
        }
    }

    xhttp.open("GET", '/api/teamleads');
    xhttp.send();
})();

// takes in info (the JSON object) and creates the needed sections and div's, calling other methods to place the info
function sponsorsCardDriver(info) {
    let container = document.createElement("div");
    container.setAttribute('class', 'flex-container');
    let sponsorContainer = document.createElement("div");
    sponsorContainer.setAttribute('class', 'sponsor-container');

    for (let x of info['Diamond']) {
        sponsorContainer.appendChild(createSponsorCard(x));
    }


    container.appendChild(sponsorContainer);

    document.getElementById('inner').insertBefore(container, document.getElementById('buttonCenter'));
}

function createSponsorCard(obj) { // creates a card for each sponsor
    let div = document.createElement("div");
    div.classList.add('sponsor-card', 'home');
    div.setAttribute('id', obj._id);
    let card = `
        <div class='sponsor-img'>
            <img src='/images/sponsors/${obj.logo}'>
        </div>
        <div class='sponsor-content'>
            <a href="${obj.website}" class="primary button">Learn More</a>
        </div>
    `;
    div.innerHTML = card;

    return div;
}

function executiveLeadDriver(info) {
    let electricalLead = document.getElementById("electricalLead");
    electricalLead.innerHTML = info.Administrative[0]["Name"];

    let mechanicalLead = document.getElementById("mechanicalLead");
    mechanicalLead.innerHTML = info.Administrative[1]["Name"];

    let operationsLead = document.getElementById("operationsLead");
    operationsLead.innerHTML = info.Administrative[2]["Name"];
}
