import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @ApiProperty({
    description: 'Task ID',
    example: '60f2e2a9c9f7b1c3b0c6e0b6',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Task description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Task completion status',
    example: 'true',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @ApiProperty({
    description: 'Task creation date',
    example: '2021-07-18T15:00:00.000Z',
  })
  completedAt: Date;

  @ApiProperty({
    description: 'Task status',
    example: 'OPEN',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Task user ID',
    example: '60f2e2a9c9f7b1c3b0c6e0b6',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Task creation date',
    example: '2021-07-18T15:00:00.000Z',
  })
  createdAt: Date;
}
