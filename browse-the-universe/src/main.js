// Import the fetchAPOD function from your api.js file
import { fetchAPOD } from "./api/api"; // Ensure this path is correct

const displayUniverseImage = async () => {
    const dateInput = document.getElementById("birthYear").value; // Get the value from input
    console.log("Selected Date Input:", dateInput); // Log selected date for debugging

    // Check if the input is empty
    if (!dateInput) {
        alert("Please select a birthday.");
        return; // Exit early if no date selected
    }

    const selectedDate = new Date(dateInput); // Convert the input to a Date object
    console.log("Constructed Date:", selectedDate); // Log the constructed Date object

    // Ensure the date is valid and on or after June 16, 1995
    const minDate = new Date('1995-06-16'); // Minimum valid date
    if (selectedDate < minDate || isNaN(selectedDate.getTime())) {
        alert("Please select a date on or after June 16, 1995.");
        return; // Exit early to prevent fetch call
    }

    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    console.log("Formatted Date for Fetch:", formattedDate); // Log the formatted date for API

    try {
        // Fetch the data with formatted date
        const data = await fetchAPOD(formattedDate); 
        console.log("API Response Data:", data); // Log the API response

        if (data && data.url) {
            const imageContainer = document.getElementById("uniphoto");
            imageContainer.innerHTML = `<img src="${data.url}" alt="${data.title || 'Universe Image'}" class="rounded shadow-md mt-4">`;
        } else {
            console.error("No image URL found in API response.");
            alert("No image available for the selected date.");
        }
    } catch (error) {
        console.error("Error during fetch:", error.message);
        alert("Error fetching image. Please try another date.");
    }
};

// Attach an event listener to the button to trigger the image display
document.getElementById("submit").addEventListener("click", displayUniverseImage);

// Optionally, focus the date input when the page loads
document.getElementById("birthYear").focus();