const container = document.getElementById("container");
const description = document.getElementById("description");

const urlParams = new URLSearchParams(window.location.search);
const cinemaId = urlParams.get("id");

console.log(container);
console.log(description);

async function cinemaInfo(id) {
    try {
        const response = await fetch(
            `http://localhost:3000/cinemas/info/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "CINEMATOKEN"
                    )}`,
                },
                method: "GET",
                mode: "cors",
            }
        );

        const data = await response.json();
        const cinema_image = data;
        return cinema_image;
    } catch (error) {
        console.error(error);
    }
}

cinemaInfo(cinemaId).then((response) => {
    console.log(response);
    const relativePath = `http://localhost:5500/backend/src${response.imagePath.slice(
        1
    )}`;
    container.innerHTML = `<img class="img" src = ${relativePath} />`;
    let desc = document.createElement("p");
    desc.innerText = `${response.description}`;
    console.log(desc);

    description.appendChild(desc);
});
