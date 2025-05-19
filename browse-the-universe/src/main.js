import './style.css';
import { fetchAPOD } from "./api/api";

const yearDropdown = () => {
    const yearSelect = document.getElementById('birthYear');
    const startYear = 1995; // Start year
    const endYear = 2025;   // End year

    // This removes the existing options
    yearSelect.innerHTML = ''; 

    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year; // Ensure this matches the selected value type
        option.textContent = year; 
        yearSelect.appendChild(option);
    }
};

// Call yearDropdown on DOMContentLoaded or when needed
document.addEventListener("DOMContentLoaded", yearDropdown);


const displayUniverseImage = async (year) => {
    const minDate = new Date('1995-06-16'); // Minimum valid date
    const selectedDate = new Date(`${year}-06-16`); // Create date for June 16 of the selected year

    console.log("Selected Year:", year); // Log the selected year
    console.log("Constructed Date:", selectedDate); // Log the constructed date

    if (selectedDate < minDate || isNaN(selectedDate.getTime())) {
        alert("Please select a year on or after June 16, 1995.");
        return; // Early exit to prevent fetch call
    }

    try {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
        console.log("Formatted Date for Fetch:", formattedDate); // Log the formatted date for API

        const data = await fetchAPOD(formattedDate); // Pass formatted date to fetchAPOD
        if (data && data.url) {
            const imageContainer = document.getElementById("universe-image");
            imageContainer.innerHTML = `<img src="${data.url}" alt="${data.title || 'Universe Image'}" class="rounded shadow-md mt-4">`;
        } else {
            console.error("No data returned for the selected date.");
            alert("No image available for the selected date.");
        }
    } catch (error) {
        console.error("Error during fetch:", error.message);
        alert("Error fetching image. Please try another date.");
    }
};