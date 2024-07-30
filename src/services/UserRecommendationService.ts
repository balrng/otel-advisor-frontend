import axios from "axios";
import { HotelDto } from "../models/HotelDto";

const API_BASE_URL = "https://localhost:7018/api/UserRecommendation";

export const getRecommendedHotels = async (userId: number): Promise<HotelDto[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommend/${userId}`);
    return response.data.map(
      (hotel: any) => new HotelDto(hotel.hotel_id, hotel.name, hotel.location, hotel.rating)
    );
  } catch (error) {
    console.error("Error fetching recommended hotels:", error);
    throw error;
  }
};
