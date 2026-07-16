async function loadProfile() {
    const loading = document.getElementById("loading");
    const profileCard = document.getElementById("profileCard");
    const error = document.getElementById("error");

    try {
        const data = await API.getProfile();

        document.getElementById("profileImage").src = data.image;
        document.getElementById("profileName").textContent =
            `${data.firstName} ${data.lastName}`;
        document.getElementById("profileEmail").textContent = data.email;
        document.getElementById("profilePhone").textContent = data.phone;
        document.getElementById("profileCompany").textContent =
            data.company.name;
        document.getElementById("profileAddress").textContent =
            `${data.address.address}, ${data.address.city}`;

        loading.classList.add("hidden");
        profileCard.classList.remove("hidden");
    } catch (err) {
        console.error(err);

        loading.classList.add("hidden");
        error.classList.remove("hidden");
    }
}

loadProfile();