import axios from 'axios';

const API_KEY = '51015530-5e955df2a81e83cea790abd16';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1, perPage = 15) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });

  try {
    const response = await axios.get('', { params });
    return response;
  } catch (error) {
    throw error;
  }
};