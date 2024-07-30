export class HotelDto {
  hotel_id: number;
  name: string;
  location: string;
  rating: number;

  constructor(hotel_id: number, name: string, location: string, rating: number) {
    this.hotel_id = hotel_id;
    this.name = name;
    this.location = location;
    this.rating = rating;
  }
}
