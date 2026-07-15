function validateForm(name, email, course) {

    if (name === "") {
        alert("Student Name is required");
        return false;
    }

    if (email === "") {
        alert("Email is required");
        return false;
    }

    if (course === "Select Course") {
        alert("Please select a course");
        return false;
    }

    return true;
}