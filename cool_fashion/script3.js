//hamburgar meny för telefon
function toggleMenu() {
    var x = document.getElementById("link-container");

    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}