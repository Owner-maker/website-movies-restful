async function addMovie() {
    let title = document.getElementById("title").value;
    let time = document.getElementById("time").value;
    let type = document.getElementById("type").value;
    let year = document.getElementById("year").value;
    let text = document.getElementById("text").value;
    let url = document.getElementById("url").value;

    if(title!=="" && time!=="" && type!=="" && year !== "" && text!=="" && url!==""){
        let movie = {
            title : title,
            time : time,
            type : type,
            year : year,
            text : text,
            url : url
        }

        let token = 'Bearer ' + localStorage.getItem('token');
        let response = await fetch('http://localhost:8080/movies/addmovie', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(movie)
        })

        if (response.ok) {
            document.getElementById("message").innerText = "Film " + title + " was succesfully added";
            document.getElementById("title").value = "";
            document.getElementById("time").value =  "";
            document.getElementById("type").value =  "";
            document.getElementById("year").value =  "";
            document.getElementById("text").value =  "";
            document.getElementById("url").value = "";
        }
        else{
            document.getElementById("message").value = "Film " + title + " wasn't added. Check the fields.";
        }
    }
}