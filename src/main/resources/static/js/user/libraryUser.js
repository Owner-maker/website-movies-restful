document.addEventListener('click', ({ target: t }) => {
    if (t.tagName === 'INPUT' && t.disabled===false) {
        if(localStorage.getItem("library") !=null){
            let library = JSON.parse(localStorage.getItem("library"));
            for(let i=0;i<library.length;i++){
                if(library[i] + ""=== t.alt){
                    library.splice(i,1);
                }
            }
            localStorage.setItem("library",JSON.stringify(library));
        }

        t.style.backgroundColor = "red"
        t.value = "Removed";
        t.disabled = true;
    }
});



document.addEventListener("DOMContentLoaded", async function() {

    if(localStorage.getItem("library")!== null){
        let library = JSON.parse(localStorage.getItem("library"));

        let token = 'Bearer ' + localStorage.getItem('token');

        let response = await fetch('http://localhost:8080/movies/allmovies', {
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
            let filtered = [];

            let b=0;
            while(b<library.length){
                for (let i=0;i<result.length;i++){
                    if("" + result[i].id === library[b]){
                        filtered.push(result[i])
                    }
                }
                b++;
            }

            let cont = document.getElementById("container");
            let block1 = document.createElement("div");
            block1.classList.add("card-columns","my-3");
            if(filtered.length!=0){
                filtered.forEach(elem => {
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
                    let p1 = document.createElement("p");
                    p1.classList.add("card-text");
                    p1.innerText = elem.type;
                    block3.appendChild(p1);
                    let p2 = document.createElement("p");
                    p2.classList.add("card-text");
                    p2.innerText = elem.year + ", " + elem.time + " min";
                    block3.appendChild(p2);
                    let p3 = document.createElement("p");
                    p3.classList.add("card-text");
                    p3.innerText = "Director: " + elem.director.name + " " + elem.director.sername;
                    block3.appendChild(p3);
                    let p4 = document.createElement("p");
                    p4.classList.add("card-text");
                    p4.innerText = "" + elem.text;
                    block3.appendChild(p4);
                    let block4 = document.createElement("div");
                    block4.classList.add("card-footer", "text-center");
                    let input = document.createElement("input");
                    input.value = "Remove";
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
                h.innerText = "There aren't any movies in your library";
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
            h.innerText = "Failed to load your library";
            block3.appendChild(h);
            block2.appendChild(block3);
            block1.appendChild(block2);
            cont.appendChild(block1);


        }
    }
});



