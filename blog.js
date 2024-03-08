import apiHandling from "./api.js";

// MAKING OUR OWEN METHOD
String.prototype.removeSpace = function () {
  let value = "";
  for (let i = 0; i < this.length; i++) {
    if (this[i] == " ") {
      continue;
    }
    value = value + this[i];
  }
  return value;
};

let pageNum = 1;
let title = "javascript";
let postSection = document.querySelector(".blog-section");
let data;
let loadingBtn = document.querySelector("#loading-btn");

async function getData(page, title) {
  data = await apiHandling(page, title);
  if (data !== undefined) {
    addData(data);
  } else {
    loadingBtn.style.display = "none";
  }
}

function postCard(img, title, para, id) {
  let div = document.createElement("div");
  div.classList.add("post-recent");
  div.innerHTML = `
  <div class="post-img"><img src="${img}" alt="img" onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiqNdH4rC5njlxoA0Iwru70QCslWJItVBH2Q&usqp=CAU'"></div>
            <div class="post-heading">
              <a href="/article.html#${id}"><h2>${title}</h2></a>
              <p>${para}</p>
            </div>
  `;
  return div;
}

const addData = async (value) => {
  let data = await value;
  await data.forEach((value) => {
    let post = postCard(
      value.cover_image,
      value.title,
      value.description,
      value.id
    );

    postSection.appendChild(post);
  });
};

getData(pageNum, title);

let button = document.getElementsByClassName("tag");

Array.from(button).forEach((value, index) => {
  value.addEventListener("click", (e) => {
    e.target.classList.add("clickBtn");
    if (!postSection == "") {
      postSection.innerHTML = "";
    }
    let tagVal = e.target.textContent.toLowerCase();
    title = tagVal.removeSpace();
    getData(pageNum, title);
  });
});

// LOADING MORE BTN CODE
loadingBtn.addEventListener("click", () => {
  pageNum += 1;
  getData(pageNum, title);
});
