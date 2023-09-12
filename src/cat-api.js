import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_iaMxPX6DTekpleWMLAqrKPSzFB3g496MDMLMkNOudifHA0gCP5tXftU10D9yiUne';

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  return axios.get(`${BASE_URL}`);
}

export function fetchCatByBreed(breedId) {
  const BASE_URL_SEARCH = 'https://api.thecatapi.com/v1/images/search';
  const catsID = {
    params: {
      breed_ids: breedId,
    },
  };
  return axios.get(`${BASE_URL_SEARCH}`, catsID);
}
