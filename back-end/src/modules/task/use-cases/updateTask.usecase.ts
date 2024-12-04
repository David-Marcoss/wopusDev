import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UpdateTaskDto } from '../dto/updateTaskDto';
import { TaskDto } from '../dto/task.dto';
import { TaskStatus } from '../dto/createTask.dto';

@Injectable()
export class UpdateTaskUseCases {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    id: string,
    data: UpdateTaskDto,
    userLoggedId: string,
  ): Promise<TaskDto> {
    const task = await this.prisma.task.findUnique({
      where: { id, userId: userLoggedId },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        ...data,
        status: data.status ? TaskStatus[data.status] : TaskStatus[task.status],
      },
    });

    return updatedTask;
  }
}
