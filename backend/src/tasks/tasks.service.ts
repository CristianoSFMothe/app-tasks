import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksEntity } from './entities/tasks.entity';

@Injectable()
export class TasksService {
  private tasks: TasksEntity[] = [
    {
      id: 1,
      task: 'Javascript',
      description: 'Estudar javascript',
      status: 'pending',
    },
  ];

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((tasks) => tasks.id === id);

    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return task;
  }

  create(createTasksDto: any) {
    this.tasks.push(createTasksDto);
  }

  update(id: number, taskUpdateDto: any) {
    const existingTasks = this.findOne(id);

    if (existingTasks) {
      const index = this.tasks.findIndex((tasks) => tasks.id === id);

      this.tasks[index] = {
        id,
        ...taskUpdateDto,
      };
    }
  }

  remove(id: number) {
    const index = this.tasks.findIndex((tasks) => tasks.id === id);

    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }
}
