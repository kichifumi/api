import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserDTO {
  usename: string;
  password: string;
}
