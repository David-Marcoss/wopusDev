import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/userRegister.dto';
import { hash } from 'bcrypt';
import { FindUserByEmailUseCases } from './findUserByEmail.usecase';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class RegisterUserUseCases {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCases,
  ) {}

  async execute(
    userData: UserRegisterDto,
  ): Promise<Omit<UserRegisterDto, 'password'>> {
    const { email, name, password } = userData;

    const user = await this.findUserByEmailUseCase.execute(email);
    if (user) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password: await hash(password, 10),
      },
    });

    return { id: newUser.id, email: newUser.email, name: newUser.name };
  }
}
