const button = document.getElementsByClassName("button");
const moreBtn = document.getElementsByClassName("moreBtn");
const centerIcon2 = document.getElementById("centerIcon2");
const centerIcon = document.getElementById("centerIcon");
const vignette = document.getElementById("vignette");
const topBtn = document.getElementById("topBtn");
const center = document.getElementById("center");
const post = document.getElementById("post");
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

document.querySelectorAll(".moreBtn").forEach(
    el => {
        el.addEventListener("click", evt => {
            if (el.parentElement.parentElement.style.maxHeight != "100vh") {
                el.parentElement.parentElement.style.maxHeight = "100vh";
                el.children[0].style.transform = "rotateZ(0deg)"
            } else {
                el.parentElement.parentElement.style.maxHeight = "50vh";
                el.children[0].style.transform = "rotateZ(180deg)"
            }
        });
    }
);

function checkOverflow(el) {
    var curOverf = el.style.overflow;

    if (!curOverf || curOverf === "visible")
        el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverf;

    return isOverflowing;
}

var rm = []
for (let el of moreBtn) {
    if (!checkOverflow(el.parentElement.parentElement)) {
        rm.push(el)
    }
}
for (let el of rm) {
    el.remove();
}