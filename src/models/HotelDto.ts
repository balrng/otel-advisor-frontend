export class HotelDto {
  name: string;
  location: string;
  rating: number;

  constructor(name: string, location: string, rating: number) {
    this.name = name;
    this.location = location;
    this.rating = rating;
  }
}
