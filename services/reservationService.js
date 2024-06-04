import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservations';

const createReservation = (reservationData) => {
  return axios.post(API_URL, reservationData);
};

const getAllReservations = () => {
  return axios.get(API_URL);
};

export default {
  createReservation,
  getAllReservations
};
