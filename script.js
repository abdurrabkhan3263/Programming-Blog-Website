// HANDELING API OF DEV
import apiHandling from "./api.js";
let pageNum = 1;
let postSection = document.querySelector(".blog-section");

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

async function addHtml() {
  let apiData = await apiHandling(pageNum, "programming");

  apiData.forEach((value) => {
    let post = postCard(
      value.cover_image,
      value.title,
      value.description,
      value.id
    );

    postSection.appendChild(post);
  });
}
addHtml();

// ADDING LOAD MORE CODE
let loadBtn = document.querySelector("#loading-btn");

loadBtn.addEventListener("click", () => {
  pageNum = pageNum + 1;
  addHtml();
});
