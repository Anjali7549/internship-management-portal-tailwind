const ctx = document.getElementById("studentChart");

if (ctx) {

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: ["Active", "Inactive", "Pending"],

            datasets: [{

                label: "Students",

                data: [20, 8, 5],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444",
                    "#facc15"
                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}