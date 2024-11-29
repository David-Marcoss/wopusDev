import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FindTaskByIdUseCases } from './use-cases/findTaskById.usecase';
import { FindAllTasksUseCases } from './use-cases/findAllTask.usecase';
import { CreateTaskUseCases } from './use-cases/createTask.usecase';
import { UpdateTaskUseCases } from './use-cases/updateTask.usecase';
import { DeleteTaskUseCases } from './use-cases/deleteTask.usecase';

@Injectable()
export class TaskService {
  findTaskById = new FindTaskByIdUseCases(this.prisma);
  findAllTasks = new FindAllTasksUseCases(this.prisma);
  create = new CreateTaskUseCases(this.prisma);
  update = new UpdateTaskUseCases(this.prisma);
  delete = new DeleteTaskUseCases(this.prisma);

  constructor(private prisma: PrismaService) {}
}
