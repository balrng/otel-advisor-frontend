import axios from "axios";
import { UserPreferenceDto } from "../models/UserPreferenceDto";

const API_BASE_URL = "https://localhost:7018/api/UserPreference";

export const getAllUserPreferences = async (): Promise<UserPreferenceDto[]> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.map(
    (up: any) =>
      new UserPreferenceDto(up.user_id, up.experience_id, up.priority),
  );
};

export const getUserPreferenceById = async (
  id: number,
): Promise<UserPreferenceDto> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  const up = response.data;
  return new UserPreferenceDto(up.user_id, up.experience_id, up.priority);
};

export const postUserPreference = async (
  dto: UserPreferenceDto,
): Promise<UserPreferenceDto> => {
  const response = await axios.post(`${API_BASE_URL}`, dto);
  const up = response.data;
  return new UserPreferenceDto(up.user_id, up.experience_id, up.priority);
};

export const updateUserPreference = async (
  id: number,
  dto: UserPreferenceDto,
): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, dto);
};

export const deleteUserPreference = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
