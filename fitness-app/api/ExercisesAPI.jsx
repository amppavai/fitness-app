/* 

RapidAPI:n ohjeistus:

import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
  params: {
    limit: '10',
    offset: '0'
  },
  headers: {
    'x-rapidapi-key': '04b273e4e9msh0d56d5af6908687p1b13b4jsndb52caf4d509',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}*/

import axios from 'axios';

//POISTA COMMITOIDESSA!!
const API_KEY = "04b273e4e9msh0d56d5af6908687p1b13b4jsndb52caf4d509";
const API_URL = 'https://exercisedb.p.rapidapi.com/exercises';

export const getExercisesByBodyPart = async (bodyPart) => {

    const options = {
        method: 'GET',
        url: `${API_URL}/bodyPart/${bodyPart}`,
        params: { limit: '0', offset: '0' },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return [];
    }
};
