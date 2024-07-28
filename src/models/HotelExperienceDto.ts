export class HotelExperienceDto {
  hotel_id: number;
  experience_id: number;
  rating: number;
  hotel_name?: string;
  experience_name?: string;

  constructor(
    hotel_id: number,
    experience_id: number,
    rating: number,
    hotel_name?: string,
    experience_name?: string,
  ) {
    this.hotel_id = hotel_id;
    this.experience_id = experience_id;
    this.rating = rating;
    this.hotel_name = hotel_name;
    this.experience_name = experience_name;
  }
}
