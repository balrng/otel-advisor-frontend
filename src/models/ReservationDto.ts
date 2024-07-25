export class ReservationDto {
  user_id: number;
  hotel_id: number;
  check_in_date: Date;
  check_out_date: Date;
  budget: number;
  region: string;

  constructor(
    user_id: number,
    hotel_id: number,
    check_in_date: Date,
    check_out_date: Date,
    budget: number,
    region: string,
  ) {
    this.user_id = user_id;
    this.hotel_id = hotel_id;
    this.check_in_date = check_in_date;
    this.check_out_date = check_out_date;
    this.budget = budget;
    this.region = region;
  }
}
