const API = {
  // Fetch Students
  async getStudents() {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }

    return await response.json();
  },

  // Fetch Reports
  async getReports() {
    const response = await fetch("https://dummyjson.com/posts");

    if (!response.ok) {
      throw new Error("Failed to fetch reports");
    }

    return await response.json();
  },

  // Fetch Profile
  async getProfile() {
    const response = await fetch("https://dummyjson.com/users/1");

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return await response.json();
  }
};