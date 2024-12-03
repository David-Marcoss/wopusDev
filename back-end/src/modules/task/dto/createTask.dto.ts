import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TaskStatus {
  PENDENTE = 'PENDENTE',
  CONCLUIDA = 'CONCLUIDA',
  EM_PROGRESSO = 'EM_PROGRESSO',
}

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Task title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Task description',
  })
  @IsNotEmpty()
  @IsString()
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
    description: 'Task status',
    example: 'PENDENTE',
    enum: TaskStatus,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    description: 'Task completion date',
    example: '2021-07-18T15:00:00.000Z',
  })
  completedAt: Date;
}
