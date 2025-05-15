import axios from 'axios';


const nasa_Url = 'https://api.nasa.gov/planetary/apod?api_key=1VzKK2Hw9x0hf0URqfuLhljrP8TdakfRlDHsegrz';

export const fetchAPOD = async (date) => {
    try {
        const url = date ? `${nasa_Url}&date=${date}` : nasa_Url; 
        const response = await axios.get(url); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching APOD:", error); 
        throw error; 
    }
};


