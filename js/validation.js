function validateForm(name, email, course) {

    if (name.trim() === "") {
        alert("Student Name is required");
        return false;
    }

    if (email.trim() === "") {
        alert("Email is required");
        return false;
    }

    if (course === "Select Course") {
        alert("Please select a course");
        return false;
    }

    return true;
}

// Register Student

var studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    var name = document.getElementById("studentName").value;
    var email = document.getElementById("studentEmail").value;
    var course = document.getElementById("studentCourse").value;
    var gender = document.getElementById("studentGender").value;
    var phone = document.getElementById("studentPhone").value;
    var department = document.getElementById("studentDepartment").value;

    if (!validateForm(name, email, course)) {
        return;
    }

    var students = JSON.parse(localStorage.getItem("students")) || [];

    var student = {
        id: Date.now(),
        name: name,
        email: email,
        course: course,
        gender: gender,
        phone: phone,
        department: department,
        status: "Active"
    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Registered Successfully");

    studentForm.reset();

});