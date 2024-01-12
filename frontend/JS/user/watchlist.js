BASEURL = "http://localhost:3000";

const main = document.getElementById("main");

async function getWatchList() {
    const response = await fetch(`${BASEURL}/users/watchlist`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("USERTOKEN")}`,
        },
        method: "GET",
        mode: "cors",
    });

    const data = await response.json();
    return data;
}

async function getMovie(id) {
    const response = await fetch(`${BASEURL}/users/movie/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("USERTOKEN")}`,
        },
        method: "GET",
        mode: "cors",
    });

    const data = await response.json();
    return data;
}

async function remove(id) {
    const response = await fetch(`http://localhost:3000/users/del/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("USERTOKEN")}`,
        },
        method: "DELETE",
        mode: "cors",
    });

    const data = await response.json();
    return data;
}

window.onload = getWatchList().then((response) => {
    response.forEach((element) => {
        getMovie(element.movieId).then((res) => {
            console.log(res.id);
            const box = document.createElement("div");
            box.classList = "box";

            const relativePath = `http://localhost:5500/backend`;
            let imgbox = document.createElement("div");
            imgbox.classList = "imgbox";
            imgbox.innerHTML = `<img class="img" src ="${relativePath}/${res.imageUrl}"/>`;

            let title = document.createElement("div");
            title.classList = "title";
            title.innerText = `Title: ${res.title}`;

            let genre = document.createElement("div");
            genre.classList = "genre";
            genre.innerText = `Genre: ${res.genre}`;

            let showday = document.createElement("div");
            showday.classList = "showday";
            showday.innerText = `Date: ${res.day}`;

            let showTime = document.createElement("div");
            showTime.classList = "time";
            showTime.innerText = `Time: ${res.showTime}`;

            const button = document.createElement("button");
            button.classList.add("button", "remove");
            button.textContent = "Remove";
            button.id = `remove-${res.id}`;
            button.dataset.movieId = res.id;

            let bottom = document.createElement("div");
            bottom.appendChild(title);
            bottom.appendChild(genre);
            bottom.appendChild(showday);
            bottom.appendChild(showTime);

            box.appendChild(imgbox);
            box.appendChild(bottom);
            box.appendChild(button);

            main.appendChild(box);
        });
    });
});

main.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove")) {
        // If the clicked element is a button with the class 'add'
        const movieId = event.target.dataset.movieId; // Get the movieId from the button's data attribute
        remove(movieId); // Call the function to add the movie to the watchlist
        location.reload();
    }
});
