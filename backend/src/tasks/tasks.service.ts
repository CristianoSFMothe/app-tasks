import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksEntity } from './entities/tasks.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) {}

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return task;
  }

  async create(createTasksDto: any) {
    const task = this.tasksRepository.create(createTasksDto);

    return this.tasksRepository.save(task);
  }

  async update(id: number, taskUpdateDto: any) {
    const task = await this.tasksRepository.preload({
      ...taskUpdateDto,
      id,
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return this.tasksRepository.save(task);
  }

  async remove(id: number) {
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
