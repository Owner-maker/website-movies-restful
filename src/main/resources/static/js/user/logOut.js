function logout(){
    localStorage.setItem("username","");
    localStorage.setItem("name","");
    localStorage.setItem("sername","");
    localStorage.setItem("email","");
    localStorage.setItem("token","");

    window.location.href = "http://localhost:8080/index.html";
}