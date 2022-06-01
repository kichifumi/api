import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserDTO {
  email: string;
  password: string;
  name: string;
}
