import axios from "axios";
import { ExperienceDto } from "../models/ExperienceDto";

const API_BASE_URL = "https://localhost:7018/api/Experience";

export const getAllExperiences = async (): Promise<ExperienceDto[]> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.map(
    (exp: any) => new ExperienceDto(exp.experience_id, exp.name, exp.description),
  );
};

export const getExperienceById = async (id: number): Promise<ExperienceDto> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  const exp = response.data;
  return new ExperienceDto(exp.experience_id, exp.name, exp.description);
};

export const createExperience = async (dto: ExperienceDto): Promise<ExperienceDto> => {
  const response = await axios.post(`${API_BASE_URL}`, dto);
  const exp = response.data;
  return new ExperienceDto(exp.experience_id, exp.name, exp.description);
};

export const updateExperience = async (id: number, dto: ExperienceDto): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, dto);
};

export const deleteExperience = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
