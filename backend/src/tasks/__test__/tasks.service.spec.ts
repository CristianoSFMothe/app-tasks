/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { StatusTasks } from '../../enun/status.enum';
import { TasksEntity } from '../entities/tasks.entity';
import { TasksService } from '../tasks.service';

describe('TasksService Unit Tests', () => {
  let service: TasksService;
  let mockTask: TasksEntity;

  beforeEach(async () => {
    service = new TasksService();

    mockTask = {
      id: '1',
      task: 'Sample Task',
      description: 'Sample Description',
      status: StatusTasks.PENDING,
      createdAt: new Date('01/01/2024, 12:32:02'),
      updatedAt: new Date('01/01/2024, 12:32:02'),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOneTask should return task with formatted dates if task exists', async () => {
    // Mock do método findOne para retornar a tarefa de exemplo
    (service as any).tasksRepository = {
      findOne: jest.fn().mockResolvedValue(mockTask),
    };

    const result = await service.findOneTask('1');

    expect(result).toBeDefined();
    expect(result.id).toBe(mockTask.id);
    expect(result.createdAt).toBe('01/01/2024, 12:32:02');
    expect(result.updatedAt).toBe('01/01/2024, 12:32:02');
  });

  it('findOneTask should throw NotFoundException if task does not exist', async () => {
    // Mock do método findOne para retornar null (tarefa não encontrada)
    (service as any).tasksRepository = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    await expect(service.findOneTask('2')).rejects.toThrow(
      new NotFoundException(`Task 2 not found`),
    );
  });
});
