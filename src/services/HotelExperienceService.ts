import axios from "axios";
import { HotelExperienceDto } from "../models/HotelExperienceDto";

const API_BASE_URL = "https://localhost:7018/api/HotelExperience";

export const getAllHotelExperiences = async (): Promise<HotelExperienceDto[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.map(
      (exp: any) => new HotelExperienceDto(exp.hotel_id, exp.experience_id, exp.rating)
    );
  } catch (error) {
    console.error("Error fetching all hotel experiences:", error);
    throw error;
  }
};

export const getHotelExperienceById = async (hotelId: number, experienceId: number): Promise<HotelExperienceDto> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${hotelId}/${experienceId}`);
    const exp = response.data;
    return new HotelExperienceDto(exp.hotel_id, exp.experience_id, exp.rating);
  } catch (error) {
    console.error(`Error fetching hotel experience by id ${hotelId}, ${experienceId}:`, error);
    throw error;
  }
};

export const createHotelExperience = async (dto: HotelExperienceDto): Promise<HotelExperienceDto> => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, dto);
    const exp = response.data;
    return new HotelExperienceDto(exp.hotel_id, exp.experience_id, exp.rating);
  } catch (error) {
    console.error("Error creating hotel experience:", error);
    throw error;
  }
};

export const updateHotelExperience = async (hotelId: number, experienceId: number, dto: HotelExperienceDto): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/${hotelId}/${experienceId}`, dto);
  } catch (error) {
    console.error(`Error updating hotel experience with id ${hotelId}, ${experienceId}:`, error);
    throw error;
  }
};

export const deleteHotelExperience = async (hotelId: number, experienceId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${hotelId}/${experienceId}`);
  } catch (error) {
    console.error(`Error deleting hotel experience with id ${hotelId}, ${experienceId}:`, error);
    throw error;
  }
};
