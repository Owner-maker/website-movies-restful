document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("username").innerText = localStorage.getItem("username");
    document.getElementById("name").innerText = localStorage.getItem("name");
    document.getElementById("sername").innerText = localStorage.getItem("sername");
    document.getElementById("email").innerText = localStorage.getItem("email");
});
