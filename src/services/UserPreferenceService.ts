import axios from "axios";
import { UserPreferenceDto } from "../models/UserPreferenceDto";

const API_BASE_URL = "https://localhost:7018/api/userPreference";

export const getAllUserPreferences = async (): Promise<UserPreferenceDto[]> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.map(
    (userPreference: any) =>
      new UserPreferenceDto(
        userPreference.user_id,
        userPreference.experience_id,
        userPreference.priority,
      ),
  );
};

export const getUserPreferenceById = async (
  id: number,
): Promise<UserPreferenceDto> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  const userPreference = response.data;
  return new UserPreferenceDto(
    userPreference.user_id,
    userPreference.experience_id,
    userPreference.priority,
  );
};

export const createUserPreference = async (
  dto: UserPreferenceDto,
): Promise<UserPreferenceDto> => {
  const response = await axios.post(`${API_BASE_URL}`, dto);
  const userPreference = response.data;
  return new UserPreferenceDto(
    userPreference.user_id,
    userPreference.experience_id,
    userPreference.priority,
  );
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
