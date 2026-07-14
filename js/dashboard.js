// Sidebar Toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
});

// Dark Mode
const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});

// Counter Animation
function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let step = Math.abs(Math.floor(duration / range));
    let current = start;

    let timer = setInterval(() => {
        current++;
        obj.textContent = current;

        if (current >= end) {
            clearInterval(timer);
        }
    }, step);
}

animateValue("totalStudents", 0, 250, 1000);
animateValue("activeStudents", 0, 220, 1000);
animateValue("pendingAssignments", 0, 18, 1000);
animateValue("completedTasks", 0, 170, 1000);

// Modal
const modal = document.getElementById("myModal");
const closeModal = document.getElementById("closeModal");

// Open automatically after 1 second
window.onload = function () {
    setTimeout(() => {
        modal.classList.remove("hidden");
    }, 1000);
};

// Close Modal
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});
// ============================
// Toast Notification
// ============================

const toast = document.getElementById("toast");

function showToast() {

    toast.classList.remove("hidden");

    setTimeout(function () {
        toast.classList.add("hidden");
    }, 3000);

}

// Show toast after page loads
setTimeout(showToast, 2000);
// ==========================
// Dynamic Dashboard Chart
// ==========================

const bars = document.querySelectorAll(".bar");

bars.forEach(bar => {

    const height = Math.floor(Math.random() * 150) + 50;

    bar.style.height = height + "px";

});