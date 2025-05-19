import './style.css'
import {fetchAPOD}from "./api/api"


//This function will populate the birth year select dropdown box
const yearDropdown = () => {
  const yearSelect = document.getElementById('birthYear');
  const startYear = 1995;
  const endYear = 2025;

  //This removes the existing options
  yearSelect.innerHTML = '';

  for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
};



(async function () {
  const data = await fetchAPOD()
  console.log(data)
}) ();

(async function () {
    try {
        const date1 = '1995-06-16'; // This should trigger the limitation error
        const date2 = '2025-05-18'; // This should return APOD data

        // This  invalidates the date
        const data1 = await fetchAPOD(date1);
        console.log(data1);

        // This will validate the date
        const data2 = await fetchAPOD(date2);
        console.log(data2);
    } catch (error) {
        console.error("Error during fetch:", error.message);
    }
})();

