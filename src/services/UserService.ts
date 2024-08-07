import axios from "axios";
import { UserDto } from "../models/UserDto";

const API_BASE_URL = "https://localhost:7018/api/User";

export const getAllUsers = async (): Promise<UserDto[]> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.map(
    (user: any) => new UserDto(user.name, user.email),
  );
};

export const getUserById = async (id: number): Promise<UserDto> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  const user = response.data;
  return new UserDto(user.name, user.email);
};

export const createUser = async (dto: UserDto): Promise<UserDto> => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, dto);
    console.log("createUser response data:", response.data); // Yanıt verilerini loglayın
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request data:", error.request);
      }
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
    throw error;
  }
};

export const updateUser = async (id: number, dto: UserDto): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, dto);
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
