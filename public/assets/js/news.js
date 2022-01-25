// calls the HTTP server from sponsors.html
window.onload = function () {
    getNewsPosts();
};

function getNewsPosts(i) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                if (i != null) {
                    renderArticle(JSON.parse(xhttp.responseText).undefined, i);
                }
                createNewsLink(JSON.parse(xhttp.responseText));
            } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
                //TODO: decide how to handle errors - slack channel? 
            }
        }
    }
    xhttp.open("GET", '/api/news');
    xhttp.send();
}

function createNewsLink(resp) { // creates a card for each news piece
    let newsArticles = resp.undefined;

    for (i = 0; i <= newsArticles.length - 1; i++) {
        // extract the date portion of the subheading, and trim whitespace
        let articleDateString = newsArticles[i].subHeading.substring(10).trim();

        // remove any st or th from the date that will not convert to a proper date
        // ex: February 21st, 2019 is INVALID, but February 21, 2019 is VALID
        articleDateString = articleDateString.replaceAll("st", "");
        articleDateString = articleDateString.replaceAll("th", "");

        // convert string to a date
        var articleDate = new Date(articleDateString);

        // set the various bounds for competitions (only need one for now)
        var pod5Date  = new Date("2020-08-01");
        let comp = 0;

        // check if date is after pod5 starting date, and set comp # accordingly
        if(articleDate > pod5Date) comp = 5;
        else comp = 4;

        let outerLink = document.createElement("a");
        outerLink.setAttribute('onclick', 'getNewsPosts(' + i + ')');
        let outerDiv = document.createElement("div");
        outerDiv.setAttribute('class', 'news-piece');
        let img = document.createElement("img");
        if (newsArticles[i].imgName != "NONE") {
            img.setAttribute('src', 'images/news/' + newsArticles[i].imgName);
        }
        let contentDiv = document.createElement("div");
        contentDiv.setAttribute('class', 'content');
        let titleDiv = document.createElement("div");
        titleDiv.setAttribute('class', 'title');
        titleDiv.innerHTML = "<h3>" + newsArticles[i].title + "</h3>";
        let subHeadingDiv = document.createElement("div");
        subHeadingDiv.setAttribute('class', 'posted-date');
        subHeadingDiv.innerHTML = "<i>" + newsArticles[i].subHeading + "</i>";
        let innerLink = document.createElement("div");
        innerLink.setAttribute('class', 'standalone-news-link');
        innerLink.innerHTML = '<a href="" onclick="getNewsPosts(' +  i  +  ' >Click here to find out more</a>';

        outerLink.appendChild(outerDiv);
        outerDiv.appendChild(img);
        outerDiv.appendChild(contentDiv);
        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(subHeadingDiv);
        contentDiv.appendChild(innerLink);

        var insertion = "";

        // Set insertion point to  the collapsible if from pod4, or into standard 
        // insertion area if not. Need to expand this out when news articles from 
        // other comps get added as well
        if (comp == 4)  insertion = document.getElementById("pod4Collapsible");
        else if (comp == 5)  insertion = document.getElementById("insert");

        // insert the data
        insertion.insertBefore(outerLink, insertion.childNodes[0]);

    }
}

function renderArticle(newsArticles, i) {
    let outerDiv = document.createElement("div");
    outerDiv.setAttribute('class', 'news-piece');
    let img = document.createElement("img");
    img.setAttribute('id', 'articleImg');
    img.setAttribute('src', 'images/news/' + newsArticles[i].imgName);
    let contentDiv = document.createElement("div");
    contentDiv.setAttribute('class', 'content');
    let titleDiv = document.createElement("div");
    titleDiv.setAttribute('class', 'title');
    titleDiv.setAttribute('id', 'articleTitle');
    titleDiv.innerHTML = "<h3>" + newsArticles[i].title + "</h3>";
    let subHeadingDiv = document.createElement("div");
    subHeadingDiv.setAttribute('class', 'posted-date');
    subHeadingDiv.setAttribute('id', 'articleSubheading');
    subHeadingDiv.innerHTML = "<i>" + newsArticles[i].subHeading + "</i>";
    let body = document.createElement("p");
    body.setAttribute('id', 'articleBody');
    body.innerHTML = newsArticles[i].body;

    outerDiv.appendChild(img);
    outerDiv.appendChild(contentDiv);
    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(subHeadingDiv);
    contentDiv.appendChild(body);

    var insertion = document.getElementById("insert2");
    insertion.insertBefore(outerDiv, insertion.childNodes[0]);

    scroll(0, 0);
    document.getElementById("articleBody").innerHTML = newsArticles[i].body;
    document.getElementById("default").setAttribute('style', 'display: none;');
    document.getElementById("article").removeAttribute('style');
}

function renderNews() {
    scroll(0, 0);
    document.getElementById("article").setAttribute('style', 'display: none;');
    document.getElementById("default").removeAttribute('style');
}
