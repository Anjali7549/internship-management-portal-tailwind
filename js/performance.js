var chart = document.getElementById("performanceChart");

if (chart) {

    new Chart(chart, {

        type: "pie",

        data: {

            labels: [

                "Excellent",
                "Good",
                "Average",
                "Needs Improvement"

            ],

            datasets: [{

                data: [

                    15,
                    30,
                    12,
                    5

                ],

                backgroundColor: [

                    "#22c55e",
                    "#2563eb",
                    "#eab308",
                    "#ef4444"

                ]

            }]

        },

        options: {

            responsive: true

        }

    });

}