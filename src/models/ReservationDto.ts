export class ReservationDto {
  constructor(
    public reservation_id: number,
    public user_id: number,
    public user_name: string,
    public trip_start: Date,
    public trip_end: Date,
    public budget: number,
    public region: string,
    public stay_duration: number,
    public exp_1: string,
    public exp_1_rating: number,
    public exp_2: string,
    public exp_2_rating: number,
    public exp_3: string,
    public exp_3_rating: number,
  ) {}
}
