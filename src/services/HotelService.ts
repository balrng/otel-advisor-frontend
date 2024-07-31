import axios from "axios";
import { HotelDto } from "../models/HotelDto";

const API_BASE_URL = "https://localhost:7018/api/Hotel"; 

export const getAllHotels = async (): Promise<HotelDto[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.map(
      (hotel: any) => new HotelDto(hotel.hotel_id, hotel.name, hotel.location, hotel.rating)
    );
  } catch (error) {
    console.error("Error fetching all hotels:", error);
    throw error;
  }
};

export const getHotelById = async (id: number): Promise<HotelDto> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    const hotel = response.data;
    return new HotelDto(hotel.hotel_id, hotel.name, hotel.location, hotel.rating);
  } catch (error) {
    console.error(`Error fetching hotel by id ${id}:`, error);
    throw error;
  }
};

export const createHotel = async (dto: HotelDto): Promise<HotelDto> => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, dto);
    const hotel = response.data;
    return new HotelDto(hotel.hotel_id, hotel.name, hotel.location, hotel.rating);
  } catch (error) {
    console.error("Error creating hotel:", error);
    throw error;
  }
};

export const updateHotel = async (id: number, dto: HotelDto): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, dto);
  } catch (error) {
    console.error(`Error updating hotel with id ${id}:`, error);
    throw error;
  }
};

export const deleteHotel = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting hotel with id ${id}:`, error);
    throw error;
  }
};
