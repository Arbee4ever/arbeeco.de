const mainbutton = document.getElementById("mainbutton");
const buttons = document.getElementById("buttons");
const description = document.getElementById("description");
const button = document.getElementsByClassName("button");
const main = document.getElementById("main");
const projects = document.getElementById("projects");
const projectsBtn = document.getElementById("projectsBtn");
const back = document.getElementById("back");
var root = document.documentElement;
var index = 0;
var state = 1;

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

async function showContact() {
	if (state == 0 || state == 1) {
		var id = null;
		switch (state) {
			case 1:
				for (i = 0; i < 90; i++) {
					await delay(10);
					state = 0.5;
					index = (i / 100);
					mainbutton.style.opacity = 1 - index;
					description.style.opacity = 1 - index;
					for (let x = 0; x < button.length; x++) {
						const element = button[x];
						element.style.opacity = index;
						element.style.zIndex = 1;
					}
				}

				description.style.opacity = 0;
				mainbutton.style.animationPlayState = "paused";
				mainbutton.style.zIndex = -1;
				state = 0;
				break;

			case 0:
				for (i = 90; i > 0; i--) {
					await delay(10);
					state = 0.5;
					index = (i / 100);
					mainbutton.style.opacity = 1 - index;
					description.style.opacity = 1 - index;
					for (let x = 0; x < button.length; x++) {
						const element = button[x];
						element.style.opacity = index;
						element.style.zIndex = -1;
					}
				}

				description.style.opacity = 1;
				mainbutton.style.animationPlayState = "running";
				mainbutton.style.zIndex = 1;
				state = 1;
				break;

			default:
				alert("Something went wrong! Please report this to Arbee!");
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
	root.style.setProperty("--animation-rotation",
	if(state == 0) {
		showContact();
	}
	} else {
		mainbutton.src = "img/TwitterLogo.svg";
	}
}, true);*/

async function slide() {
	main.classList.toggle("hide");
	projectsBtn.classList.toggle("hide");
	projects.classList.toggle("hide");
	back.classList.toggle("hide");
}