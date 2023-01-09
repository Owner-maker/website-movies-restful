document.addEventListener("DOMContentLoaded", async function () {


    if (localStorage.getItem("editingFilmId") !== null) {
        let token = 'Bearer ' + localStorage.getItem('token');
        let response = await fetch('http://localhost:8080/movies/getmovie/' + localStorage.getItem("editingFilmId"), {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        if (response.ok) {
            let elem = await response.json();
            document.getElementById("title").value = elem.title;
            document.getElementById("time").value = elem.time;
            document.getElementById("type").value = elem.type;
            document.getElementById("year").value = elem.year;
            document.getElementById("text").value = elem.text;
            document.getElementById("url").value = elem.url;

            let cont = document.getElementById("container");

            let block1 = document.createElement("div");
            block1.classList.add("col");

            let block2 = document.createElement("div");
            block2.classList.add("card");
            let img = document.createElement("img");
            img.classList.add("card-img-top");
            img.src = elem.url;
            let block3 = document.createElement("div");
            block3.classList.add("card-body");
            let h = document.createElement("h4");
            h.classList.add("card-title");
            h.innerText = elem.title;
            block3.appendChild(h);
            let p0 = document.createElement("p");
            p0.classList.add("card-text");
            p0.innerText = "ID: " + localStorage.getItem("editingFilmId");
            block3.appendChild(p0);

            let p1 = document.createElement("p");
            p1.classList.add("card-text");
            p1.innerText = elem.type;
            block3.appendChild(p1);
            let p2 = document.createElement("p");
            p2.classList.add("card-text");
            p2.innerText = elem.year + ", " + elem.time + " min";
            block3.appendChild(p2);
            if (elem.director != null) {
                let p3 = document.createElement("p");
                p3.classList.add("card-text");
                p3.innerText = "Director: " + elem.director;
                block3.appendChild(p3);
            }
            let p4 = document.createElement("p");
            p4.classList.add("card-text");
            p4.innerText = "" + elem.text;
            block3.appendChild(p4);
            let block4 = document.createElement("div");
            block4.classList.add("card-footer", "text-center");

            block2.appendChild(img);
            block2.appendChild(block3);
            block2.appendChild(block4);
            block1.appendChild(block2);
            cont.appendChild(block1);


        } else {
            let cont = document.getElementById("container");
            let block1 = document.createElement("div");
            block1.classList.add("card-columns", "my-1");
            let block2 = document.createElement("div");
            block2.classList.add("card");
            let block3 = document.createElement("div");
            block3.classList.add("card-body");

            let h = document.createElement("h2");
            h.classList.add("card-title");
            h.innerText = "Failed to load movie";
            block3.appendChild(h);
            block2.appendChild(block3);
            block1.appendChild(block2);
            cont.appendChild(block1);


        }

    }

});

async function updateMovie() {
    let title = document.getElementById("title").value;
    let time = document.getElementById("time").value;
    let type = document.getElementById("type").value;
    let year = document.getElementById("year").value;
    let text = document.getElementById("text").value;
    let url = document.getElementById("url").value;

    if (title !== "" && time !== "" && type !== "" && year !== "" && text !== "" && url !== "") {

        let movie = {
            Id: localStorage.getItem("editingFilmId"),
            title: title,
            time: time,
            type: type,
            year: year,
            text: text,
            url: url
        }

        let token = 'Bearer ' + localStorage.getItem('token');
        let response = await fetch('http://localhost:8080/movies/updatemovie/' + localStorage.getItem("editingFilmId"), {
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
            window.location.href = window.location.href;
        }
    }
}



