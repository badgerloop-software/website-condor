(function() {
    document.getElementById('contact-category').addEventListener('change', formChange);
    document.getElementById('contact-submit').addEventListener('click', formSubmit);
})();

function formChange() {
    removeForm();
    dynamicForm();
}

function removeForm() {
    let list = document.querySelectorAll('.additional-form');

    for (x of list) {
        x.parentNode.removeChild(x);
    }
}

function dynamicForm() {
    console.log("changing");
    let selected = document.getElementById('contact-category').value.toLowerCase();

    switch(selected) {
        case('student inquiry'):
            studentForm();
            break;
        case('sponsorship inquiry'):
            sponsorForm();
            break;
        case('media inquiry'):
            mediaForm();
            break;
    }
}

function studentForm() {

    let teams = document.createElement('div');
    teams.setAttribute('class', 'col-12 additional-form form-checkbox');
    teams.innerHTML = `
    <div class="form-label">Team(s) Interested In:</div>
    <div class="team-checkboxes">
        <input class="required-check" type="checkbox" id="electrical-check"><label for="electrical-check">Electrical Team</label>
        <input class="required-check" type="checkbox" id="mechanical-check"><label for="mechanical-check">Mechanical Team</label>
        <input class="required-check" type="checkbox" id="operations-check"><label for="operations-check">Operations Team</label>
    </div>
    `;
    document.getElementById("contact-form").insertBefore(teams, document.getElementById("contact-category").parentNode.nextSibling);

    let year = document.createElement('div');
    year.setAttribute('class', 'col-6 col-12-xsmall additional-form');
    year.innerHTML = `<div class="form-label">Year:</div><input class="form-check" type="text" title="Year">`;
    document.getElementById("contact-form").insertBefore(year, document.getElementById("contact-category").parentNode.nextSibling);

    let major = document.createElement('div');
    major.setAttribute('class', 'col-6 col-12-xsmall additional-form');
    major.innerHTML = `<div class="form-label">Major:</div><input class="form-check" type="text" title="Major">`;
    document.getElementById("contact-form").insertBefore(major, document.getElementById("contact-category").parentNode.nextSibling);

}

function sponsorForm() {

    let company = document.createElement('div');
    company.setAttribute('class', 'col-12 additional-form');
    company.innerHTML = `<div class="form-label">Company Name:</div><input class="form-check" type="text" title="Company Name">`;
    document.getElementById("contact-form").insertBefore(company, document.getElementById("contact-category").parentNode.nextSibling);

}

function mediaForm() {

    let media = document.createElement('div');
    media.setAttribute('class', 'col-12 additional-form');
    media.innerHTML = `<div class="form-label">Organization Name:</div><input class="form-check" type="text" title="Organization Name">`;
    document.getElementById("contact-form").insertBefore(media, document.getElementById("contact-category").parentNode.nextSibling);

}

function formSubmit() {
    let inputObjects = document.querySelectorAll('.form-check');

    let message = "";
    let validFlag = true;

    for (x of inputObjects) {
        x.addEventListener('input', inputChange);

        if (validInput(x.value)) {
            x.classList.remove('form-error');
            message += "*" + x.title + ":* " + x.value + "\n";
        } else {
            validFlag = false;
            x.classList.add('form-error');
        }
    }

    if (!validCheckGroup(document.querySelectorAll('.required-check'))) validFlag = false;

    if (validFlag) sendForm(message);

}

function validInput(x) {
    if (x === "") return false

    return true;
}

function validCheckGroup(group) {
    let flag = false;
    for (x of group) {
        
        x.addEventListener('input', ()=> {
            checkChange(group);
        });
        if (x.checked) { 
            flag = true;   
        }
    }

    if (group && flag) x.parentNode.classList.remove('check-error');
    else if (group && !flag) x.parentNode.classList.add('check-error');

    return flag;
}

function checkChange(group) {
    let flag = false;
    for (x of group) {
        if (x.checked) {
            flag = true;
        }
    }

    if (flag) group[0].parentNode.classList.remove('check-error');
    else group[0].parentNode.classList.add('check-error');
}

function sendForm(message) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            displayStatusMessage('success');
            clearForm();
        } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            //TODO: catch errors from Slack and from our API - set up email
            displayStatusMessage('error');
            clearForm();
        }
    }

    xhttp.open("POST", 'https://badgerloop.com/node/contact') //TODO: need full link to server API when implemented.
    xhttp.send(JSON.stringify(message));
}

function inputChange(event) {

    if (event.target.value !== "") {
        event.target.classList.remove('form-error');
    } else {
        event.target.classList.add('form-error');
    }

}

function clearForm() {

    removeForm();

    let inputs = document.querySelectorAll('.form-check');

    for (x of inputs) {
        x.value = "";
    }
    
}

function displayStatusMessage(message) {

    let button = document.getElementById('contact-submit');
    let parent = button.parentNode.parentNode.parentNode;

    if (message === "success") {
        alertMessage = "Message successfully sent!";
        css = "success-message";
    } else {
        alertMessage = "There was an issue sending your message. \nA notification has been sent to Badgerloop.";
        css = "failure-message";
    }

    let newNode = document.createElement("div");
    newNode.setAttribute('class', 'alert ' + css);
    newNode.innerHTML = "<div class='status-content'>" + alertMessage + "</div><div class='status-close' onclick='closeStatusMessage(this)'><img src='/images/x.svg'></img></div>";
    parent.parentNode.insertBefore(newNode, parent);

}

function closeStatusMessage(obj) {
    obj.parentNode.parentNode.removeChild(obj.parentNode);
}