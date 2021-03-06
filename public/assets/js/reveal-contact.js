/**
 * Imediately Invoked Function (IIF) gets called as soon as it is declared.
 * Sets event listeners for the form
 */
(function () {
  document.getElementById("form-submit").addEventListener("click", formSubmit);
})();
/**
 * Removes additional form and checks for which new type of form was selected. Used
 * with a change event on the contact-category (dropdown) node.
 */
function formChange() {
  removeForm();
  dynamicForm();
}
/**
 * Removes the additional input fields appended to the DOM.
 */
function removeForm() {
  let list = document.querySelectorAll(".additional-form");

  for (x of list) {
    x.parentNode.removeChild(x);
  }
}

/**
 * Driver for the form submission. Calls functions to check the validity of input fields.
 * If all fields are valid, sends the message to the appropriate areas. All forms are submitted
 * to our slack. If the form is a student inquiry, it also sends the form input to our google form.
 */
function formSubmit() {
  let inputObjects = document.querySelectorAll(".form-check");

  let message = "*REVEAL QUESTION*\n";
  let validFlag = true;

  //checks all form inputs except for the checkboxes
  for (x of inputObjects) {
    x.addEventListener("input", inputChange);

    x.classList.remove("form-error");
    if (x.value != "") {
      message += "*" + x.title + ":* " + x.value + "\n";
    }
  }

  if (!validCheckGroup(document.querySelectorAll(".required-check"))) validFlag = false;

  if (message != "*REVEAL QUESTION*\n") sendForm(message);
}

/**
 * Called on form submission. Checks if one of the checkboxes of the group is selected. If one is,
 * it returns true and allows the form to continue to be submitted. If one is not, it prevents
 * the form from being submitted and adds an event listener to listen for the checkboxes to be
 * changed.
 * @param {NodeList} group group of checkboxes
 * @returns {boolean} true if one or more checkboxes are selected, false if one or more is not.
 */
function validCheckGroup(group) {
  if (group.length > 0) {
    let flag = false;
    for (x of group) {
      x.addEventListener("input", () => {
        checkChange(group);
      });
      if (x.checked) {
        flag = true;
      }
    }

    if (group && flag) x.parentNode.classList.remove("check-error");
    else if (group && !flag) x.parentNode.classList.add("check-error");

    return flag;
  } else {
    return true;
  }
}
/**
 * If one of the check boxes is selected, removes the error class from the checkboxes parent.
 * If one of the check boxes isn't selected, adds the error class to the checkboxes parent.
 * @param {NodeList} group group of checkboxes
 */
function checkChange(group) {
  let flag = false;
  for (x of group) {
    if (x.checked) {
      flag = true;
    }
  }

  if (flag) group[0].parentNode.classList.remove("check-error");
  else group[0].parentNode.classList.add("check-error");
}
/**
 * Sends the form data to a slack webhook. The message will be posted in website-activity.
 * @param {string} message the slack formatted message containing all input from the form
 */
function sendForm(message) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      //posting message was successful
      displayStatusMessage("success");
      clearForm();
    } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
      //posting message was unsuccessful
      //TODO: catch errors from Slack and from our API - set up email
      displayStatusMessage("error");
      clearForm();
    }
  };

  xhttp.open("POST", "/api/contact");
  xhttp.send(JSON.stringify(message));
}
/**
 * Sends requst to google app script to populate the google form (https://docs.google.com/forms/d/e/1FAIpQLScUSWZHf-8eMYvrwFLx6pG0ZON6Mkk1SVvaA4QKJ0U3b2hnjA/viewform) with
 * response data from the student inquiry form.
 * @param {NodeList} items list of input items with class "form-check"
 */
/* function googleFormSubmission(items) {
    let data = createGoogleFormInfo(items);

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            //TODO: catch errors and report via slack bot.
        }
    }

    xhttp.open("POST", "https://script.google.com/macros/s/AKfycbxJqdWAA9juExLXPb94uKad_NMzBnoZDbEgiz1LIBnYqR50fe-W/exec");

    xhttp.send(JSON.stringify(data));

} */

function sendStudentEmailResponse(emailAddr) {
  //TODO:
  // let xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //     if (xhttp.readyState === XMLHttpRequest.DONE) {
  //         console.log(xhttp.responseText);
  //     }
  // }
  // xhttp.open("POST", "/api/emailResponse");
  // xhttp.send(JSON.stringify(emailAddr));
}
/**
 * Checks the checkbox group to make sure one of the checkboxes is selected. Checkboxes
 * must have the class "required-check" to be selected.
 * @returns true if a checkbox is selected. false if no checkboxes are selected.
 */
function getStudentTeams() {
  let teams = "";
  let checks = document.querySelectorAll(".required-check");

  for (let x of checks) {
    if (x.checked) {
      teams += x.title + ", ";
    }
  }

  return teams.substr(0, teams.length - 2);
}

/**
 * Prepares data to be submitted to the google form (https://docs.google.com/forms/d/e/1FAIpQLScUSWZHf-8eMYvrwFLx6pG0ZON6Mkk1SVvaA4QKJ0U3b2hnjA/viewform).
 * Only needed for Student Inquiries!
 * @param {NodeList} items
 * @returns {obj} data formatted properly for the google form script
 */
/* function createGoogleFormInfo(items) {
    let data = {};

    var GoogleSpreadsheet = require('google-spreadsheet');
    var creds = require('./client_secret.json');

    // Create a document object using the ID of the spreadsheet - obtained from its URL.
    var doc = new GoogleSpreadsheet('18LqWQdvJqPOoMwiraWW6mVouszCmkJF9r1nCGV61cXw');

    // Authenticate with the Google Spreadsheets API.
    doc.useServiceAccountAuth(creds, function (err) {

        doc.addRow(1, {
            first: items[0].value.trim()
        }, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

    for (let x of items) {
        switch (x.title.toLowerCase()) { 
            case "first-name":
                data['First Name'] = x.value.trim();
                break;
            case "last-name":
                data['Last Name'] = x.value.trim();
                break;
            case "major": 
                data['Prospective Major(s)'] = x.value.trim();
                break;
            case "email": 
                data["Email address"] = x.value.trim();
                break;
            default: 
                break;
        }    
    }

    let subTeams = document.querySelectorAll('.required-check');
    data["I am interested in the following Sub-team(s):"] = [];
    for (let x of subTeams) {
        if (x.checked) {
            switch(x.id.toLowerCase()) {
                case "electrical-check":
                    data["I am interested in the following Sub-team(s):"].push("Electrical Teams (Battery, Controls, Low Voltage, High Voltage, Software)");
                    break;
                case "mechanical-check":
                    data["I am interested in the following Sub-team(s):"].push("Mechanical Teams (Analysis, Braking, Fabrication, Propulsion, Stability, Structural, Testing/Safety)");
                    break;
                case "operations-check": 
                    data["I am interested in the following Sub-team(s):"].push("Operations Teams (Communications, Feasibility, Finance/Supply Chain, Industry Relations, Outreach & Recruiting, Virtual Reality, Website)");
                    break;
                default: 
                    break;
            }
        }
    }

    return data;
} */
/**
 * Checks whether the form input needs to be displayed as invalid or not.
 * @param {event} event the event object passed when an event fires
 */
function inputChange(event) {
  if (event.target.value !== "") {
    event.target.classList.remove("form-error");
  } else {
    event.target.classList.add("form-error");
  }
}
/**
 * Clears the form of any entered information.
 */
function clearForm() {
  removeForm();

  let inputs = document.querySelectorAll(".form-check");

  for (x of inputs) {
    x.value = "";
  }
}
/**
 * Displays either a status or error message to the user. Inserted before div with ID "form-submit"
 * @param {string} message flag to identify if success or error message should be displayed. "success" for success, anything else for failure.
 */
function displayStatusMessage(message) {
  let button = document.getElementById("form-submit");
  let parent = button.parentNode.parentNode.parentNode;

  if (message === "success") {
    alertMessage = "Message successfully sent!";
    css = "success-message";
  } else {
    alertMessage =
      "There was an issue sending your message. \nA notification has been sent to Badgerloop.";
    css = "failure-message";
  }

  let newNode = document.createElement("div");
  newNode.setAttribute("class", "alert " + css);
  newNode.innerHTML =
    "<div class='status-content'>" +
    alertMessage +
    "</div><div class='status-close' onclick='closeStatusMessage(this)'><img src='/images/x.svg'></img></div>";
  parent.parentNode.insertBefore(newNode, parent);
}
/**
 * Removes status message from the DOM. When the x button is clicked it should be removed from the DOM.
 * @param {DOM Node} obj UI status message x button that was clicked
 */
function closeStatusMessage(obj) {
  obj.parentNode.parentNode.removeChild(obj.parentNode);
}
