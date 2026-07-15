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
// ==========================
// Filter Students
// ==========================

const statusFilter = document.getElementById("statusFilter");

if (statusFilter) {

    statusFilter.addEventListener("change", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll("#studentTable tbody tr");

        rows.forEach(function (row) {

            const status = row.children[4].innerText.toLowerCase();

            if (value === "all" || status.includes(value)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

}
// ==========================
// Sort Students
// ==========================

const sortStudents = document.getElementById("sortStudents");

if (sortStudents) {

    sortStudents.addEventListener("change", function () {

        const tbody = document.querySelector("#studentTable tbody");

        const rows = Array.from(tbody.querySelectorAll("tr"));

        rows.sort(function (a, b) {

            const nameA = a.children[1].innerText.toLowerCase();
            const nameB = b.children[1].innerText.toLowerCase();

            return nameA.localeCompare(nameB);

        });

        rows.forEach(function (row) {
            tbody.appendChild(row);
        });

    });

}