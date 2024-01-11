const singup_form = document.querySelector(".add-form");
const login_form = document.querySelector(".login-form");

const registerCinema = async (
    cinemaName,
    email,
    password,
    confirmation,
    description
) => {
    const message = document.querySelector(".message");

    if (password !== confirmation) {
        message.innerHTML = "passwords doesn't match!";
    } else if (cinemaName.length < 1 || email.length < 1) {
        message.innerHTML = "Please fill all the credentials";
    }

    console.log(description);
    const response = await createCinema(
        cinemaName,
        email,
        password,
        description
    );

    if (response.id) {
        window.location.href = "cinemaManagerLogin.html";
    } else {
        message.innerHTML = `<h4 style="color:white">${response.message}</h4>`;
    }
};

const login = async (email, password) => {
    const response = await logCinema(email, password);
    const message = document.querySelector(".message");
    console.log(response);

    if (response.statusCode) {
        message.innerHTML = `<h4 style="color:red;">${response.message}</h4>`;
        return;
    }

    localStorage.setItem("CINEMATOKEN", response.cinematoken);
    window.location.href = "managerhome.html";
};

singup_form?.addEventListener("submit", (e) => {
    e.preventDefault();

    let description = document.getElementById("description").value;
    console.log(description);

    registerCinema(
        document.getElementById("name").value,
        document.getElementById("email").value,
        document.getElementById("password").value,
        document.getElementById("confirmation"),
        description
    );
});

login_form?.addEventListener("submit", (e) => {
    e.preventDefault();

    login(
        document.getElementById("email").value,
        document.getElementById("password").value
    );
});
