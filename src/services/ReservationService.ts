import axios from "axios";
import { ReservationDto } from "../models/ReservationDto";

const API_BASE_URL = "https://localhost:7018/api/Reservation";

export const getAllReservations = async (): Promise<ReservationDto[]> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.map(
    (res: any) =>
      new ReservationDto(
        res.reservation_id,
        res.user_id,
        res.user_name, 
        new Date(res.trip_start),
        new Date(res.trip_end),
        res.budget,
        res.region,
        res.stay_duration,
        res.exp_1,
        res.exp_1_rating,
        res.exp_2,
        res.exp_2_rating,
        res.exp_3,
        res.exp_3_rating,
      ),
  );
};

export const getReservationById = async (
  id: number,
): Promise<ReservationDto> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  const res = response.data;
  return new ReservationDto(
    res.reservation_id,
    res.user_id,
    res.user_name, 
    new Date(res.trip_start),
    new Date(res.trip_end),
    res.budget,
    res.region,
    res.stay_duration,
    res.exp_1,
    res.exp_1_rating,
    res.exp_2,
    res.exp_2_rating,
    res.exp_3,
    res.exp_3_rating,
  );
};

export const createReservation = async (dto: ReservationDto): Promise<ReservationDto> => {
  const response = await axios.post(`${API_BASE_URL}/reservations`, dto);
  const res = response.data;
  return new ReservationDto(
    res.reservation_id,
    res.user_id,
    res.user_name,
    new Date(res.trip_start),
    new Date(res.trip_end),
    res.budget,
    res.region,
    res.stay_duration,
    res.exp_1,
    res.exp_1_rating,
    res.exp_2,
    res.exp_2_rating,
    res.exp_3,
    res.exp_3_rating,
  );
};


export const updateReservation = async (
  id: number,
  dto: ReservationDto,
): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, dto);
};

export const deleteReservation = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
