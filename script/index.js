const button = document.getElementsByClassName("button");
var state = 1;

function toggleHide() {
    center.classList.toggle("bigger");
    for (let x = 0; x < button.length; x++) {
        if (state == 1) {
            const element = button[x];
            element.classList.toggle("hide");
            state = 0;
        } else {
            const element = button[x];
            element.classList.toggle("hide");
            state = 1;
        }
    }
    centerIcon2.classList.toggle("hide");
    centerIcon.classList.toggle("hide");
    setTimeout(function () {
        for (let x = 0; x < button.length; x++) {
            const element = button[x];
            element.classList.toggle("unclickable");
            console.log(element);
        }
    }, 400)
}

center.onmouseenter = function () {
    toggleHide();
}

center.onmouseleave = function () {
    toggleHide();
}

const posts = document.getElementsByClassName("post");
for (let i = 0; i < posts.length; i++) {
    const element = posts[i];
    element.classList.toggle("hidePost");
}

var num = 3;
postHandler(num);

function moreLink() {
    if (num != 9 && num < posts.length) {
        num = num + 3;
        postHandler(num);
    } else {
        window.open("/blog", "_self")
    }
}

function postHandler(num) {
    for (let i = 0; i < num; i++) {
        const element = posts[i];
        if (element != null) {
            if (element.classList.contains("hidePost")) {
                element.classList.toggle("hidePost");
            }
        }
    }
}