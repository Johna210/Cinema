const myForm = document.getElementById("add-form");
const inpFile = document.getElementById("imageUpload");

myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movieTitle = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const date = document.getElementById("date").value;
    const showTime = document.getElementById("showTime").value;
    const endPoint = "http://localhost:3000/cinemas/addMovie";
    const formData = new FormData();

    formData.append("title", movieTitle);
    formData.append("genre", genre);
    formData.append("day", date);
    formData.append("showTime", showTime);
    formData.append("file", inpFile.files[0]);

    fetch(endPoint, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("CINEMATOKEN")}`,
        },
        method: "POST",
        body: formData,
        mode: "cors",
    }).catch(console.error);
});
