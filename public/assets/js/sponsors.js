// calls the HTTP server from sponsors.html
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
  };

  xhttp.open('GET', '/api/sponsors');
  xhttp.send();
})();

// takes in info (the JSON object) and creates the needed sections and div's, calling other methods to place the info
function sponsorsCardDriver(info) {
  let section = document.createElement('section');
  section.setAttribute('class', 'main alt');
  section.setAttribute('id', 'three');
  let inner = document.createElement('div');
  inner.setAttribute('class', 'inner');
  let sponsorContentContainer = document.createElement('div');
  sponsorContentContainer.setAttribute('class', 'sponsor-content-container');
  let container = document.createElement('div');
  container.setAttribute('class', 'flex-container');
  let sponsorContainer = document.createElement('div');
  sponsorContainer.setAttribute('class', 'sponsor-container');
  let tiers = ['Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze']; // an array containg the tiers in correct order to sort for now
  for (let y = 0; y < tiers.length; y++) {
    // loops through the correctly ordered tiers array
    for (let tier in info) {
      // loops through the different tiers in the JSON
      if (tiers[y] === tier) {
        // if the currently selected JSON tier = the tier in the array, continue (to check order)
        let tierDiv = createSponsorTier(tier); // calls createSponsorTier to create the tier container
        sponsorContainer.appendChild(tierDiv);

        for (let x of info[tier]) {
          // loops through sponsors in that tier
          tierDiv.appendChild(createSponsorCard(x)); // calls createSponsorCard for each sponsor
        }
      } else {
        continue;
      }
    }
  }

  container.appendChild(sponsorContainer); // appends all needed sections and div's
  sponsorContentContainer.appendChild(container);
  inner.appendChild(sponsorContentContainer);
  section.appendChild(inner);

  document
    .getElementById('wrapper')
    .insertBefore(section, document.getElementById('two')); // places the info in the right place
}

function createSponsorCard(obj) {
  // creates a card for each sponsor
  let div = document.createElement('div');
  div.classList.add('sponsor-card', obj.tier.toLowerCase());
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

function createSponsorTier(tier) {
  // creates the tier div for each tier
  let tierDiv = document.createElement('div');
  tierDiv.setAttribute('class', 'sponsor-tier');
  let div = document.createElement('div');
  div.setAttribute('class', 'team-title');
  let title = document.createElement('h2');
  title.innerText = tier + ' Tier:';
  div.appendChild(title);
  tierDiv.appendChild(div);
  return tierDiv;
}
