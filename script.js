const header = document.querySelector("header");
const introduction = document.querySelector("#introduction");
const contactBtn = document.getElementById("contact-button");
const contactForm = document.getElementById("contact");
const animationElements = document.querySelectorAll('.show-on-scroll');
const numberCounterUp = document.querySelectorAll('.number');
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const relationship = document.querySelector("#relationship");
const givenMessage = document.querySelector("#given_msg");

const imgCommentPerson = document.querySelector(".content_recommend img");
const quoteCommentMessage = document.querySelector(".detail_commend blockquote");
const commentRoler = document.querySelector(".detail_commend h4");
const commentName = document.querySelector(".detail_commend p");

const slideCommentIconLeft = document.querySelector(".slide_icon .left");
const slideCommentIconRight = document.querySelector(".slide_icon .right");

const commentArray = JSON.parse(localStorage.getItem("data")) || [];
let currentForm = {};
let currentCommentIndex = 0;


// ------------------------- VALIDATION -------------------------
const checkValidEmail = (emailInput) => {
  const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const emailTrim = emailInput.value.trim();
  return regexEmail.test(emailTrim);
};

const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '');
};


// ------------------------- FORM HANDLER -------------------------
const addOrUpdate = (e) => {
  e.preventDefault();

  if (!userName.value.trim()) {
    alert("You need to provide your name!");
    return;
  }

  if (!checkValidEmail(email)) {
    alert("Please check your email. It's the only way that we can be connected.");
    return;
  }

  currentForm = {
    id: `${removeSpecialChars(userName.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
    userName: removeSpecialChars(userName.value),
    email: removeSpecialChars(email.value),
    relationship: removeSpecialChars(relationship.value),
    message: givenMessage.value.trim()
  };

  commentArray.push(currentForm);
  localStorage.setItem("data", JSON.stringify(commentArray));
  resetForm();
  updateComment();
};


const resetForm = () => {
  userName.value = "";
  email.value = "";
  givenMessage.value = "";
  relationship.value = "";
  currentForm = {};
};


// ------------------------- UPDATE COMMENT DISPLAY -------------------------
const updateComment = () => {
  if (commentArray.length === 0) return;

  const current = commentArray[currentCommentIndex];
  imgCommentPerson.src =
    currentCommentIndex % 2 === 0
      ? "source_img/avatar1.jpg"
      : "source_img/avatar3.jpg";
  quoteCommentMessage.innerHTML = `
    <i class='bx bxs-quote-left'></i>
    ${current.message}
    <i class='bx bxs-quote-right'></i>
  `;
  commentRoler.textContent = current.relationship;
  commentName.textContent = current.userName;
};


// ------------------------- SLIDE EVENTS -------------------------
slideCommentIconLeft.addEventListener("click", () => {
  if (commentArray.length === 0) return;
  currentCommentIndex = currentCommentIndex === 0 ? commentArray.length - 1 : currentCommentIndex - 1;
  updateComment();
});

slideCommentIconRight.addEventListener("click", () => {
  if (commentArray.length === 0) return;
  currentCommentIndex = currentCommentIndex === commentArray.length - 1 ? 0 : currentCommentIndex + 1;
  updateComment();
});

document.querySelector(".contact_form form").addEventListener("submit", addOrUpdate);

updateComment();



const heightScreen = window.innerHeight;
let hasCounterAnimated = false;

const projectLinks = {
  "project_portfolio" : "https://github.com/TNTT2305hcmus/Portfolio_Version_v1.0",
  "project_NFTs": "https://github.com/TNTT2305hcmus/React_Lab_freeCodeCamp",
  "project_js_freeCodeCamp" : "https://github.com/TNTT2305hcmus/JS_freeCodeCamp_Project",
  "project_responsive_web_freeCodeCamp" : "https://github.com/TNTT2305hcmus/HTML-CSS_freeCodeCamp_Project"
}

// Add event to button
contactBtn.addEventListener("click", () => {
  contactForm.scrollIntoView({
    behavior: "smooth"
  }); 
});

function viewGithub(){
  Object.keys(projectLinks).forEach(buttonID => {
    document.getElementById(`${buttonID}`).addEventListener("click", () => {
      window.open(projectLinks[buttonID], "_blank");
    })
  })
}

// Toggle animation for elements when they come into view
function toggleAnimationElementIntoWindow(element) {
  const rect = element.getBoundingClientRect();
  
  if (!(rect.bottom < 0 || rect.top > heightScreen)) {
    element.classList.add('start');
  }
}

// Check all animation elements
function checkAnimation() {
  animationElements.forEach(toggleAnimationElementIntoWindow);
}

// Counter animation
function counter(el) {
  const numberEl = el.querySelector('.count-up');
  const text = numberEl.childNodes[0].textContent.trim();
  const to = parseInt(text);
  const duration = 2000;
  const increment = to / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= to) {
      numberEl.childNodes[0].textContent = `${to}`;
      clearInterval(timer);
    } else {
      numberEl.childNodes[0].textContent = `${Math.floor(current)}`;
    }
  }, 16);
}

// Trigger counter animation when introduction section is visible
function checkCounterAnimation() {
  if (hasCounterAnimated) return;
  
  const rect = introduction.getBoundingClientRect();
  if (!(rect.bottom < 0 || rect.top > heightScreen)) {
    numberCounterUp.forEach(counter);
    hasCounterAnimated = true;
  }
}

// Handle scroll events
function handleScroll() {
  // Header scroll effect
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  
  // Animation checks
  checkAnimation();
  checkCounterAnimation();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Event listeners
window.addEventListener("scroll", handleScroll);

// Initial check on page load
checkAnimation();
viewGithub();