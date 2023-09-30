import axios from 'axios';

const Key = '39735562-579f9e47f6a2ff3df54c66458';

axios.defaults.baseUrl = 'https://pixabay.com/api/';

async function fetchImg(userInput) {
  try {
    const response = await axios.get('',
      {
        params: {
          key: Key,
          q: userInput,
          image_type: photo,
          orientation: horizontal,
          safesearch: true,
          per_page: 40,

        }
      }
    );
    return await response.data;
  } catch (error) {
    return new Error('Sorry, there are no images matching your search query. Please try again.');

  }
}

export { fetchImg };


