export class ExperienceDto {
  experience_id: number;
  name: string;
  description: string;

  constructor(experience_id: number, name: string, description: string) {
    this.experience_id = experience_id;
    this.name = name;
    this.description = description;
  }
}
