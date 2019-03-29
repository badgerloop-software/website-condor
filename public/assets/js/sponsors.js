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
    info: Array of objects holding each sponsor leads information
*/
function sponsorsCardDriver(info) {
    let section = document.createElement("section");
    section.setAttribute("class", "main alt");
    section.setAttribute("id", "three");
    let inner = document.createElement("div");
    inner.setAttribute('class', 'inner');
    let sponsorContentContainer = document.createElement("div");
    sponsorContentContainer.setAttribute('class', 'sponsor-content-container');
    let container = document.createElement("div");
    container.setAttribute('class', 'flex-container');
    let sponsorContainer = document.createElement("div");
    sponsorContainer.setAttribute('class', 'sponsor-container');
    for (let tier in info) {
        sponsorContainer.appendChild(createSponsorTier(tier));

        let tierContainer = document.createElement("div");
        tierContainer.setAttribute("class", "sponsor-tier");
        for (let x of info[tier]) {
            sponsorContainer.appendChild(createSponsorCard(x));
        }

        sponsorContainer.appendChild(tierContainer);
    }

    container.appendChild(sponsorContainer);
    sponsorContentContainer.appendChild(container);
    section.appendChild(sponsorContentContainer);
    section.appendChild(inner);

    document.getElementById('wrapper').insertBefore(section, document.getElementById('two'));
}

function createSponsorCard(obj) {
    let div = document.createElement("div");
    div.classList.add('sponsor-card', obj.tier);
    div.setAttribute('id', obj._id);
    let card = `
        <div class='sponsor-img'>
            <img src='/images/sponsors/${obj.logo}'>
        </div>
        <div class='sponsor-text'>
            ${obj.website}
        </div>
    `;
    div.innerHTML = card;

    return div;
}

function createSponsorTier(tier) {
    let tierDiv = document.createElement("div");
    tierDiv.setAttribute("class", "sponsor-tier");
    let div = document.createElement("div");
    div.setAttribute("class", "team-title");
    let title = document.createElement("h2");
    title.innerText = tier;
    div.appendChild(title);
    tierDiv.appendChild(div);
    return tierDiv;
}