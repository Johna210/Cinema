BASEURL = "http://localhost:3000";

const uploadProfileImage = (image) => {
    let formData = new FormData();
    formData.append("file", image);

    return (
        fetch(`${BASEURL}/cinemas/image`, {
            headers: {
                Authorization: `Bearer${localStorage.getItem("CINEMATOKEN")}`,
            },
            method: "POST",
            body: formData,
        }).then((response) => response.json()),
        then((data) => console.log(data)),
        then((error) => console.error(""))
    );
};
