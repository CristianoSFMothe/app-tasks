/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-tasks.dto';
import { StatusTasks } from 'src/enun/status.enum';
import { TasksEntity } from './entities/tasks.entity';
import { UpdateTaskDetailsDto } from './dtos/update-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return await this.tasksService.findAllTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.tasksService.findOneTask(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDetailsDto: UpdateTaskDetailsDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDetailsDto);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') newStatus: StatusTasks,
  ): Promise<TasksEntity> {
    return this.tasksService.updateStatus(id, newStatus);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
  }
}
