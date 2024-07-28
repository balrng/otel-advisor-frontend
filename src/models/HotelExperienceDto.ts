export class HotelExperienceDto {
  hotel_id: number;
  experience_id: number;
  rating: number;

  constructor(hotel_id: number, experience_id: number, rating: number) {
    this.hotel_id = hotel_id;
    this.experience_id = experience_id;
    this.rating = rating;
  }
}
