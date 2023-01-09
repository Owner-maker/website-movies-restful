const checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
    if (checkList.classList.contains('visible'))
        checkList.classList.remove('visible');
    else
        checkList.classList.add('visible');
}

class Filter {
    constructor(yearFrom, yearTo, timeFrom, timeTo, types) {
        this.yearFrom = yearFrom
        this.yearTo = yearTo
        this.timeFrom = timeFrom
        this.timeTo = timeTo
        this.types = types
    }
}

let filterCriteria = [];
let loaded = false;

async function filter() {
    let yearFrom = document.getElementById("yearFrom").value;
    let yearTo = document.getElementById("yearTo").value;
    let timeFrom = document.getElementById("timeFrom").value;
    let timeTo = document.getElementById("timeTo").value;
    if (!yearFrom) {
        yearFrom = 0
    }
    if (!yearTo) {
        yearTo = 0
    }
    if (!timeFrom) {
        timeFrom = 0
    }
    if (!timeTo) {
        timeTo = 0
    }

    let types = []
    let moviesTypes = document.querySelectorAll('.options_movies');
    for (let i = 0; i < moviesTypes.length; i++) {
        if (moviesTypes[i].checked === true) {
            types.push(moviesTypes[i].value)
        }
    }

    filterCriteria = new Filter(parseInt(yearFrom), parseInt(yearTo), parseInt(timeFrom), parseInt(timeTo), types)
    await load()
}


document.addEventListener('click', ({target: t}) => {
    if (t.tagName === 'INPUT' && t.disabled === false && t.className === "btn float-center login_btn") {
        if (localStorage.getItem("library") != null) {
            let library = JSON.parse(localStorage.getItem("library"));
            library.push(t.alt);
            localStorage.setItem("library", JSON.stringify(library));
        } else {
            let library = [];
            library.push(t.alt);
            localStorage.setItem("library", JSON.stringify(library));
        }

        t.style.backgroundColor = "green"
        t.value = "Added";
        t.disabled = true;
    }
});


document.addEventListener("DOMContentLoaded", load)

async function load() {
    console.log(filterCriteria)

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

    if (response.ok) {
        let result = await response.json();


        if (localStorage.getItem("library") !== null) {
            let library = JSON.parse(localStorage.getItem("library"));
            let b = 0;
            while (b < library.length) {
                for (let i = 0; i < result.length; i++) {
                    if ("" + result[i].id === library[b]) {
                        result.splice(i, 1);
                    }
                }
                b++;
            }
        }
        console.log(filterCriteria)

        let cont = document.getElementById("container");
        let block1 = document.createElement("div");
        block1.classList.add("card-columns", "my-3");
        if (result.length !== 0) {
            if (loaded) {
                if (filterCriteria.timeFrom !== 0 && filterCriteria.timeTo !== 0) {
                    result = result.filter(m => m.time >= filterCriteria.timeFrom && m.time <= filterCriteria.timeTo)
                }
                if (filterCriteria.yearFrom !== 0 && filterCriteria.yearTo !== 0) {
                    result = result.filter(m => m.year >= filterCriteria.yearFrom && m.year <= filterCriteria.yearTo)
                }
                if (filterCriteria.types.length !== 0) {
                    for (let i = 0; i < result.length; i++) {
                        for (let j = 0; j < filterCriteria.types.length; j++) {
                            if (!result[i].type.includes(filterCriteria.types[j])) {
                                result.splice(i, 1);
                                break
                            }
                        }
                    }
                }
                cont.innerHTML = ""
                if (result.length === 0){
                    let block2 = document.createElement("div");
                    block2.classList.add("card");
                    let block3 = document.createElement("div");
                    block3.classList.add("card-body");

                    let h = document.createElement("h2");
                    h.classList.add("card-title");
                    h.innerText = "No movies with these criteria :c";
                    block3.appendChild(h);
                    block2.appendChild(block3);
                    block1.appendChild(block2);
                    cont.appendChild(block1);
                }
            }
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
                let input = document.createElement("input");
                input.value = "Add";
                input.alt = "" + elem.id;
                input.classList.add("btn", "float-center", "login_btn");
                block4.appendChild(input);
                block2.appendChild(img);
                block2.appendChild(block3);
                block2.appendChild(block4);
                block1.appendChild(block2);
                cont.appendChild(block1);
            });
        } else {
            let block2 = document.createElement("div");
            block2.classList.add("card");
            let block3 = document.createElement("div");
            block3.classList.add("card-body");

            let h = document.createElement("h2");
            h.classList.add("card-title");
            h.innerText = "No movies left, check your library";
            block3.appendChild(h);
            block2.appendChild(block3);
            block1.appendChild(block2);
            cont.appendChild(block1);
        }

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
        h.innerText = "Failed to load movies";
        block3.appendChild(h);
        block2.appendChild(block3);
        block1.appendChild(block2);
        cont.appendChild(block1);


    }

    loaded = true;
}



