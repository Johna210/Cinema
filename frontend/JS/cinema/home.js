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
        console.log(element);
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
