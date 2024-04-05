import axios from 'axios';

const API_KEY = '43225123-d236907a3b16930b7c1176894';
const DEFAULT_PER_PAGE = 15;

export async function fetchImages(query, page = 1, perPage = DEFAULT_PER_PAGE) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}
