const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const project = urlParams.get("p");

fetch("https://api.modrinth.com/v2/project/" + project, {
    Accept: "application/json",
    method: "GET",
    "User-Agent": "https://github.com/Arbee4ever/arbee4ever.github.io (arbeeco.de)"
})
    .then(response => {
        return response.json();
    })
    .then(data2 => {
        modimg.crossOrigin = "Anonymous";
        modimg.src = data2.icon_url;
        modimg.onload = function() {
            var color;
            const context = document.createElement('canvas').getContext('2d');
            context.drawImage(modimg, 1, 1, 10, 10);
            console.log(context.getImageData(1, 1, 1, 1));
            const {
                data
            } = context.getImageData(10, 10, 1, 1);
            color = "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";

            console.log(color);
            document.body.style.backgroundColor = color;
        }
    });