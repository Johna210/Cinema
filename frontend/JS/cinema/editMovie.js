const myForm = document.getElementById("add-form");

const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
const genre = urlParams.get("genre");
const showday = urlParams.get("showday");
const showtime = urlParams.get("showtime");
const movieId = urlParams.get("id");

console.log(movieId);

document.getElementById("title").value = title;
document.getElementById("genre").value = genre;
document.getElementById("date").value = showday;
document.getElementById("showTime").value = showtime;

myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const movieTitle = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const date = document.getElementById("date").value;
    const showTime = document.getElementById("showTime").value;
    const endPoint = `http://localhost:3000/cinemas/updateMovie/${movieId}`;

    console.log(movieTitle);
    fetch(endPoint, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("CINEMATOKEN")}`,
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
            title: movieTitle,
            genre,
            day: date,
            showTime,
        }),
        mode: "cors",
    })
        .then((location.href = "managerhome.html"))
        .catch(console.error);
});
