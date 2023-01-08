async function addMovie() {
    let title = document.getElementById("title").value;
    let time = document.getElementById("time").value;
    let year = document.getElementById("year").value;
    let text = document.getElementById("text").value;
    let url = document.getElementById("url").value;
    let type = ""
    // let type = document.getElementById("type").value;
    let  moviesTypes = document.querySelectorAll('.options_movies');
    for (let i = 0; i < moviesTypes.length; i++) {
        if (moviesTypes[i].checked === true){
            type += moviesTypes[i].value
            type += ", "
        }
    }
    if (type.length !== 0){
        type = type.slice(0,-2)
    }

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

const checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (checkList.classList.contains('visible'))
        checkList.classList.remove('visible');
    else
        checkList.classList.add('visible');
}