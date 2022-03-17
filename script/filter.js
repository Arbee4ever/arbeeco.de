const postCategory = document.getElementsByClassName("postCategory");

for (let i = 0; i < postCategory.length; i++) {
    const element = postCategory[i];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("c") && element.firstChild.textContent != urlParams.get("c")) {
        element.parentNode.style.display = "none";
    }
}