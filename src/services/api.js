import axios from 'axios';

const API_KEY = 'ab90369d4e4e22ac2b80f7c356a29dd6';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};