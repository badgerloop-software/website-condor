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

        var insertion = document.getElementById("insert");
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
