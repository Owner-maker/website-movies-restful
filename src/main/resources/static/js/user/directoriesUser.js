document.addEventListener('click', ({ target: t }) => {
    if (t.tagName === 'INPUT') {
            localStorage.setItem("DirectorIdToSeeMovies",t.alt);
            window.location.href = "http://localhost:8080/html/user/directorMovies.html";
    }
});


document.addEventListener("DOMContentLoaded", async function() {

    let token = 'Bearer ' + localStorage.getItem('token');

    let response = await fetch('http://localhost:8080/movies/alldirects', {
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
        let result = await response.json();


        let cont = document.getElementById("container");
        let block1 = document.createElement("div");
        block1.classList.add("card-columns","my-3");
        if(result.length!=0){
            result.forEach(elem => {
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
                let input = document.createElement("input");
                input.value = "Movies";
                input.alt = "" +elem.id;
                input.classList.add("btn","float-center", "login_btn");
                block4.appendChild(input);



                block2.appendChild(img);
                block2.appendChild(block3);
                block2.appendChild(block4);

                block1.appendChild(block2);
                cont.appendChild(block1);
            });
        }else{
            let block2 = document.createElement("div");
            block2.classList.add("card");
            let block3 = document.createElement("div");
            block3.classList.add("card-body");

            let h = document.createElement("h2");
            h.classList.add("card-title");
            h.innerText = "No directors added yet";
            block3.appendChild(h);
            block2.appendChild(block3);
            block1.appendChild(block2);
            cont.appendChild(block1);
        }

    }
    else{
        let cont = document.getElementById("container");
        let block1 = document.createElement("div");
        block1.classList.add("card-columns","my-1");
        let block2 = document.createElement("div");
        block2.classList.add("card");
        let block3 = document.createElement("div");
        block3.classList.add("card-body");

        let h = document.createElement("h2");
        h.classList.add("card-title");
        h.innerText = "Failed to load directories";
        block3.appendChild(h);
        block2.appendChild(block3);
        block1.appendChild(block2);
        cont.appendChild(block1);


    }



});