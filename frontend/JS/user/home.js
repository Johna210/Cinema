BASEURL = "http://localhost:3000";

const div = document.querySelector("#main");
const dropDown = document.querySelector("#cinemas-drop");

async function getMovies() {
    const response = await fetch(`${BASEURL}/cinemas/allMovies`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("USERTOKEN")}`,
        },
        method: "GET",
        mode: "cors",
    });

    const data = await response.json();
    return data;
}

async function getCinemaName(id) {
    const response = await fetch(`${BASEURL}/cinemas/view/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("USERTOKEN")}`,
        },
        method: "GET",
        mode: "cors",
    });

    const data = await response.json();
    return data;
}

async function addToWatchList(id) {
    const response = await fetch(`http://localhost:3000/users/add/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("USERTOKEN")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            movieId: id,
        }),
    });
    const data = await response.json();
    return data;
}
getMovies().then((response) => {
    response.forEach((element) => {
        getCinemaName(element.cinemaId).then((response) => {
            let box = document.createElement("div");
            box.classList = "box";
            let imgbox = document.createElement("div");
            imgbox.classList = "img";
            let bottom = document.createElement("div");
            bottom.classList = "bottom";

            // Movie Info
            let title = document.createElement("div");
            title.classList = "title";
            title.innerText = `Title: ${element.title}`;

            let genre = document.createElement("div");
            genre.classList = "genre";
            genre.innerText = `Genre: ${element.genre}`;

            let showday = document.createElement("div");
            showday.classList = "showday";
            showday.innerText = `Date: ${element.day}`;

            let showTime = document.createElement("div");
            showTime.classList = "time";
            showTime.innerText = `Time: ${element.showTime}`;

            let cinemaName = document.createElement("div");
            cinemaName.classList = "cinemaName";
            cinemaName.innerHTML = `<a href="userseeprofile.html?id=${response.id}">${response.cinemaName}</a>`;
            // cinemaName.textContent = `${response.cinemaName}`;

            let btn = document.createElement("button");
            btn.id = `add-${element.id}`;
            btn.classList = "add";
            btn.textContent = "Add to Watchlist";
            btn.dataset.movieId = element.id;

            // btn.addEventListener("click", addToWatchList(element.id));

            // Add image to imagebox
            const relativePath = `http://localhost:5500/backend`;
            imgbox.innerHTML = `<img class="img" src="${relativePath}/${element.imageUrl}"/>`;

            bottom.appendChild(title);
            bottom.appendChild(genre);
            bottom.appendChild(showday);
            bottom.appendChild(showTime);
            bottom.appendChild(cinemaName);
            bottom.appendChild(btn);

            box.appendChild(imgbox);
            box.appendChild(bottom);

            // Display on page
            div.appendChild(box);
        });
    });
});

div.addEventListener("click", function (event) {
    if (event.target.classList.contains("add")) {
        // If the clicked element is a button with the class 'add'
        const movieId = event.target.dataset.movieId; // Get the movieId from the button's data attribute
        addToWatchList(movieId); // Call the function to add the movie to the watchlist
        alert("Movie Added to watch list");
    }
});
