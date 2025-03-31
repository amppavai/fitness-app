/* 

RapidAPI:n ohjeistus:

import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/status',
  headers: {
    'x-rapidapi-key': 'MY_API_KEY',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
} */


import axios from "axios";

const API_URL = "https://exercisedb.p.rapidapi.com/exercises";
const API_KEY = "MY_API_KEY";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
});

export const getExercisesByBodyPart = async (bodyPart) => {
    try {
        const response = await apiClient.get(`/bodyPart/${bodyPart}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return [];
    }
};
