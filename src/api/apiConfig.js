// const API_KEY = process.env.REACT_APP_NASA_API_KEY;
const DEMO_API_KEY = 'DEMO_KEY';

export const getImagesApiUrl = (date) => 'https://api.nasa.gov/EPIC/api/natural/date/' + date + '?api_key=' + DEMO_API_KEY;

export const getImageUrl = (date, src) => {
    return `https://api.nasa.gov/EPIC/archive/natural/${date.replaceAll('-', '/')}/png/${src}.png?api_key=${DEMO_API_KEY}`;
}