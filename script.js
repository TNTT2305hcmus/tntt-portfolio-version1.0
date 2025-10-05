const header = document.querySelector("header");
const introduction = document.querySelector("#introduction");
const animationElements = document.querySelectorAll('.show-on-scroll');
const numberCounterUp = document.querySelectorAll('.number');
const heightScreen = window.innerHeight;

let hasCounterAnimated = false;

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
      clearInterval(timer); // FIX: Cần truyền timer vào
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