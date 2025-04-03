import { IsEmail, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { User } from '../entity/users.entity';

export class UserDto {
  @IsInt()
  id: User['id'];

  @IsEmail()
  email: User['email'];

  @IsString()
  @Length(8, 40)
  password: User['password'];

  @IsOptional()
  role: User['role'];
}
