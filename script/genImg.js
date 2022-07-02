const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const project = urlParams.get("p");

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var color;
    var img = new Image();
    img.crossOrigin = "Anonymous";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://api.modrinth.com/v2/project/" + project, true);
    xhr.onload = function () {
        img.src = JSON.parse(xhr.response).icon_url;
        img.onload = function () {
            const context = document.createElement('canvas').getContext('2d');
            context.drawImage(img, 0, 0);
            const {
                data
            } = context.getImageData(10, 10, 1, 1);
            color = "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, (canvas.width / 2) - (canvas.height / 2) / 2, (canvas.height / 2) - (canvas.height / 2) / 2, canvas.height / 2, canvas.height / 2);

            var img2 = new Image();
            img2.src = "https://raw.githubusercontent.com/QuiltMC/art/master/brand/4096png/quilt_powered_dark.png";
            img2.onload = function () {
                var x = 30;
                ctx.drawImage(img2, canvas.width - (img2.width / x) - 5, canvas.height - (img2.height / x) - 5, img2.width / x, img2.height / x);
            }

            var img3 = new Image();
            img3.src = "https://raw.githubusercontent.com/Prospector/badges/master/modrinth-badge-72h-padded.png";
            img3.onload = function () {
                var x = 1.5;
                ctx.drawImage(img3, 0, canvas.height - 0 - (img3.height / x), img3.width / x, img3.height / x);
            }
        }
    };
    xhr.send();
}

resizeCanvas();