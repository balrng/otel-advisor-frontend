export class UserDto {
  user_id: number;
  name: string;
  email: string;

  constructor(user_id: number, name: string, email: string) {
    this.user_id = user_id;
    this.name = name;
    this.email = email;
  }
}
