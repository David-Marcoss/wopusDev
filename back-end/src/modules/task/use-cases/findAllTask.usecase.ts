import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class FindAllTasksUseCases {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userLoggedId: string): Promise<TaskDto[] | Error> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: { userId: userLoggedId },
      });

      return tasks;
    } catch (error) {
      throw new Error('Internal server error');
    }
  }
}
