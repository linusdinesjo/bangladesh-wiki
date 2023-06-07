// Boolean to be toggeled in toggleDark()
var darkMode = false;

function toggleDark() {
  /**
   * Toggles website between light mode and dark mode
   */
  const body = document.getElementsByTagName("body")[0];
  const main = document.getElementsByTagName("main")[0];
  const footer = document.getElementsByTagName("footer")[0];

  // Elements of the colour mode button
  const colorModeText = document.getElementById("colorModeText");
  const colorModeIcon = document.getElementById("colorModeIcon");

  // Elements with border-colours
  const authorList = document.getElementsByClassName("author-list")[0];
  const sideImgContainer = document.getElementsByClassName("side-img-container")[0];
  const wideImgContainer = document.getElementsByClassName("wide-img-container")[0];

  // Toggles class of 'dark-mode' for main container
  main.classList.toggle("dark-mode");

  if (!darkMode) {
    // MAKE IT DARK
    colorModeText.innerHTML = "Light Mode";
    colorModeIcon.src = "imgs/sun-solid.svg";

    // Border colours
    if (typeof authorList !== "undefined") {
      /* Ensure that element exists before styling, avoid errors
      One page does not contain a wide image container */
      authorList.style.borderColor = "#ffffff";
    }
    if (typeof sideImgContainer !== "undefined") {
      sideImgContainer.style.borderColor = "#ffffff";
    }
    if (typeof wideImgContainer !== "undefined") {

      wideImgContainer.style.borderColor = "#ffffff";
    }

    footer.style.backgroundColor = "#111111";
    body.style.backgroundImage = 'url("imgs/cover-dim.jpg")';

    darkMode = true;
  } else {
    // MAKE IT LIGHT

    colorModeText.innerHTML = "Dark Mode";
    colorModeIcon.src = "imgs/moon-solid.svg";

    // Border colours
    if (typeof authorList !== "undefined") {
      authorList.style.borderColor = "#000000";
    }
    if (typeof sideImgContainer !== "undefined") {
      sideImgContainer.style.borderColor = "#000000";
    }
    if (typeof wideImgContainer !== "undefined") {
      wideImgContainer.style.borderColor = "#000000";
    }

    footer.style.backgroundColor = "#d8d8d8";
    body.style.backgroundImage = 'url("imgs/cover.jpg")';

    darkMode = false;
  }
}


var slideIndex = 0;
const dots = document.getElementsByClassName("dot");
const slides = document.getElementsByClassName("gallery-img-container");
const slidesLen = slides.length; // Faster to store this once than to check every time
const slideShowContainer = document.getElementsByClassName("slideshow-container")[0];
slideShowContainer.addEventListener("click", function () {
  // Click image for next slide
  nextSlide();
})

function showSlide(n) {
  if (n > slides.length) {
    n = 1;
  }
  if (n < 0) {
    n = slides.length;
  }

  // Resets display and class properies
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Changes display and class for active image and dot
  slides[n].style.display = "block";
  dots[n].classList.toggle("active");
}


function nextSlide() {
  slideIndex++;
  if (slideIndex + 1 > slidesLen) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

function previousSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slidesLen - 1;
  }
  showSlide(slideIndex);
}


// Automatic slide change
setInterval(() => {
  /**
   * Automatically changes slide if user doesn't hover over the image
   */
  if (!slides[slideIndex].matches(":hover")) {
    if (slideIndex >= slidesLen - 1) {
      slideIndex = -1; // ++slideIndex makes this to 0 after an iteration
    }
    showSlide(++slideIndex);
  }
}, 6000);

// Arrows as hotkeys for image change
document.onkeydown = function (e) {
  if (slides[slideIndex].matches(":hover")) {
    switch (e.keyCode) {
      case 37: // Left arrow
        previousSlide();
        break;
      case 39: // Right arrow
        nextSlide();
        break;
    }
  }
}