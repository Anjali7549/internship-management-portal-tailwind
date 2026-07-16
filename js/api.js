// ===============================
// Custom API Service Layer
// ===============================

async function fetchAPI(url) {

    try {

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("API Request Failed");

        }

        const data = await response.json();

        return data;

    }

    catch(error) {

        console.log("API Error:", error);

        throw error;

    }

}


// Students API

async function getStudents(){

    return await fetchAPI(
        "https://dummyjson.com/users?limit=100"
    );

}


// Reports API

async function getReports(){

    return await fetchAPI(
        "https://dummyjson.com/posts?limit=10"
    );

}


// User API

async function getUser(){

    return await fetchAPI(
        "https://dummyjson.com/users/1"
    );

}