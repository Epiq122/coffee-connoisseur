// for the unsplash api
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
});

// holds our coffee stores options for the static props
const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}%20stores&ll=${latLong}&radius=100000&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  // unsplash search
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30,
  });
  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.API_KEY,
    },
  };
  //

  //49.280276077111516, -123.11876558443677
  const response = await fetch(
    getUrlForCoffeeStores(
      '49.280646310211935%2C-123.16908811464592',
      'coffee',
      8,
    ),
    options,
  );
  const data = await response.json();
  return data.results.map((result, idx) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : '',
      imgUrl: photos[idx],
    };
  });

  // .catch((err) => console.error(err));
};

// arrow icon