// Load attendance from localStorage
var attendanceList = JSON.parse(localStorage.getItem("attendance")) || [];

var attendanceForm = document.getElementById("attendanceForm");
var attendanceBody = document.getElementById("attendanceBody");

// Show attendance when page loads
showAttendance();

// Save attendance
attendanceForm.addEventListener("submit", function (e) {

    e.preventDefault();

    var studentName = document.getElementById("studentAttendance").value;
    var status = document.getElementById("attendanceStatus").value;

    if (studentName === "") {
        alert("Please enter student name");
        return;
    }

    var attendance = {
        id: attendanceList.length + 1,
        name: studentName,
        course: "MCA",
        date: new Date().toLocaleDateString(),
        status: status
    };

    attendanceList.push(attendance);

    localStorage.setItem("attendance", JSON.stringify(attendanceList));

    attendanceForm.reset();

    showAttendance();

});

// Display attendance
function showAttendance() {

    attendanceBody.innerHTML = "";

    attendanceList.forEach(function (item) {

        var color = "bg-green-100 text-green-700";

        if (item.status === "Absent") {
            color = "bg-red-100 text-red-700";
        }

        if (item.status === "Late") {
            color = "bg-yellow-100 text-yellow-700";
        }

        attendanceBody.innerHTML += `

<tr class="border hover:bg-gray-100">

<td class="py-3 text-center">${item.id}</td>

<td>${item.name}</td>

<td>${item.course}</td>

<td>${item.date}</td>

<td>
<span class="${color} px-3 py-1 rounded-full">
${item.status}
</span>
</td>

</tr>

`;

    });

}