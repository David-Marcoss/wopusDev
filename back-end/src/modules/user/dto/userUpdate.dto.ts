import { IsString, IsEmail } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiPropertyOptional({ description: 'User name', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email', example: 'johndoe@example.com' })
  @IsEmail()
  @IsString()
  email: string;
}
