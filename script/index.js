const mainbutton = document.getElementById("mainbutton");
const buttons = document.getElementById("buttons");
const description = document.getElementById("description");
const button = document.getElementsByClassName("button");
const content = document.getElementById("content");
const projects = document.getElementById("projects");
var root = document.documentElement;
var index = 0;
var state = 1;

mainbutton.onclick = function() {
	if(state == 0 || state == 1) {
		var id = null;
		switch (state) {
			case 1:
				mainbutton.style.zIndex = -1;
				id = setInterval(() => {
					if(index <= 1) {
						state = 0.5;
						index = index + 0.01;
						if(1-index >= 0.2) {
							mainbutton.style.opacity = 1-index;
						}
						description.style.opacity = 1-index;
						for (let x = 0; x < button.length; x++) {
							const element = button[x];
							element.style.opacity = index;
							element.style.zIndex = 1;
						}
					} else {
						mainbutton.style.animationPlayState = "paused";
						state = 0;
						clearInterval(id);
					}
				}, 1)
				break;
			
			case 0:
				id = setInterval(() => {
					if(index >= 0) {
						state = 0.5;
						index = index - 0.01;
						mainbutton.style.opacity = 1-index;
						description.style.opacity = 1-index;
						for (let x = 0; x < button.length; x++) {
							const element = button[x];
							element.style.opacity = index;	
							element.style.zIndex = -1;
						}
					} else {
						mainbutton.style.animationPlayState = "running";
						mainbutton.style.zIndex = 1;
						state = 1;
						clearInterval(id);
					}
				}, 1)
				break;

			default:
				alert("Something went wrong! Please report this to Arbee!")
				break;
		}
	}
}

//This may be used in the Future and is just here as a reminder.
/*projects.onclick = function() {
	mainbutton.style.animation = "flip 1s";
}

let scroll = 0;
document.addEventListener("wheel", function (e) {
	scroll = (scroll - e.deltaY/10)%360;
	root.style.setProperty("--animation-rotation", "rotateX(" + scroll + "deg)");
	if(Math.abs(scroll) < 90 || Math.abs(scroll) > 270) {
		mainbutton.src = "img/Logo.png";
	} else {
		mainbutton.src = "img/TwitterLogo.svg";
	}
}, true);*/