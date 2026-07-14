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

        if (
            name === "" ||
            email === "" ||
            course === "Select Course"
        ) {
            alert("Please fill all required fields.");
            return;
        }

        const student = {
            name: name,
            email: email,
            course: course
        };

        let students = JSON.parse(localStorage.getItem("students")) || [];

        students.push(student);

        localStorage.setItem("students", JSON.stringify(students));

        alert("Student Registered Successfully!");

        studentForm.reset();

    });

}