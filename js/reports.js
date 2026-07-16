// =======================================
// Reports API
// =======================================

const USERS_API = "https://dummyjson.com/users?limit=100";
const POSTS_API = "https://dummyjson.com/posts?limit=10";

// Elements
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const reportStudents = document.getElementById("reportStudents");
const averageScore = document.getElementById("averageScore");
const assignmentCount = document.getElementById("assignmentCount");
const certificateCount = document.getElementById("certificateCount");

const topStudents = document.getElementById("topStudents");
const progressTable = document.getElementById("progressTable");
const recentReports = document.getElementById("recentReports");

let users = [];
let reports = [];

// =======================================
// Load Reports
// =======================================

async function loadReports() {

    loading.classList.remove("hidden");
    error.classList.add("hidden");

    try {

        // Fetch Users
        const usersResponse = await fetch(USERS_API);

        if (!usersResponse.ok) {
            throw new Error("Users API Error");
        }

        const usersData = await usersResponse.json();

        users = usersData.users;

        // Fetch Reports
        const reportsResponse = await fetch(POSTS_API);

        if (!reportsResponse.ok) {
            throw new Error("Reports API Error");
        }

        const reportsData = await reportsResponse.json();

        reports = reportsData.posts;

        // Dashboard Cards
        reportStudents.innerText = users.length;
        averageScore.innerText = "92%";
        assignmentCount.innerText = reports.length;
        certificateCount.innerText = "95";

    }

    catch (err) {

        console.log(err);

        error.classList.remove("hidden");
        error.innerText = "Failed to load reports.";

    }

    finally {

        loading.classList.add("hidden");

    }

}
// =======================================
// Display Top Students
// =======================================

function displayTopStudents() {

    topStudents.innerHTML = "";

    users.slice(0, 5).forEach((user, index) => {

        let score = 98 - index;

        topStudents.innerHTML += `

        <div class="flex justify-between border-b pb-3">

            <span class="font-semibold">
                ${user.firstName} ${user.lastName}
            </span>

            <span class="text-green-600 font-bold">
                ${score}%
            </span>

        </div>

        `;

    });

}


// =======================================
// Display Progress Table
// =======================================

function displayProgressTable() {

    progressTable.innerHTML = "";

    users.slice(0,10).forEach((user,index)=>{

        let progress = 95 - (index * 5);

        progressTable.innerHTML += `

        <tr class="border">

            <td class="py-3 px-4">

                ${user.firstName} ${user.lastName}

            </td>


            <td class="px-4">

                ${user.company.department}

            </td>


            <td class="px-4">

                <div class="w-full bg-gray-200 rounded-full h-4">

                    <div
                    class="bg-green-500 h-4 rounded-full"
                    style="width:${progress}%">

                    </div>

                </div>

            </td>

        </tr>

        `;

    });

}


// =======================================
// Display Recent Reports
// =======================================

function displayRecentReports(){

    recentReports.innerHTML = "";


    reports.forEach(report=>{


        recentReports.innerHTML += `

        <div class="border rounded-lg p-4">

            <h3 class="font-bold text-lg">

                ${report.title}

            </h3>


            <p class="text-gray-600 mt-2">

                ${report.body}

            </p>

        </div>

        `;


    });


}


// =======================================
// Start Reports
// =======================================

async function startReports(){

    await loadReports();

    if(users.length > 0){

        displayTopStudents();

        displayProgressTable();

        displayRecentReports();

    }

}


startReports();
// Reports API integration completed