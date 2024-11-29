import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { RegisterUserUseCases } from './use-cases/registerUser.usecase';
import { FindUserByEmailUseCases } from './use-cases/findUserByEmail.usecase';

@Injectable()
export class UserService {
  findUserByEmail = new FindUserByEmailUseCases(this.prisma);
  register = new RegisterUserUseCases(this.prisma, this.findUserByEmail);

  constructor(private prisma: PrismaService) {}
}
