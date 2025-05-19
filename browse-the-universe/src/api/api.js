import axios from 'axios';


const nasa_Url = 'https://api.nasa.gov/planetary/apod?api_key=1VzKK2Hw9x0hf0URqfuLhljrP8TdakfRlDHsegrz';

//This function will validate the date
const validDate = (date) => {
    const minDate = new Date('1995-06-16');
    const requestedDate = new Date(date);
    return requestedDate >= minDate;
};

export const fetchAPOD = async (date) => {
    try {
        console.log("Requested Date:", date); // Logs the requested date
        
        if (date && !validDate(date)) {
            throw new Error('Date must be on or after June 16, 1995.');
        }

        const url = date ? `${nasa_Url}&date=${date}` : nasa_Url; 
        console.log("Constructed URL:", url); // Logs the constructed API URL
        const response = await axios.get(url);
        console.log("API Response Data:", response.data); // Logs the response data

        return response.data; 
    } catch (error) {
        console.error("Error fetching APOD:", error); 
        throw error; 
    }
};



