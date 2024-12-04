import { IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class userResetPassword {
  @ApiProperty({ description: 'User password', example: 'secret123' })
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @ApiProperty({ description: 'User password', example: 'secret123' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
