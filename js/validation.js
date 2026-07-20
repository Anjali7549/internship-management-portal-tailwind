// ==========================
// Load student for editing
// ==========================

window.addEventListener("load", function () {

    var editStudent = JSON.parse(localStorage.getItem("editStudent"));

    if (editStudent) {

        document.getElementById("studentName").value = editStudent.name;
        document.getElementById("studentEmail").value = editStudent.email;
        document.getElementById("studentPhone").value = editStudent.phone;
        document.getElementById("studentCourse").value = editStudent.course;
        document.getElementById("studentGender").value = editStudent.gender;
        document.getElementById("studentDepartment").value = editStudent.department;

        document.getElementById("editIndex").value = editStudent.id;

    }

});
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

   var editIndex = document.getElementById("editIndex").value;

if (editIndex === "") {

    var editId = document.getElementById("editIndex").value;

if (editId == "") {

    students.push(student);

} else {

    for (var i = 0; i < students.length; i++) {

        if (students[i].id == editId) {

            student.id = Number(editId);

            students[i] = student;

            break;

        }

    }

    localStorage.removeItem("editStudent");

}

localStorage.setItem("students", JSON.stringify(students));

alert("Student Saved Successfully");

studentForm.reset();

document.getElementById("editIndex").value = "";

} else {

    students[editIndex] = student;

}

localStorage.setItem("students", JSON.stringify(students));

alert("Student Saved Successfully");

document.getElementById("editIndex").value = "";

    studentForm.reset();

});