// ===============================
// Dashboard API
// ===============================

const USERS_API = "https://dummyjson.com/users?limit=100";
const POSTS_API = "https://dummyjson.com/posts?limit=5";

// Elements
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const totalStudents = document.getElementById("totalStudents");
const activeStudents = document.getElementById("activeStudents");
const pendingStudents = document.getElementById("pendingStudents");
const totalReports = document.getElementById("totalReports");

const userImage = document.getElementById("userImage");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userDepartment = document.getElementById("userDepartment");

const profileImage = document.getElementById("profileImage");
const recentReports = document.getElementById("recentReports");

// ===============================
// Load Dashboard
// ===============================

async function loadDashboard() {

    loading.classList.remove("hidden");
    error.classList.add("hidden");

    try {

        // Fetch Users
        const usersResponse = await fetch(USERS_API);

        if (!usersResponse.ok) {
            throw new Error("Users API Error");
        }

        const usersData = await usersResponse.json();

        // Fetch Reports
        const postsResponse = await fetch(POSTS_API);

        if (!postsResponse.ok) {
            throw new Error("Reports API Error");
        }

        const postsData = await postsResponse.json();

        // Dashboard Cards
        totalStudents.innerText = usersData.total;
        activeStudents.innerText = Math.floor(usersData.total * 0.7);
        pendingStudents.innerText = usersData.total - Math.floor(usersData.total * 0.7);
        totalReports.innerText = postsData.total;

        // User Profile
        const user = usersData.users[0];

        profileImage.src = user.image;
        userImage.src = user.image;

        userName.innerText = user.firstName + " " + user.lastName;
        userEmail.innerText = user.email;
        userDepartment.innerText = user.company.department;

        // Reports
        recentReports.innerHTML = "";

        postsData.posts.forEach(post => {

            recentReports.innerHTML += `
                <div class="border rounded-lg p-4 hover:bg-gray-100">

                    <h3 class="font-bold">
                        ${post.title}
                    </h3>

                    <p class="text-gray-600 mt-2">
                        ${post.body}
                    </p>

                </div>
            `;

        });

    }

    catch (err) {

        console.log(err);

        error.classList.remove("hidden");

        error.innerText = "Failed to load Dashboard.";

    }

    finally {

        loading.classList.add("hidden");

    }

}

loadDashboard();
// Logout Button

var logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("loggedInUser");

        alert("You have logged out.");

        window.location.href = "login.html";

    });

}