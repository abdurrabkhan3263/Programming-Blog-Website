// HANDELING API OF DEV
import apiHandling from "./api.js";
let pageNum = 1;
let postSection = document.querySelector(".blog-section");
let loadBtn = document.querySelector("#loading-btn");

function postCard(img, title, para, id) {
  let div = document.createElement("div");
  div.classList.add("post-recent");
  div.innerHTML = `
  <div class="post-img"><a href="/article.html#${id}">
  <img class="card-img" src="${img}" alt="img" onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiqNdH4rC5njlxoA0Iwru70QCslWJItVBH2Q&usqp=CAU'">
  </a></div>
            <div class="post-heading">
              <a href="/article.html#${id}"><h2 class="card-heading">${title}</h2></a>
              <p class="card-para">${para}</p>
            </div>
            <button class="main-read-later" id=${id}>Read Later</button>
  `;
  return div;
}

async function addHtml() {
  let apiData = await apiHandling(pageNum, "programming");
  if (apiData !== undefined) {
    apiData.forEach((value) => {
      let post = postCard(
        value.cover_image,
        value.title,
        value.description,
        value.id
      );

      postSection.appendChild(post);
    });
  } else {
    loadBtn.style.display = "none";
  }
}
addHtml();

// ADDING LOAD MORE CODE
let heroSection = document.querySelector(".hero-section");
loadBtn.addEventListener("click", () => {
  pageNum = pageNum + 1;
  addHtml();
});

// HERO SECTION ANIMATION
let hero = document.querySelectorAll(".hero");
let arrowRight = document.querySelector("#right-arrow");
let arrowLeft = document.querySelector("#left-arrow");

function addingInitial(value, index) {
  value.style.transform = `translateX(${index * 100}%)`;
}

hero.forEach((value, index) => {
  addingInitial(value, index);
});

arrowRight.addEventListener("click", function () {
  hero[0].style.transform = `translateX(-100%)`;
  hero[1].style.transform = `translateX(0%)`;
});
arrowLeft.addEventListener("click", function () {
  hero[0].style.transform = `translateX(0%)`;
  hero[1].style.transform = `translateX(100%)`;
});

// ADD READ LATER CODE

function setInlocal(img, name, id) {
  let localData = JSON.parse(localStorage.getItem("ids"));
  if (!localData) {
    localStorage.setItem("ids", JSON.stringify([{ img, name, id }]));
  } else {
    localData.push({ img, name, id });
    localStorage.setItem("ids", JSON.stringify(localData));
  }
}

document.querySelector("body").addEventListener("click", function (e) {
  if (e.target.classList.contains("main-read-later")) {
    let id = e.target.getAttribute("id");
    let parent = e.target.closest("div");
    let img = parent.querySelector(".card-img");
    let heading = parent.querySelector(".card-heading");
    setInlocal(img.src, heading.innerHTML, id);
  }
});
