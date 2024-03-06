const headingImage = document.querySelector('#heading-img');
const fragment = window.location.hash;
const id = fragment.substring(1);


// 1778093
let mainHeading = document.querySelector('.Heading');

function article(){
  fetch(`https://dev.to/api/articles/${id}`)
  .then(res => res.json())
  .then(data => {
    let value = data.body_html;
    let path = document.querySelector('.article-section');
    headingImage.setAttribute("src" , data.cover_image)
    mainHeading.innerHTML = data.title;
    path.innerHTML = value;
  })
  .catch(error => console.log(error))
}
article();

// CODE SECTION CODE
function addCoding(parent,data){
  let pre = document.querySelector('.pre-code-full');
  let code = document.createElement('code');
  if(!pre.innerHTML == ''){
    pre.innerHTML = '';
  }
  code.innerHTML = data;
  pre.appendChild(code);
}



const body = document.querySelector('body');
let fullScreenC = document.querySelector('.code-fullScreen');
body.addEventListener('click' , (event)=>{
  if(event.target.classList.contains('highlight__panel-action')){
    // ADDING CODE IN FULL SCREEN SECTION START
    let parent = event.target.parentElement.parentNode;
    let code = parent.querySelector('code');
    addCoding(fullScreenC,code.innerHTML);
    window.scrollTo({
      top : 0,
    })
    // ADDING CODE IN FULL SCREEN SECTION END
    
    gsap.to(fullScreenC , {
      scale : 1,
      opacity : 1,
    })
    
  }
})

// MAXIMIZE FULL SCREEN PANEL
const fullScreenBtn = document.querySelector('.fullScreen-btn');
fullScreenBtn.addEventListener('click' , ()=>{
  gsap.to(".code-fullScreen" , {
    scale : 0,
    opacity : 0,
  })
})