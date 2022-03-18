function register() {
    let username = document.getElementById("username").value;
    let name = document.getElementById("name").value;
    let sername = document.getElementById("sername").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = {
        username: username,
        name: name,
        sername: sername,
        email: email,
        password: password
    };
    if(username != "" && name!="" && sername != "" && email !="" && password != "" && password.length >5){
        fetch('http://localhost:8080/movies/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(result => {
                if(result.message.includes("Error")){
                    document.getElementById("message").innerText = result.message;
                }
                else{
                    window.location.href = "http://localhost:8080/index.html";
                }
            })
    }


}