import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/userRegister.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class FindUserByEmailUseCases {
  constructor(private readonly prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(email: string): Promise<UserRegisterDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    return user ? user : null;
  }
}
