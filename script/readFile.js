var count = 0;
var elements;

input.onchange = async function () {
    const file = input.files[0]
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(await file.text(), 'text/html');
    elements = htmlDoc.getElementsByTagName("a")
    counter.innerText = count + "/" + elements.length;
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        let mod = await Mod(el)
        body.appendChild(mod)
    }
}

async function checkModrinth(slug) {
    let req = new Request("https://api.modrinth.com/v2/project/" + slug);
    return fetch(req)
        .then(async (response) => {
            if (response.status == 404) {
                return;
            } else {
                count++;
                counter.innerText = count + "/" + elements.length;
                return "https://modrinth.com/mod/" + slug;
            }
        })
}

function createDataCell(text, link) {
    let el = document.createElement("a");
    el.href = link;
    el.target = "_blank";
    el.innerText = text;
    if (text == undefined) {
        el.removeAttribute("href")
        el.removeAttribute("target")
        el.innerText = "No";
    } else if (link == undefined) {
        el.removeAttribute("href")
        el.removeAttribute("target")
        el.innerText = text;
    }
    let dataCell = document.createElement("td");
    dataCell.appendChild(el);
    return dataCell;
}

var Mod = async function (el) {
    var mod = {};

    mod.slug = el.href.slice(45);
    mod.name = el.innerText;
    mod.linkrinth = "https://modrinth.com/mod/" + mod.slug;
    mod.curselink = "https://www.curseforge.com/minecraft/mc-mods/" + mod.slug;

    let modrow = document.createElement("tr");
    modrow.appendChild(createDataCell(mod.name, null))
    modrow.appendChild(createDataCell(await checkModrinth(mod.slug), mod.linkrinth))
    modrow.appendChild(createDataCell(mod.curselink, mod.curselink))
    return modrow;
};