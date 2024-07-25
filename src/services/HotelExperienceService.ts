import axios from "axios";
import { HotelExperienceDto } from "../models/HotelExperienceDto";

const API_BASE_URL = "https://localhost:7018/api/HotelExperience";

export const getAllHotelExperiences = async (): Promise<
  HotelExperienceDto[]
> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.map(
    (he: any) =>
      new HotelExperienceDto(he.hotel_id, he.experience_id, he.rating),
  );
};

export const getHotelExperienceById = async (
  id: number,
): Promise<HotelExperienceDto> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  const he = response.data;
  return new HotelExperienceDto(he.hotel_id, he.experience_id, he.rating);
};

export const createHotelExperience = async (
  dto: HotelExperienceDto,
): Promise<HotelExperienceDto> => {
  const response = await axios.post(`${API_BASE_URL}`, dto);
  const he = response.data;
  return new HotelExperienceDto(he.hotel_id, he.experience_id, he.rating);
};

export const updateHotelExperience = async (
  id: number,
  dto: HotelExperienceDto,
): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, dto);
};

export const deleteHotelExperience = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
