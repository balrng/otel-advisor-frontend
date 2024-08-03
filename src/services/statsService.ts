import axios from 'axios';

const API_BASE_URL = "https://localhost:7018/api";

export interface Stats {
  users: number;
  reservations: number;
  hotels: number;
  experiences: number;
}

export interface Reservation {
  reservation_id: number;
  user_name: string;
}

export const getStats = async (): Promise<Stats> => {
  const [usersResponse, reservationsResponse, hotelsResponse, experiencesResponse] = await Promise.all([
    axios.get(`${API_BASE_URL}/User`),
    axios.get(`${API_BASE_URL}/Reservation`),
    axios.get(`${API_BASE_URL}/Hotel`),
    axios.get(`${API_BASE_URL}/Experience`)
  ]);

  return {
    users: usersResponse.data.length,
    reservations: reservationsResponse.data.length,
    hotels: hotelsResponse.data.length,
    experiences: experiencesResponse.data.length
  };
};

export const getRecentReservations = async (): Promise<Reservation[]> => {
  const response = await axios.get(`${API_BASE_URL}/Reservation`);
  return response.data.slice(-5); // Get last 5 reservations
};
