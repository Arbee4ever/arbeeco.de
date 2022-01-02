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

function showContact() {
	if (state == 0 || state == 1) {
		var id = null;
		switch (state) {
			case 1:
				mainbutton.style.opacity = 0.1;
				for (let x = 0; x < button.length; x++) {
					const element = button[x];
					element.style.opacity = 1;
					element.style.zIndex = 1;
				}

				description.style.opacity = 0;
				mainbutton.style.animationPlayState = "paused";
				mainbutton.style.zIndex = -1;
				state = 0;
				break;

			case 0:
				mainbutton.style.opacity = 1;
				for (let x = 0; x < button.length; x++) {
					const element = button[x];
					element.style.opacity = 0;
					element.style.zIndex = -1;
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

function slide() {
	main.classList.toggle("hide");
	projects.classList.toggle("hide");
}