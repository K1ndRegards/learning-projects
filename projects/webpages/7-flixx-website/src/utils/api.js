const API_KEY = '7bba1d904d0c7d24b51f3244b5929108';
const API_URL = 'https://api.themoviedb.org/3';

export async function fetchAPIData(endpoint) {
  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`,
  );

  const data = await response.json();

  return data;
}
