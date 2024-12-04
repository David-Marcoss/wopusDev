import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserUpdateDto } from '../dto/userUpdate.dto';
import { FindUserByIdlUseCases } from './findUserById.usecase';

@Injectable()
export class UpdateUserUseCases {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findlUserByIdUseCases: FindUserByIdlUseCases,
  ) {}

  async execute(
    data: UserUpdateDto,
    userLoggedId: string,
  ): Promise<null | Error> {
    try {
      const user = await this.findlUserByIdUseCases.execute(userLoggedId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userEmail = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (userEmail && userEmail.id !== user.id) {
        throw new NotFoundException('Email already in use');
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data,
      });

      return null;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new Error('Internal server error');
      }
    }
  }
}
