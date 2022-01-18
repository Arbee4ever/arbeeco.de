const button = document.getElementsByClassName("button");
const center = document.getElementById("center");
const centerIcon2 = document.getElementById("centerIcon2");
const centerIcon = document.getElementById("centerIcon");
const vignette = document.getElementById("vignette");
const topBtn = document.getElementById("topBtn");
var state = 1;

centerIcon.onclick = function () { toggleHide() };
centerIcon2.onclick = function () { toggleHide() };

function toggleHide() {
    if (state == 1) {
        for (let x = 0; x < button.length; x++) {
            const element = button[x];
            element.classList.toggle("hide");
            element.style.zIndex = 1;
        }
        state = 0;
    } else {
        for (let x = 0; x < button.length; x++) {
            const element = button[x];
            element.classList.toggle("hide");
            element.style.zIndex = -1;
        }
        state = 1;
    }
    centerIcon2.classList.toggle("hide");
    centerIcon.classList.toggle("hide");
}

center.onmouseenter = function () {
    if (centerIcon2.classList.contains("hide")) {
        center.classList.toggle("bigger");
    }
}

center.onmouseleave = function () {
    if (centerIcon2.classList.contains("hide")) {
        center.classList.toggle("bigger");
    }
}

vignette.onclick = function () {
    if (centerIcon.classList.contains("hide")) {
        toggleHide();
        center.classList.toggle("bigger");
    }
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}