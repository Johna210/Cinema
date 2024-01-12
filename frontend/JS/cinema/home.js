BASEURL = "http://localhost:3000";

const div = document.querySelector("#main");

async function getMovies() {
    const response = await fetch(`${BASEURL}/cinemas/movies`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("CINEMATOKEN")}`,
        },
        method: "GET",
        mode: "cors",
    });

    const data = await response.json();
    return data;
}

getMovies().then((response) => {
    response.forEach((element) => {
        let box = document.createElement("div");
        box.id = "movie";
        box.classList = "box";
        let imgbox = document.createElement("div");
        imgbox.classList = "imgBox";
        let bottom = document.createElement("div");
        bottom.classList = "bottom";

        // Movie Info
        let title = document.createElement("div");
        title.classList = "title";
        title.id = "title";
        title.innerText = `Title: ${element.title}`;

        let genre = document.createElement("div");
        genre.classList = "genre";
        genre.id = "genre";
        genre.innerText = `Genre: ${element.genre}`;

        let showday = document.createElement("div");
        showday.classList = "showday";
        showday.id = "showday";
        showday.innerText = `Date: ${element.day}`;

        let icons = document.createElement("div");
        icons.className = "manage";
        icons.id = `${element.id}`;

        let editIcon = document.createElement("i");
        let delIcon = document.createElement("i");

        editIcon.className = "fa-solid fa-pen-to-square";
        editIcon.style.cursor = "pointer";
        editIcon.id = "edit";
        delIcon.className = "fa-solid fa-trash";
        delIcon.style.cursor = "pointer";
        delIcon.id = "delete";

        icons.appendChild(editIcon);
        icons.appendChild(delIcon);

        let showTime = document.createElement("div");
        showTime.classList = "time";
        showTime.id = "showTime";
        showTime.innerText = `Time: ${element.showTime}`;

        showTime.appendChild(icons);

        // Add image to imagebox
        const relativePath = `http://localhost:5500/backend`;
        imgbox.innerHTML = `<img class="img" src="${relativePath}/${element.imageUrl}"/>`;

        bottom.appendChild(title);
        bottom.appendChild(genre);
        bottom.appendChild(showday);
        bottom.appendChild(showTime);

        box.appendChild(imgbox);
        box.appendChild(bottom);

        // Display on page
        div.appendChild(box);
    });
});

async function deleteMovie(id) {
    const response = await fetch(`${BASEURL}/cinemas/removeMovie/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("CINEMATOKEN")}`,
        },
        method: "DELETE",
        mode: "cors",
    });

    const data = await response.json();
    return data;
}

function getInfo(value) {
    const totalInfo = value.parentElement.parentElement.parentElement;
    const title = totalInfo.querySelector("#title").textContent.split(" ")[1];
    const genre = totalInfo.querySelector("#genre").textContent.split(" ")[1];
    const showday = totalInfo
        .querySelector("#showday")
        .textContent.split(" ")[1];
    const showtime = totalInfo
        .querySelector("#showTime")
        .textContent.split(" ")[1];

    return {
        title,
        genre,
        showday,
        showtime,
    };
}

function manage() {
    if (div.children) {
        div.addEventListener("click", (e) => {
            let movieId = e.target.parentElement;
            let iconId = e.target;

            if (iconId.id === "delete") {
                if (confirm("Are you sure you want to remove this movie? ")) {
                    deleteMovie(movieId.id);
                }

                location.reload();
            } else if (iconId.id === "edit") {
                const info = getInfo(iconId);
                const url = "movieupdate.html?";
                const query = `id=${movieId.id}&title=${info.title}&genre=${info.genre}&showday=${info.showday}&showtime=${info.showtime}`;

                const link = url + query;
                location.href = link;
            }
        });
    }
}

manage();
