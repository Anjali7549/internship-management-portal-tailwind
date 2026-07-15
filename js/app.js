// ============================
// Student Registration
// ============================

const studentForm = document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("studentName").value.trim();
        const email = document.getElementById("studentEmail").value.trim();
        const course = document.getElementById("studentCourse").value;

        if (!validateForm(name, email, course)) {
    return;
}

        const student = {
            name: name,
            email: email,
            course: course
        };

        let students = JSON.parse(localStorage.getItem("students")) || [];

        students.push(student);

        try {

    localStorage.setItem("students", JSON.stringify(students));

} catch (error) {

    alert("Error saving student data!");

}

        alert("Student Registered Successfully!");

        studentForm.reset();

    });

}
window.onload = function () {

    setTimeout(function () {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.style.display = "none";
        }

    }, 1500);

};