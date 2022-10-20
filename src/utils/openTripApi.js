export const BASE_URL = 'https://api.opentripmap.com/0.1/en/places';
export const API_KEY = '5ae2e3f221c38a28845f05b6fd4cf53d0344c5ac0cdf7e621bc6ee07';
export const SEARCH_RADIUS = '5000';
export const DATA_SOURCE = 'wikidata';
export const RATING = '3';
export const RESPONSE_FORMAT = 'json';
export const RESPONSE_LIMIT = '3';

export const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(res);
  }
  return res.json();
};

// GET LOCATION COORDINATES FROM QUERIED NAME //
export const getLocationCoordinates = (locationName) => fetch(`${BASE_URL}/geoname?name=${locationName}&apikey=${API_KEY}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})
  .then((res) => getResponseData(res));

// CREATE A RADIUS AROUND LOCATION COORDINATES AND RECEIVE PLACES OF INTEREST IN RESPONSE //
export const createLocationRadius = (locationCoordinates) => fetch(`${BASE_URL}/radius?radius=${SEARCH_RADIUS}
  &lon=${locationCoordinates.lon}&lat=${locationCoordinates.lat}
  &src_geom=${DATA_SOURCE}&src_attr=${DATA_SOURCE}&rate=${RATING}
  &format=${RESPONSE_FORMAT}&limit=${RESPONSE_LIMIT}&apikey=${API_KEY}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})
  .then((res) => getResponseData(res));

// GET SPECIFIC INFO ABOUT RECEIVED PLACES OF INTEREST WITH ID //
export const getLocationsInfo = (locations) => Promise.all(locations.map((location) => fetch(`${BASE_URL}/xid/${location.xid}?apikey=${API_KEY}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})))
  .then((response) => Promise.all(response.map((res) => getResponseData(res))));

// FULL QUERY FUNCTION TO USE IN APP FILE //
export const getLocations = (locationName) => {
  getLocationCoordinates(locationName)
    .then((locationCoordinates) => createLocationRadius(locationCoordinates))
    .then((locations) => getLocationsInfo(locations))
    .catch((err) => console.log(err));
};
