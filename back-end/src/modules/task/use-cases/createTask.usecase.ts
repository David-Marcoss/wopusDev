import { PrismaService } from 'src/database/PrismaService';
import { CreateTaskDto } from '../dto/createTask.dto';
import { TaskDto } from '../dto/task.dto';
import { TaskStatus } from '../dto/createTask.dto';

export class CreateTaskUseCases {
  constructor(private prisma: PrismaService) {}

  async execute(task: CreateTaskDto, userId: string): Promise<TaskDto | Error> {
    try {
      const taskCreated = await this.prisma.task.create({
        data: {
          ...task,
          status: TaskStatus[task.status],
          userId,
        },
      });
      return taskCreated;
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  }
}
