import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-tasks.dto';
import { UpdateTaskDto } from './dtos/update-tasks.dto';
import { StatusTasks } from 'src/enun/status.enum';
import { TasksEntity } from './entities/tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return await this.tasksService.findAllTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.tasksService.findOneTask(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Put(':id/status')
  async updateTaskStatus(
    @Param('id') id: number,
    @Body('status') newStatus: StatusTasks,
  ): Promise<TasksEntity> {
    return this.tasksService.updateStatus(id, newStatus);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tasksService.removeTask(id);
  }
}
