BASEURL = "http://localhost:3000";

const createCinema = (cinemaName, email, password, description) => {
    const imagePath = "";
    return fetch(`${BASEURL}/cinemas/signup`, {
        headers: {
            "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
            cinemaName,
            email,
            password,
            description,
            imagePath,
        }),
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => error);
};

const logCinema = (email, password) => {
    return fetch(`${BASEURL}/cinemas/signin`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => data)
        .then((error) => error);
};

const getLoggedCinema = async (jwt_token) => {
    const response = await fetch(`${BASEURL}/cinemas/current`, {
        headers: {
            Authorization: `Bearer ${jwt_token}`,
        },
        mode: "cors",
    });
    if (response.status == 401) {
        localStorage.clear();
        window.location.href = "cinemaManagerLogin.html";
    }

    return await response;
};
