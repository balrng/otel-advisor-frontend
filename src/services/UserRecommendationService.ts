import axios from "axios";
import { HotelDto } from "../models/HotelDto";

const API_BASE_URL = "https://localhost:7018/api/UserRecommendation";

export const getRecommendedHotels = async (userId: number): Promise<HotelDto[]> => {
  const response = await axios.post(`${API_BASE_URL}/recommend/${userId}`);
  return response.data.slice(0, 5).map((hotel: any) => 
    new HotelDto(hotel.hotel_id, hotel.name, hotel.location, hotel.rating )
  );
};
