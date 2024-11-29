import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/userRegister.dto';

@Injectable()
export class FindlUserByIdUseCases {
  constructor() {}

  async execute(): Promise<UserRegisterDto | null> {
    return null;
  }
}
