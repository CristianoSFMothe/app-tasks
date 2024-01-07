/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { StatusTasks } from '../../enum/status.enum';
import { TasksEntity } from '../entities/tasks.entity';
import { TasksService } from '../tasks.service';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from '../dtos/create-tasks.dto';
import { UpdateTaskDetailsDto } from '../dtos/update-tasks.dto';
import { MessageHelper } from '../../helpers/messages/message.helper';

describe('TasksService Unit Tests', () => {
  let service: TasksService;
  let mockTask: TasksEntity;
  let mockTaskRepository: any;
  let id: string;

  beforeEach(async () => {
    service = new TasksService();

    id = randomUUID();

    mockTaskRepository = {
      create: jest.fn().mockImplementation((dto: CreateTaskDto) => dto),
      save: jest
        .fn()
        .mockImplementation((task: TasksEntity) => Promise.resolve(task)),
    };

    mockTask = {
      id,
      task: 'Sample Task',
      description: 'Sample Description',
      status: StatusTasks.PENDING,
      createdAt: new Date('01/01/2024, 12:32:02'),
      updatedAt: new Date('01/01/2024, 12:32:02'),
    };

    mockTaskRepository = {
      findOne: jest.fn().mockResolvedValue(mockTask),
      create: jest.fn().mockImplementation((dto: CreateTaskDto) => dto),
      save: jest
        .fn()
        .mockImplementation((task: TasksEntity) => Promise.resolve(task)),
      remove: jest.fn().mockResolvedValue(mockTask),
    };

    (service as any).tasksRepository = mockTaskRepository;
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
    (service as any).tasksRepository = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    await expect(service.findOneTask('2')).rejects.toThrow(
      new NotFoundException(MessageHelper.NOT_FOUND_TASK),
    );
  });

  it('createTask should return a created task', async () => {
    const createTaskDto: CreateTaskDto = {
      task: 'Sample Task',
      description: 'Sample Description',
      status: StatusTasks.PENDING,
    };

    const result = await service.createTask(createTaskDto);

    expect(result).toBeDefined();
    expect(result.task).toBe(createTaskDto.task);
    expect(result.description).toBe(createTaskDto.description);
    expect(result.status).toBe(createTaskDto.status);
  });

  it('updateTask should update and return the updated task', async () => {
    const id = '1';
    const updateDto: UpdateTaskDetailsDto = {
      task: 'Updated Task',
      description: 'Updated Description',
    };

    const mockTask: TasksEntity = {
      id,
      task: 'Sample Task',
      description: 'Sample Description',
      status: StatusTasks.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockTaskRepository.findOne.mockResolvedValue(mockTask);

    const updatedTask: TasksEntity = {
      ...mockTask,
      ...updateDto,
    };

    mockTaskRepository.save.mockResolvedValue(updatedTask);

    const result = await service.updateTask(id, updateDto);

    expect(result).toBeDefined();
    expect(result.task).toBe(updateDto.task);
    expect(result.description).toBe(updateDto.description);
  });

  it('updateStatus should update the status of the task and return the updated task', async () => {
    const id = '1';
    const newStatus: StatusTasks = StatusTasks.TODO;

    const mockTask: TasksEntity = {
      id,
      task: 'Sample Task',
      description: 'Sample Description',
      status: StatusTasks.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockTaskRepository.findOne.mockResolvedValue(mockTask);

    const updatedTask: TasksEntity = {
      ...mockTask,
      status: newStatus,
    };

    mockTaskRepository.save.mockResolvedValue(updatedTask);

    const result = await service.updateStatus(id, newStatus);

    expect(result).toBeDefined();
    expect(result.status).toBe(newStatus);
  });

  it('updateStatus should throw NotFoundException if task does not exist', async () => {
    const id = '2';
    const newStatus: StatusTasks = StatusTasks.TODO;

    mockTaskRepository.findOne.mockResolvedValue(null);

    await expect(service.updateStatus(id, newStatus)).rejects.toThrow(
      new NotFoundException(MessageHelper.NOT_FOUND_TASK),
    );
  });

  it('removeTask should remove the task and return the task ID and name', async () => {
    const id = '1';

    const mockTask: TasksEntity = {
      id,
      task: 'Sample Task',
      description: 'Sample Description',
      status: StatusTasks.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockTaskRepository.findOne.mockResolvedValue(mockTask);
    mockTaskRepository.remove.mockResolvedValue(mockTask);

    const result = await service.removeTask(id);

    expect(result).toBeDefined();
    expect(result.id).toBe(id);
    expect(result.task).toBe(mockTask.task);
  });

  it('removeTask should throw NotFoundException if task does not exist', async () => {
    const id = '2';

    mockTaskRepository.findOne.mockResolvedValue(null);

    await expect(service.removeTask(id)).rejects.toThrow(
      new NotFoundException(MessageHelper.NOT_FOUND_TASK),
    );
  });
});
