export class HotelDto {
  name: string;
  location: string;
  rating: number;
  user_id: PropertyKey | undefined;

  constructor(name: string, location: string, rating: number) {
    this.name = name;
    this.location = location;
    this.rating = rating;
  }
}
