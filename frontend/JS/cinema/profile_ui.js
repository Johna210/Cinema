const myForm = document.getElementById("myForm");
const inpFile = document.getElementById("cinema_image");

myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const endpoint = "http://localhost:3000/cinemas/image";
    const formData = new FormData();
    // console.log(inpFile.files);

    formData.append("file", inpFile.files[0]);

    fetch(endpoint, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("CINEMATOKEN")}`,
        },
        method: "POST",
        body: formData,
        mode: "cors",
    }).catch(console.error);
});
