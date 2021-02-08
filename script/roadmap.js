var soonselector = document.getElementById("soon-type");
var soon = document.getElementById("soon-list");
var featureselector = document.getElementById("feature-type");
var feature = document.getElementById("features-list")

soonselector.onchange = function() {
    readTextFile();
}

featureselector.onchange = function() {
    readTextFile();
}

window.onload = function() {
    readTextFile();
}

function readTextFile() {
    soon.innerHTML = "";
    feature.innerHTML = "";
    var rawFile = new XMLHttpRequest();
    var rawFile2 = new XMLHttpRequest();
    rawFile.open("GET", "../text/soon/" + soonselector.value + ".txt", false);
    rawFile2.open("GET", "../text/feature/" + featureselector.value + ".txt", false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4)
        {
            var text = rawFile.responseText.split("/n");
            for (var i = 0; i < text.length; i++) {
                soon.innerHTML = soon.innerHTML + (i+1) + "." + text[i] + "<br><br>";
            }
        }
    }
    rawFile2.onreadystatechange = function () {
        if(rawFile2.readyState === 4)
        {
            var text = rawFile2.responseText.split("/n");
            for (var i = 0; i < text.length; i++) {
                feature.innerHTML = feature.innerHTML + (i+1) + "." + text[i] + "<br><br>";
            }
        }
    }
    rawFile.send(null);
    rawFile2.send(null);
}