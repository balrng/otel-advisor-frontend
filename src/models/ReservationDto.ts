export class ReservationDto {
  reservation_id: number;
  user_id: number;
  check_in_date: Date;
  check_out_date: Date;
  budget: number;
  region: string;

  constructor(
    reservation_id: number,
    user_id: number,
    check_in_date: Date,
    check_out_date: Date,
    budget: number,
    region: string,
  ) {
    this.reservation_id = reservation_id;
    this.user_id = user_id;
    this.check_in_date = check_in_date;
    this.check_out_date = check_out_date;
    this.budget = budget;
    this.region = region;
  }
}
