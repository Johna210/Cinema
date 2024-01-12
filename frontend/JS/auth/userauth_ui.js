const singup_form = document.querySelector(".add-form");
const login_form = document.querySelector(".login-form");
const logout = document.querySelector("#logout");
const delAccount = document.querySelector("#Delete");

if (logout) {
    logout.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("USERTOKEN");
        window.location.href = "login.html";
    });
}

if (delAccount) {
    delAccount.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(localStorage.getItem("USERTOKEN"));

        deleteAccount(localStorage.getItem("USERTOKEN"));
        localStorage.removeItem("USERTOKEN");
        window.location.href = "signin.html";
    });
}
const deleteAccount = async (jwt_token) => {
    const response = await fetch(`${BASEURL}/users/delaccount`, {
        headers: {
            Authorization: `Bearer ${jwt_token}`,
        },
        method: "DELETE",
        mode: "cors",
    });

    return await response.json();
};

const registerUser = async (
    fullname,
    email,
    username,
    password,
    confirmation
) => {
    const message = document.querySelector(".message");

    if (password !== confirmation) {
        message.innerHTML = "passwords doesn't match!";
    } else if (fullname.length < 1 || email.length < 1 || username.length < 1) {
        message.innerHTML = "Please fill all the credentials";
    }

    const response = await createUser(fullname, email, username, password);

    if (response.id) {
        window.location.href = "login.html";
    } else {
        message.innerHTML = `<h4 style="color:white;">${response.message}</h4>`;
    }
};

const login = async (email, password) => {
    const response = await logUser(email, password);
    const message = document.querySelector(".message");

    if (response.statusCode) {
        message.innerHTML = `<h4 style="color:red;">${response.message}</h4>`;
        return;
    }

    localStorage.setItem("USERTOKEN", response.usertoken);

    window.location.href = "userhome.html";
};

const checkStoredCreds = async () => {
    const jwt_token = localStorage.getItem("USERTOKEN");

    if (jwt_token) {
        const current = await getLoggedUser(jwt_token);
    }
};

singup_form?.addEventListener("submit", (e) => {
    e.preventDefault();

    registerUser(
        document.getElementById("name").value,
        document.getElementById("email").value,
        document.getElementById("username").value,
        document.getElementById("password").value,
        document.getElementById("confirmation").value
    );
});

login_form?.addEventListener("submit", (e) => {
    e.preventDefault();

    login(
        document.getElementById("email").value,
        document.getElementById("password").value
    );
});
