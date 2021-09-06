(function getTeamLeads() {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === xhttp.DONE) {
      if (xhttp.status === 200) {
        teamLeadCardDriver(JSON.parse(xhttp.responseText));
        executiveLeadDriver(JSON.parse(xhttp.responseText));
      } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
        //TODO: decide how to handle errors - slack channel?
      }
    }
  };

  xhttp.open("GET", "badgerloop/api/teamleads");
  xhttp.send();
})();

/* 
    info: Array of objects holding each team leads information
*/
function teamLeadCardDriver(info) {
  let section = document.createElement("section");
  section.setAttribute("class", "main alt");
  let container = document.createElement("div");
  container.setAttribute("class", "flex-container");
  let tlContainer = document.createElement("div");
  tlContainer.setAttribute("class", "team-lead-container");
  let teams = ["Administrative", "Electrical", "Mechanical", "Operations"]; // an array containg the teams in correct order to sort for now
  for (let y = 0; y < teams.length; y++) {
    // loops through the correctly ordered teams array
    for (let team in info) {
      if (teams[y] === team) {
        // if the currently selected JSON team = the teams in the array, continue (to check order)
        tlContainer.appendChild(createTeamTitle(team));

        let teamContainer = document.createElement("div");
        teamContainer.setAttribute("class", "team-container");
        for (let x of info[team]) {
          teamContainer.appendChild(createTeamLeadCard(x));
        }

        tlContainer.appendChild(teamContainer);
      } else {
        continue;
      }
    }
  }

  container.appendChild(tlContainer);
  section.appendChild(container);
  document.getElementById("wrapper").insertBefore(section, document.getElementById("footer"));
}

function createTeamLeadCard(obj) {
  let div = document.createElement("div");
  div.classList.add("team-lead-card");
  div.setAttribute("id", obj._id);
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

function createTeamTitle(team) {
  let div = document.createElement("div");
  div.setAttribute("class", "team-title");
  let title = document.createElement("h2");
  title.innerText = team;
  div.appendChild(title);
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
