import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const saltRounds = Number(configService.get('BCRYPT_SALT_ROUNDS')) || 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
