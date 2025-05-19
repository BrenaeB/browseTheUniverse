// In your src/main.js

import { fetchAPOD } from "./api/api"; 

const displayUniverseImage = async () => {
    const dateInput = document.getElementById("birthYear").value; // Get the selected date input
    console.log("Selected Date Input:", dateInput); // Log the selected date input

    if (!dateInput) { 
        alert("Please select a birthday."); // Alert user if no date is selected
        return; 
    }

    const selectedDate = new Date(dateInput); // Create a Date object from the input
    console.log("Constructed Date:", selectedDate); // Log the constructed date

    const minDate = new Date('1995-06-16'); // Define the minimum date
    if (selectedDate < minDate || isNaN(selectedDate.getTime())) { // Validate the selected date
        alert("Please select a date on or after June 16, 1995."); // Alert user if the date is too early
        return; 
    }

    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date for the API
    console.log("Formatted Date for Fetch:", formattedDate); // Log the formatted date

    try {
        const data = await fetchAPOD(formattedDate); // Call the API with the formatted date
        
        // Insert the console.log statement here to inspect the data returned by the API
        console.log("API Response Data:", data); // Log the entire response data to inspect its structure

        if (data && data.url) {
    const imageContainer = document.getElementById("uniphoto");
    imageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title || 'Universe Image'}" class="rounded shadow-md">
        <div class="text-container">
            <h2 class="image-title">${data.title}</h2>
            <p class="image-description">${data.explanation}</p>
        </div>
    `;
        } else {
            console.error("No image URL found in API response."); // Log an error if no image URL was found
            alert("No image available for the selected date."); // Alert user if no image is available
        }
    } catch (error) {
        console.error("Error during fetch:", error.message); // Log any errors that occur during fetch
        alert("Error fetching image. Please try another date."); // Alert user of the error
    }
};

// Attach an event listener to the button to trigger the image display
document.getElementById("submit").addEventListener("click", displayUniverseImage);
document.getElementById("birthYear").focus(); // Focus on the date input