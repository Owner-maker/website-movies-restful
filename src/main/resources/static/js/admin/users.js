document.addEventListener('click', ({ target: t }) => {
    if (t.tagName === 'INPUT' && t.disabled===false) {
        if(localStorage.getItem("library") !=null){
            let library = JSON.parse(localStorage.getItem("library"));
            library.push(t.alt);
            localStorage.setItem("library",JSON.stringify(library));
        }
        else{
            let library = [];
            library.push(t.alt);
            localStorage.setItem("library",JSON.stringify(library));
        }

        t.style.backgroundColor = "green"
        t.value = "Added";
        t.disabled = true;
    }
});



document.addEventListener("DOMContentLoaded", async function() {

    let token = 'Bearer ' + localStorage.getItem('token');

    let response = await fetch('http://localhost:8080/movies/allusers', {
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
        block1.classList.add("card-columns","my-4");
        if(result.length!==0){
            result.forEach(elem => {
                let block2 = document.createElement("div");
                block2.classList.add("card");
                let block3 = document.createElement("div");
                block3.classList.add("card-body");
                let h = document.createElement("h4");
                h.classList.add("card-title");
                h.innerText = elem.username;
                block3.appendChild(h);
                let p1 = document.createElement("p");
                p1.classList.add("card-text");
                p1.innerText = "Name: " + elem.name;
                block3.appendChild(p1);
                let p2 = document.createElement("p");
                p2.classList.add("card-text");
                p2.innerText = "Sername: " + elem.sername;
                block3.appendChild(p2);
                let p3 = document.createElement("p");
                p3.classList.add("card-text");
                p3.innerText = "Email: " + elem.email;
                block3.appendChild(p3);
                let p4 = document.createElement("p");
                p4.classList.add("card-text");

                let roles="";
                for(let i=0;i<elem.roles.length;i++){
                    roles+=elem.roles[i].name;
                    if(i!=elem.roles.length-1)roles+=", "
                }
                p4.innerText = "Roles: " + roles;
                block3.appendChild(p4);


                block2.appendChild(block3);
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
            h.innerText = "There aren't any users";
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
        h.innerText = "Failed to load users";
        block3.appendChild(h);
        block2.appendChild(block3);
        block1.appendChild(block2);
        cont.appendChild(block1);


    }



});



