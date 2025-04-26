import axios from 'axios';

const baseUrl = 'https://exercisedb.p.rapidapi.com';
const API_KEY = "04b273e4e9msh0d56d5af6908687p1b13b4jsndb52caf4d509";

const apiCall = async (url, params = {}) => {
    try {
        const options = {
            method: 'GET',
            url: url,
            params,
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return [];
    }
}

export const getExercisesByBodyPart = async (bodyPart) => {
    const thisUrl = baseUrl + `/exercises/bodyPart/${bodyPart}`;
    console.log('url is: ', thisUrl);
    const data = await apiCall(thisUrl);
    return data;
};

export const getAllExercises = async () => {
    const data = await apiCall(`${baseUrl}/exercises`);
    return data;
};
