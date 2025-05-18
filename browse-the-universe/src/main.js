import './style.css'
import {fetchAPOD}from "./api/api"
(async function () {
  const data = await fetchAPOD()
  console.log(data)
}) ()

(async function () {
    try {
        const date1 = '1994-05-18'; // This should trigger the limitation error
        const date2 = '2025-05-18'; // This should return APOD data

        // Trying an invalid date
        const data1 = await fetchAPOD(date1);
        console.log(data1);

        // Trying a valid date
        const data2 = await fetchAPOD(date2);
        console.log(data2);
    } catch (error) {
        console.error("Error during fetch:", error.message);
    }
})();