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
    
    xhttp.open("GET", '/api/teamleads'); 
    xhttp.send();
})();

/* 
    info: Array of objects holding each team leads information
*/
function sponsorsCardDriver(info) {
    let section = document.createElement("section");
    section.setAttribute("class", "main alt");
    let container = document.createElement("div");
    container.setAttribute('class', 'flex-container');
    let sponsorContainer = document.createElement("div");
    sponsorContainer.setAttribute('class', 'sponsor-container');
    for (let team in info) {
        sponsorContainer.appendChild(createSponsorTier(tier));

        let tierContainer = document.createElement("div");
        tierContainer.setAttribute("class", "sponsor-tier");
        for (let x of info[tier]) {
            teamContainer.appendChild(createSponsorCard(x));
        }

        sponsorContainer.appendChild(tierContainer);
    }
    
    container.appendChild(sponsorContainer);
    section.appendChild(container);
    document.getElementById('wrapper').insertBefore(section, document.getElementById('two'));
}

function createTeamLeadCard(obj) {
    let div = document.createElement("div");
    div.classList.add('sponsor-card diamond');
    div.setAttribute('id', obj._id);
    let card = `
        <div class='team-lead-img'>
            <img src='/images/teamleads/${obj.Picture}'>
        </div>
        <div class='team-lead-name'>
            ${obj.Position}
        </div>
        <div class='team-lead-text'>
            ${obj.Name}
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

function createTierTitle(tier) {
    let div = document.createElement("div");
    div.setAttribute("class", "tier-title");
    let title = document.createElement("h2");
    title.innerText = tier;
    div.appendChild(title);
    return div;
}