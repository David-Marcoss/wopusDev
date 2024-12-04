import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { RegisterUserUseCases } from './use-cases/registerUser.usecase';
import { FindUserByEmailUseCases } from './use-cases/findUserByEmail.usecase';
import { FindUserByIdlUseCases } from './use-cases/findUserById.usecase';
import { UpdateUserUseCases } from './use-cases/updateTask.usecase';

@Injectable()
export class UserService {
  findUserByEmail = new FindUserByEmailUseCases(this.prisma);
  findUserById = new FindUserByIdlUseCases(this.prisma);
  register = new RegisterUserUseCases(this.prisma, this.findUserByEmail);
  update = new UpdateUserUseCases(this.prisma, this.findUserById);

  constructor(private prisma: PrismaService) {}
}
