export class UserPreferenceDto {
  user_id: number;
  experience_id: number;
  priority: number;

  constructor(user_id: number, experience_id: number, priority: number) {
    this.user_id = user_id;
    this.experience_id = experience_id;
    this.priority = priority;
  }
}
