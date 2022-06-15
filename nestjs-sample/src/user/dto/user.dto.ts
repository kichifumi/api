import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserDTO {
  login_id: string;
  password: string;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  admin_flag: number;
}
