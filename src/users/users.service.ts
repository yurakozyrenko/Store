import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { comparePasswords, hashPassword } from '../utils/password.util';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly userRepository: UsersRepository) {}

  async getAllUsers(): Promise<User[]> {
    const [users, count] = await this.userRepository.getAllUsers();

    this.logger.debug(`${count} users successfully get`);

    return users;
  }

  async registerUser({ email, password, role }: CreateUserDto) {
    this.logger.log(`Trying to create User ${email}`);

    const exitingUser = await this.findUser(email);

    if (exitingUser) {
      this.logger.error(`User: ${email} already exist`);
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hashPassword(password);

    const createUserDto: CreateUserDto = {
      email,
      password: hashedPassword,
      role,
    };

    const { raw } = await this.userRepository.createUser(createUserDto);

    this.logger.debug(`User successfully created with id: ${raw[0].id}`);
  }

  async findUser(email: string): Promise<User> {
    this.logger.log(`Trying to find User ${email}`);

    const foundUser = await this.userRepository.findUser(email);

    this.logger.debug(`${foundUser ? 'user ' : 'No user '}found by email: ${email}`);

    return foundUser;
  }
}
