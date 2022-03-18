function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = {
        username: username,
        password: password
    };
    if(username != "" && password != "" && password.length >5) {
        fetch('http://localhost:8080/movies/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(result => {
                if ("error" in result) {
                    document.getElementById("message").innerText = "Incorrect login or password";
                } else {
                    localStorage.setItem("token",result.token);
                    localStorage.setItem("username",result.username);
                    localStorage.setItem("name",result.name);
                    localStorage.setItem("sername",result.sername);
                    localStorage.setItem("email",result.email);


                    if(result.roles.indexOf("ROLE_USER")!=-1){
                        window.location.href = "http://localhost:8080/html/user/account.html";
                    }
                    else if (result.roles.indexOf("ROLE_ADMIN")!=-1){
                        window.location.href = "http://localhost:8080/html/admin/account.html";
                    }

                }
            })
    }

}