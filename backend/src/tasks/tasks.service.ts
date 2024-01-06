import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksEntity } from './entities/tasks.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDto } from './dtos/update-tasks.dto';
import { CreateTaskDto } from './dtos/create-tasks.dto';
import { StatusTasks } from 'src/enun/status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) {}

  formatDate(date: Date): string {
    return date.toLocaleString(); // Isso retorna a data e hora no formato local do usuário
  }

  async findAllTasks(): Promise<any[]> {
    const tasks: TasksEntity[] = await this.tasksRepository.find(); // Buscando todas as tarefas do banco de dados
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulando uma operação demorada

    return tasks.map((task) => ({
      ...task,
      createdAt: this.formatDate(task.createdAt),
      updatedAt: this.formatDate(task.updatedAt),
    }));
  }

  async findOneTask(id: number): Promise<any> {
    const task: TasksEntity = await this.tasksRepository.findOne({
      where: {
        id,
      },
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

  async updateTask(id: number, taskUpdateDto: UpdateTaskDto) {
    const task = await this.tasksRepository.preload({
      ...taskUpdateDto,
      id,
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return this.tasksRepository.save(task);
  }

  async updateStatus(id: number, newStatus: StatusTasks): Promise<TasksEntity> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    task.status = newStatus;

    return this.tasksRepository.save(task);
  }

  async removeTask(id: number) {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return this.tasksRepository.remove(task);
  }
}
