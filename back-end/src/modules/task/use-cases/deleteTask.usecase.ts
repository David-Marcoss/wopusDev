import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DeleteTaskUseCases {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, userLoggedId: string): Promise<null> {
    const task = await this.prisma.task.findUnique({
      where: { id, userId: userLoggedId },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return null;
  }
}
