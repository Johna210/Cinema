BASEURL = "http://localhost:3000";

const createUser = (fullname, email, username, password) => {
    return fetch(`${BASEURL}/users/signup`, {
        headers: {
            "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
            fullname,
            email,
            username,
            password,
        }),
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => error);
};

const logUser = (email, password) => {
    return fetch(`${BASEURL}/users/signin`, {
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
        .catch((error) => error);
};

const getLoggedUser = async (jwt_token) => {
    const response = await fetch(`${BASEURL}/users/current`, {
        headers: {
            Authorization: `Bearer ${jwt_token}`,
        },
        mode: "cors",
    });
    if (response.status == 401) {
        localStorage.clear();
        window.location.href = "login.html";
    }

    return await response.json();
};
