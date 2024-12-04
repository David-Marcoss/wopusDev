import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/userRegister.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class FindUserByIdlUseCases {
  constructor(private readonly prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(id: string): Promise<Omit<UserRegisterDto, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      : null;
  }
}
