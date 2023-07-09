const API_KEY = "b258e3ef1a1a4ccb9eb2706ff146cc95";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()  => fetchData("Pakistan"));

async function fetchData(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";
    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Karachi",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchData(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("submit-btn");
const searchBar = document.getElementById("search-bar");

searchButton.addEventListener("click", () => {
    const query = searchBar.value;
    if (!query) return;
    fetchData(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

const navToogle = document.getElementById("nav-toogle");
const containerToogle = document.getElementById("link-container");
navToogle.addEventListener('click', (element) =>{
    containerToogle.classList.toggle('active1');
});