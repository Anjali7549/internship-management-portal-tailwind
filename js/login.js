// Get the form
var loginForm = document.getElementById("loginForm");

// Run this when form is submitted
loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get values from form
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;

    // Simple validation
    if (email === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    // Save user in local storage
    var user = {
        email: email,
        role: role
    };

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login Successful!");

    // Redirect according to role
    if (role === "admin") {
        window.location.href = "dashboard.html";
    } else {
        window.location.href = "students.html";
    }

});