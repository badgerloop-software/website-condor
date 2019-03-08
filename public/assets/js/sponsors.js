(function getSponsors() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === xhttp.DONE) {
            if ( xhttp.status === 200) {
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
    info: Array of objects holding each team leads information
*/
function sponsorsCardDriver(info) {
    let section = document.createElement("section");
    section.setAttribute("class", "main alt");
    section.setAttribute("id", "three");
    let container = document.createElement("div");
    container.setAttribute('class', 'inner');
    let sponsorContainer = document.createElement("div");
    sponsorContainer.setAttribute('class', 'flex-container');
    for (let tier in info) {
        sponsorContainer.appendChild(createTeamTitle(tier));

        let sponsorContainer = document.createElement("div");
        sponsorContainer.setAttribute("class", "sponsor-container");
        for (let x of info[tier]) {
            sponsorContainer.appendChild(createSponsorCard(x));
        }

        sponsorContainer.appendChild(sponsorContainer);
    }
    
    container.appendChild(sponsorContainer);
    section.appendChild(container);
    document.getElementById('wrapper').insertBefore(section, document.getElementById('two'));
}

function createSponsorCard(obj) {
    let div = document.createElement("div");
    div.classList.add('sponsor-card' + tier);
    div.setAttribute('id', obj._id);
    let card = `
        <div class='sponsor-img'>
            <img src='/images/sponsors/${obj.logo}'>
        </div>
        <div class='sponsor-content'>
            <a href='${obj.websitte}' class='primary button'>Learn More</a>
        </div>
    `;
    div.innerHTML = card;

    return div;
}

function createSponsorTile(tier) {
    let div = document.createElement("div");
    div.setAttribute("class", "tier");
    let title = document.createElement("h2");
    title.innerText = tier;
    div.appendChild(tier);
    return div;
}