var selector = document.getElementById("feature-type");
var features = document.getElementById("features-list");

selector.onchange = function() {
    readTextFile();
}

window.onload = function() {
    readTextFile();
}

function readTextFile() {
    features.innerHTML = "";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "../text/" + selector.value + ".txt", false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4)
        {
            var text = rawFile.responseText.split("/n");
            for (var i = 0; i < text.length; i++) {
                features.innerHTML = features.innerHTML + text[i] + "<br><br>";
            }
        }
    }
    rawFile.send(null);
}