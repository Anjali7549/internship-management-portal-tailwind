// ============================
// Student Search
// ============================

const searchStudent = document.getElementById("searchStudent");

if (searchStudent) {
    searchStudent.addEventListener("keyup", function () {

        const searchText = this.value.toLowerCase();

        const rows = document.querySelectorAll("#studentTable tbody tr");

        rows.forEach(function (row) {

            const text = row.innerText.toLowerCase();

            if (text.includes(searchText)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });
}
// ==========================
// Delete Student
// ==========================

const deleteButtons = document.querySelectorAll(".deleteBtn");

deleteButtons.forEach(button => {

    button.addEventListener("click", function () {

        if (confirm("Delete this student?")) {

            this.closest("tr").remove();

            alert("Student Deleted Successfully!");

        }

    });

});