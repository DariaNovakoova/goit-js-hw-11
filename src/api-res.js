import axios from 'axios';
export async function apiFetch(nameOfPicture, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '40988075-de1418e45c03a33efd2d9210c';
  const params = new URLSearchParams({
    key: API_KEY,
    q: nameOfPicture,
    per_page: 40,
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  try {
    const resp = await axios.get(`${BASE_URL}?${params}`);
    return {
      hits: resp.data.hits,
      totalHits: resp.data.totalHits,
    };
  } catch (err) {
    console.error('Error fetching images:', err);
  }
}
