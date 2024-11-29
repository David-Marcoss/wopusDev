import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class FindTaskByIdUseCases {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, userLoggedId: string): Promise<TaskDto> {
    const task = await this.prisma.task.findUnique({
      where: { id, userId: userLoggedId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
