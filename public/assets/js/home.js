(function getSponsors() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                sponsorsCardDriver(JSON.parse(xhttp.responseText));
            } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
                //TODO: decide how to handle errors - slack channel? 
            }
        }
    }

    xhttp.open("GET", '/api/sponsors');
    xhttp.send();
})();

/* 
    info: Array of objects holding each sponsor leads information
*/
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

function createSponsorCard(obj) {
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