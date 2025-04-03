import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.registerUser(createUserDto);
    throw new HttpException('User успешно создан', HttpStatus.CREATED);
  }
}
