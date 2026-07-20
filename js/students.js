function showToast(message) {

    var toast = document.getElementById("toast");

    toast.innerHTML = message;

    toast.classList.remove("hidden");

    setTimeout(function () {

        toast.classList.add("hidden");

    }, 3000);

}
// Check login user

var user = JSON.parse(localStorage.getItem("loggedInUser"));

if (user != null) {

    if (user.role == "student") {

        var registerMenu = document.getElementById("registerMenu");

        if (registerMenu) {
            registerMenu.style.display = "none";
        }

    }

}
// ==========================
// DummyJSON API
// ==========================

const API_URL = "https://dummyjson.com/users?limit=100";

let students = [];
let filteredStudents = [];

let currentPage = 1;
const rowsPerPage = 10;

// Elements
const studentBody = document.getElementById("studentBody");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

// ==========================
// Load Students
// ==========================

async function loadStudents() {
// Check localStorage first

var localStudents = JSON.parse(localStorage.getItem("students"));

if (localStudents && localStudents.length > 0) {

    students = localStudents;
    filteredStudents = [...students];

    displayStudents();

    return;

}
    loading.classList.remove("hidden");
    error.classList.add("hidden");

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        const data = await response.json();

        // Add fake status
        students = data.users.map((student, index) => ({

            id: student.id,
            name: student.firstName + " " + student.lastName,
            email: student.email,
            department: student.company.department,

            status:
                index % 3 === 0
                    ? "Active"
                    : index % 3 === 1
                    ? "Inactive"
                    : "Pending"

        }));

        filteredStudents = [...students];

        displayStudents();

    }

    catch (err) {

        error.classList.remove("hidden");
        error.innerHTML = "Unable to load student data.";

        console.log(err);

    }

    finally {

        loading.classList.add("hidden");

    }

}

// ==========================
// Display Students
// ==========================

function displayStudents() {

    studentBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const pageStudents = filteredStudents.slice(start, end);

    pageStudents.forEach(student => {

        let color = "text-green-600";

        if (student.status === "Inactive") {

            color = "text-red-600";

        }

        if (student.status === "Pending") {

            color = "text-yellow-600";

        }

        studentBody.innerHTML += `

<tr class="border hover:bg-gray-100">

<td class="py-3 px-4">${student.id}</td>

<td>${student.name}</td>

<td>${student.email}</td>

<td>${student.department}</td>

<td class="${color} font-semibold">${student.status}</td>

<td>

${user.role == "admin"
<button
class="editBtn bg-blue-600 text-white px-3 py-1 rounded mr-2">

Edit

</button>

<td>

${user.role == "admin"
? `
<button class="editBtn bg-blue-600 text-white px-3 py-1 rounded mr-2">
Edit
</button>

<button class="deleteBtn bg-red-600 text-white px-3 py-1 rounded">
Delete
</button>
`
: `<span class="text-blue-600 font-semibold">View Only</span>`}

</td>

</tr>

`;

    });

    document.getElementById("pageInfo").innerText =
        `Page ${currentPage}`;

}

loadStudents();
// ==========================
// Search Students
// ==========================

document.getElementById("searchStudent").addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(value)
    );

    currentPage = 1;
    displayStudents();

});

// ==========================
// Filter Students
// ==========================

document.getElementById("statusFilter").addEventListener("change", function () {

    const value = this.value.toLowerCase();

    if (value === "all") {

        filteredStudents = [...students];

    } else {

        filteredStudents = students.filter(student =>
            student.status.toLowerCase() === value
        );

    }

    currentPage = 1;
    displayStudents();

});

// ==========================
// Sort Students A-Z
// ==========================

document.getElementById("sortBtn").addEventListener("click", function () {

    filteredStudents.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    displayStudents();

});

// ==========================
// Delete Student
// ==========================

studentBody.addEventListener("click", function (e) {

    var row = e.target.closest("tr");

    var id = Number(row.cells[0].innerText);

    // Edit
    if (e.target.classList.contains("editBtn")) {

        var student = students.find(function (item) {
            return item.id == id;
        });

        localStorage.setItem("editStudent", JSON.stringify(student));

        window.location.href = "register.html";
    }

    // Delete
    if (e.target.classList.contains("deleteBtn")) {

        if (!confirm("Delete this student?")) {
            return;
        }

        students = students.filter(function (item) {
            return item.id != id;
        });

        filteredStudents = [...students];

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();

        showToast("Student deleted successfully.");

    }

});
// ==========================
// Export JSON
// ==========================

document.getElementById("exportBtn").addEventListener("click", function () {

    const blob = new Blob(
        [JSON.stringify(filteredStudents, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "students.json";
    a.click();

    URL.revokeObjectURL(url);

});

// ==========================
// Pagination
// ==========================

document.getElementById("nextBtn").addEventListener("click", function () {

    if (currentPage * rowsPerPage < filteredStudents.length) {

        currentPage++;
        displayStudents();

    }

});

document.getElementById("prevBtn").addEventListener("click", function () {

    if (currentPage > 1) {

        currentPage--;
        displayStudents();

    }

});
// Student search and filter functionality implemented

// ==========================
// Import JSON
// ==========================

document.getElementById("importFile").addEventListener("change", function () {

    var file = this.files[0];

    if (!file) {
        return;
    }

    var reader = new FileReader();

    reader.onload = function (event) {

        try {

            var data = JSON.parse(event.target.result);

            students = data;
            filteredStudents = data;

            localStorage.setItem("students", JSON.stringify(data));

            currentPage = 1;

            displayStudents();

            showToast("Student data imported successfully.");

        } catch (error) {

            showToast("Invalid JSON file.");

        }

    };

    reader.readAsText(file);

});