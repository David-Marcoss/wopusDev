import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Tasks') // Agrupa as rotas no Swagger
@ApiBearerAuth() // Indica que todas as rotas exigem autenticação por token
@Controller('api/v1/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new task' }) // Descrição da rota
  @ApiResponse({ status: 201, description: 'Task successfully created' }) // Respostas esperadas
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createTask(@Body() data: CreateTaskDto, @Req() request: Request) {
    const userId = request['user'].sub;
    return this.taskService.create.execute(data, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Retrieve all tasks for the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAllTasks(@Req() request: Request) {
    const userId = request['user'].sub;
    return this.taskService.findAllTasks.execute(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Retrieve a specific task by ID' })
  @ApiParam({ name: 'id', description: 'ID of the task', type: String }) // Documenta o parâmetro ID
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findTaskById(@Param('id') id: string, @Req() request: Request) {
    const userId = request['user'].sub;
    return this.taskService.findTaskById.execute(id, userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'ID of the task', type: String })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateTask(
    @Param('id') id: string,
    @Body() data: UpdateTaskDto,
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    return this.taskService.update.execute(id, data, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'ID of the task', type: String })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteTask(@Param('id') id: string, @Req() request: Request) {
    const userId = request['user'].sub;
    return this.taskService.delete.execute(id, userId);
  }
}
