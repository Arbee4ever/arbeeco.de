const button = document.getElementsByClassName("button");
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

window.addEventListener("click", function (e) {
    if (e.target == this.document.getElementById("main")) {
        if (centerIcon.classList.contains("hide")) {
            toggleHide();
            center.classList.toggle("bigger");
        }
    }
});

const posts = document.getElementsByClassName("post");
for (let i = 0; i < posts.length; i++) {
    const element = posts[i];
    element.classList.toggle("hidePost");
}

var num = 3;
postHandler(num);

function moreLink() {
    if (num != 9) {
        num = num + 3;
        postHandler(num);
    } else {
        window.open("/blog", "_self")
    }
}

function postHandler(num) {
    for (let i = 0; i < num; i++) {
        const element = posts[i];
        if (element.classList.contains("hidePost")) {
            element.classList.toggle("hidePost");
        }
    }
}