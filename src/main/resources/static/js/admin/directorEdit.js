document.addEventListener("DOMContentLoaded", async function() {


    if(localStorage.getItem("editingFilmId")!==null) {
        let token = 'Bearer ' + localStorage.getItem('token');
        let response = await fetch('http://localhost:8080/movies/getdirector/'+localStorage.getItem("editingDirectorId"), {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        if(response.ok){
            let elem = await response.json();
            document.getElementById("name").value = elem.name;
            document.getElementById("sername").value = elem.sername;
            document.getElementById("description").value = elem.description;
            document.getElementById("url").value = elem.url;
            let cont = document.getElementById("container");
            let block1 = document.createElement("div");

            let block2 = document.createElement("div");
            block2.classList.add("card");
            let img = document.createElement("img");
            img.classList.add("card-img-top");
            img.src = elem.url;
            let block3 = document.createElement("div");
            block3.classList.add("card-body");
            let h = document.createElement("h4");
            h.classList.add("card-title");
            h.innerText = elem.name + " " + elem.sername;
            block3.appendChild(h);
            let p1 = document.createElement("p");
            p1.classList.add("card-text");
            p1.innerText = elem.description;
            block3.appendChild(p1);

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

async function updateDirector() {
    let name = document.getElementById("name").value;
    let sername = document.getElementById("sername").value;
    let description = document.getElementById("description").value;
    let url = document.getElementById("url").value;

    let director = {
        Id : localStorage.getItem("editingDirectorId"),
        name : name,
        sername : sername,
        description : description,
        url : url
    }

    let token = 'Bearer ' + localStorage.getItem('token');
    let response = await fetch('http://localhost:8080/movies/updatedirector/' + director.Id, {
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
        window.location.href = window.location.href;
    }
}



