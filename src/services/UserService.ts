import axios from "axios";
import { UserDto } from "../models/UserDto";

const API_BASE_URL = "https://localhost:7018/api/User";

export const getAllUsers = async (): Promise<UserDto[]> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.map((user: any) => new UserDto(user.name, user.email));
};

export const getUserById = async (id: number): Promise<UserDto> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  const user = response.data;
  return new UserDto(user.name, user.email);
};

export const createUser = async (dto: UserDto): Promise<UserDto> => {
  const response = await axios.post(`${API_BASE_URL}`, dto);
  const user = response.data;
  return new UserDto(user.name, user.email);
};

export const updateUser = async (id: number, dto: UserDto): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, dto);
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
