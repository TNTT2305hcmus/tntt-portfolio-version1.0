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
const heightScreen = window.innerHeight;
let hasCounterAnimated = false;

const projectLinks = {
  "project_portfolio" : "https://github.com/TNTT2305hcmus/Portfolio_Version_v1.0",
  "project_NFTs": "https://github.com/TNTT2305hcmus/React_Lab_freeCodeCamp",
  "project_js_freeCodeCamp" : "https://github.com/TNTT2305hcmus/JS_freeCodeCamp_Project",
  "project_responsive_web_freeCodeCamp" : "https://github.com/TNTT2305hcmus/HTML-CSS_freeCodeCamp_Project"
}


// ==================== CONSTANTS & DATA ====================
const courseName = ["Coursera", "freeCodeCamp"];

const certificationImgArray = [
  {
    linkImg: "JavaScript_Algorithm_and_Data_Structure.png",
    course: courseName[1],
    time: "26.09.2025",
    title: "JavaScript"
  },
  {
    linkImg: "Solidity_Mastery.png",
    course: courseName[0],
    time: "30.10.2025",
    title: "Solidity"
  },
  {
    linkImg: "Responsive_Web_Design.png",
    course: courseName[1],
    time: "29.09.2025",
    title: "Responsive Web Design"
  },
  {
    linkImg: "Foundation_Solidity_Smart_Contract_Development.jpg",
    course: courseName[0],
    time: "10.09.2025",
    title: "Foundation of Solidity"
  },
  {
    linkImg: "Blockchain_Basics.png",
    course: courseName[0],
    time: "10.09.2025",
    title: "Blockchain Basics"
  },
  {
    linkImg: "Blockchain_Platform.png",
    course: courseName[0],
    time: "30.11.2025",
    title: "Blockchain Platform"
  },
  {
    linkImg: "Smart_Contract.jpg",
    course: courseName[0],
    time: "15.11.2025",
    title: "Smart Contract"
  },
  {
    linkImg: "Solidity_Advaned.jpg",
    course: courseName[0],
    time: "25.12.2025",
    title: "Solidity Advanced"
  }
];

// ==================== DOM ELEMENTS ====================
const majorBtn = document.querySelectorAll('.major_btn');
const galleryShowComponent = document.querySelector(".gallery_show");

// ==================== GALLERY TEMPLATES ====================
const initEducationGallery = `
  <div class="certifications">
      <div class="certification">
          <div class="info"><p>University Of Science - VNUHCM</p><p>2023 - 2027</p></div>
          <img src="certification_img/JavaScript_Algorithm_and_Data_Structure.png" alt="Degree">
          <h3>Bachelor of Software Engineering</h3>
      </div>
      <div class="certification">
          <div class="info"><p>Cao Nguyen High School</p><p>2019 - 2022</p></div>
          <img src="certification_img/Solidity_Mastery.png" alt="Award">
          <h3>Valedictorian of School</h3>
      </div>
  </div>
`;

const initActivitiesGallery = `
  <div class="certifications">
      <div class="certification">
          <div class="info"><p>Volunteering of HCMUS</p><p>09.09.2023</p></div>
          <img src="certification_img/JavaScript_Algorithm_and_Data_Structure.png" alt="Volunteer">
          <h3>Member</h3>
      </div>
  </div>
`;

const galleries = {
  education: initEducationGallery,
  certification: 'dynamic', // Đánh dấu để khởi tạo slider
  activities: initActivitiesGallery
};

// ==================== CERTIFICATION SLIDER ====================
let startIndex = 0;
const showCount = 3;
const animationDelay = 5;
let certificationsComponent = null;

/**
 * Cập nhật gallery certifications với animation
 * @param {string} direction - Hướng slide: "left" hoặc "right"
 */
const updateCertificationGallery = (direction = "right") => {
  if (!certificationsComponent) return;

  const currentItems = [];
  for (let i = 0; i < showCount; i++) {
    const index = (startIndex + i) % certificationImgArray.length;
    currentItems.push(certificationImgArray[index]);
  }

  // Clear container
  certificationsComponent.innerHTML = "";

  // Tạo và thêm certification items
  currentItems.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("certification");
    div.classList.add(direction === "left" ? "left-to-right" : "right-to-left");
    
    div.innerHTML = `
      <div class="info"><p>${item.course}</p><p>${item.time}</p></div>
      <img src="certification_img/${item.linkImg}" alt="${item.title}">
      <h3>${item.title}</h3>
    `;
    
    certificationsComponent.appendChild(div);

    // Trigger animation
    setTimeout(() => div.classList.add("start"), 50);
  });
};

/**
 * Khởi tạo certification slider với navigation buttons
 */
function initCertificationSlider() {
  // Tạo container và navigation
  const html = `
    <div class="gallery_show">
      <i class='bx bx-chevron-left slide_Certifcation_Left'></i>
      <div class="certifications"></div>
      <i class='bx bx-chevron-right slide_Certification_Right'></i>
    </div>
  `;
  
  galleryShowComponent.innerHTML = html;

  // Lấy DOM elements
  const left = document.querySelector(".slide_Certifcation_Left");
  const right = document.querySelector(".slide_Certification_Right");
  certificationsComponent = document.querySelector(".certifications");

  if (!left || !right || !certificationsComponent) return;

  // Event listeners cho navigation
  left.addEventListener("click", () => {
    startIndex = (startIndex - 1 + certificationImgArray.length) % certificationImgArray.length;
    updateCertificationGallery("left");
  });

  right.addEventListener("click", () => {
    startIndex = (startIndex + 1) % certificationImgArray.length;
    updateCertificationGallery("right");
  });

  // Hiển thị items đầu tiên
  updateCertificationGallery();
}

// ==================== GALLERY SWITCHING ====================
/**
 * Chuyển đổi giữa các loại gallery
 * @param {Event} e - Click event
 */
const showGallery = (e) => {
  const type = e.target.value;

  if (type === "certification") {
    initCertificationSlider();
  } else {
    galleryShowComponent.innerHTML = galleries[type] || "";
  }
};

// ==================== EVENT LISTENERS ====================
majorBtn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    // Remove active class from all buttons
    majorBtn.forEach(button => button.classList.remove("active"));
    
    // Add active class to clicked button
    btn.classList.add("active");
    
    // Show corresponding gallery
    showGallery(e);
  });
});

// ==================== INITIALIZATION ====================
// Hiển thị education gallery mặc định khi load trang
window.addEventListener('DOMContentLoaded', () => {
  galleryShowComponent.innerHTML = initEducationGallery;
});


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
  let srcIndex = currentCommentIndex % 3;
  imgCommentPerson.src = `source_img/avatar${srcIndex}.jpg`;
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
updateComment();