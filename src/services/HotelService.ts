import axios from "axios";
import { HotelDto } from "../models/HotelDto";

const API_BASE_URL = "https://localhost:7018/api/Hotel";

export const getAllHotels = async (): Promise<HotelDto[]> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.map(
    (hotel: any) => new HotelDto(hotel.name, hotel.location, hotel.rating),
  );
};

export const getHotelById = async (id: number): Promise<HotelDto> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  const hotel = response.data;
  return new HotelDto(hotel.name, hotel.location, hotel.rating);
};

export const createHotel = async (dto: HotelDto): Promise<HotelDto> => {
  const response = await axios.post(`${API_BASE_URL}`, dto);
  const hotel = response.data;
  return new HotelDto(hotel.name, hotel.location, hotel.rating);
};

export const updateHotel = async (id: number, dto: HotelDto): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, dto);
};

export const deleteHotel = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
