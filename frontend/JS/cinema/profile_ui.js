const myForm = document.getElementById("myForm");
const inpFile = document.getElementById("cinema_image");
const placeholder = document.querySelector(".img");
const disc = document.querySelector(".disc");
const logout = document.querySelector("#logout");
const delAccount = document.querySelector("#Delete");

if (logout) {
    logout.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("CINEMATOKEN");
        window.location.href = "cinemaManagerLogin.html";
    });
}

if (delAccount) {
    delAccount.addEventListener("click", function (e) {
        e.preventDefault();
        deleteAcoount(localStorage.getItem("USERTOKEN"));
        localStorage.removeItem("CINEMATOKEN");
        window.location.href = "signin.html";
    });
}

async function cinemaInfo() {
    try {
        const response = await fetch("http://localhost:3000/cinemas/getpath", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("CINEMATOKEN")}`,
            },
            method: "GET",
            mode: "cors",
        });

        const data = await response.json();
        const cinema_image = data;
        return cinema_image;
    } catch (error) {
        console.error(error);
    }
}

cinemaInfo().then((response) => {
    const imageResult = response;

    if (imageResult.imagePath) {
        console.log(imageResult.imagePath);
        const relativePath = `http://localhost:5500/backend/src${imageResult.imagePath.slice(
            1
        )}`;
        placeholder.innerHTML = `<img src = ${relativePath} />`;
        let description = document.createElement("p");
        description.innerText = `${imageResult.description}`;

        disc.appendChild(description);
    } else {
        postImage();
    }
});

function postImage() {
    myForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const endpoint = "http://localhost:3000/cinemas/image";
        const formData = new FormData();

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
}
