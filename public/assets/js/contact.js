(function() {
    document.getElementById('contact-category').addEventListener('change', formChange);
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
    teams.setAttribute('class', 'col-12 additional-form');
    teams.innerHTML = `<div class="form-label">Team(s) Interested In:</div><input type="text">`;
    document.getElementById("contact-form").insertBefore(teams, document.getElementById("contact-category").parentNode.nextSibling);

    let year = document.createElement('div');
    year.setAttribute('class', 'col-6 col-12-xsmall additional-form');
    year.innerHTML = `<div class="form-label">Year:</div><input type="text">`;
    document.getElementById("contact-form").insertBefore(year, document.getElementById("contact-category").parentNode.nextSibling);

    let major = document.createElement('div');
    major.setAttribute('class', 'col-6 col-12-xsmall additional-form');
    major.innerHTML = `<div class="form-label">Major:</div><input type="text">`;
    document.getElementById("contact-form").insertBefore(major, document.getElementById("contact-category").parentNode.nextSibling);

}

function sponsorForm() {

    let company = document.createElement('div');
    company.setAttribute('class', 'col-12 additional-form');
    company.innerHTML = `<div class="form-label">Company Name:</div><input type="text">`;
    document.getElementById("contact-form").insertBefore(company, document.getElementById("contact-category").parentNode.nextSibling);

}

function mediaForm() {

    let media = document.createElement('div');
    media.setAttribute('class', 'col-12 additional-form');
    media.innerHTML = `<div class="form-label">Organization Name:</div><input type="text">`;
    document.getElementById("contact-form").insertBefore(media, document.getElementById("contact-category").parentNode.nextSibling);

}