import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

const getAllEvents = () => {
  return axios.get(API_URL);
};

export default {
  getAllEvents,
};
