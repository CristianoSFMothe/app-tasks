/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksEntity } from './entities/tasks.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create-tasks.dto';
import { StatusTasks } from '../enun/status.enum';
import { UpdateTaskDetailsDto } from './dtos/update-tasks.dto';
import { UpdateTaskStatusDto } from './dtos/update-status-task.dto';

@Injectable()
export class TasksService {
  @InjectRepository(TasksEntity)
  private readonly tasksRepository: Repository<TasksEntity>;

  formatDate(date: Date): string {
    return date.toLocaleString();
  }

  async findAllTasks(): Promise<any[]> {
    const tasks: TasksEntity[] = await this.tasksRepository.find(); 
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return tasks.map((task) => ({
      ...task,
      createdAt: this.formatDate(task.createdAt),
      updatedAt: this.formatDate(task.updatedAt),
    }));
  }

  async findOneTask(id: string): Promise<any> {
    const task = await this.tasksRepository.findOne({
      where: {
        id
      }
    });
  
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  
    return {
      ...task,
      createdAt: this.formatDate(task.createdAt),
      updatedAt: this.formatDate(task.updatedAt),
    };
  }
  

  async createTask(createTasksDto: CreateTaskDto): Promise<TasksEntity> {
    const task = this.tasksRepository.create(createTasksDto);

    return this.tasksRepository.save(task);
  }

  async updateTask(id: string, { task, description }: UpdateTaskDetailsDto) {
    const existingTask = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    existingTask.task = task ?? existingTask.task;
    existingTask.description = description ?? existingTask.description;

    return this.tasksRepository.save(existingTask);
  }

  async updateStatus(id: string, newStatus: StatusTasks): Promise<UpdateTaskStatusDto> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });
  
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  
    task.status = newStatus;
    await this.tasksRepository.save(task);
  
    return {
      status: task.status,
    };
  }
  

  async removeTask(id: string): Promise<{ id: string; task: string }> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    await this.tasksRepository.remove(task);

    return { id, task: task.task };
  }
}
