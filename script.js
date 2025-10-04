const header = document.querySelector("header");
var animationElements = document.querySelectorAll('.show-on-scroll');


function toggleAnimationElementIntoWindow(element){
  var rect = element.getClientRects()[0]; // Position of element on window
  var heightScreen = window.innerHeight;

  if(!(rect.bottom < 0 || rect.top > heightScreen)){
    element.classList.add('start');
  } else {
    element.classList.remove("start");
  }
}

function checkAnimation() {
  animationElements.forEach(e => {
    toggleAnimationElementIntoWindow(e);
  })
}

window.onscroll = checkAnimation;


window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});