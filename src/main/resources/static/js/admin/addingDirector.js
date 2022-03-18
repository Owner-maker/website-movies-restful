async function addDirector() {
    let name = document.getElementById("name").value;
    let sername = document.getElementById("sername").value;
    let description = document.getElementById("description").value;
    let url = document.getElementById("url").value;

    if(name!=="" && sername!=="" && description!=="" && url!==""){
        let director = {
            name : name,
            sername : sername,
            url : url,
            description : description
        }

        let token = 'Bearer ' + localStorage.getItem('token');
        let response = await fetch('http://localhost:8080/movies/adddirector', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(director)
        })

        if (response.ok) {
            document.getElementById("message").innerText = "Director " + name + " " + sername + " was succesfully added";
            document.getElementById("name").value = "";
            document.getElementById("sername").value =  "";
            document.getElementById("url").value =  "";
            document.getElementById("description").value =  "";
        }
        else{
            document.getElementById("message").value = "Director " + name + " " + sername + " wasn't added. Check the fields.";
        }
    }
}