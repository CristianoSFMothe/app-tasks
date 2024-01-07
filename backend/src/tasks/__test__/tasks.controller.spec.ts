/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { StatusTasks } from '../../enum/status.enum';
import { CreateTaskDto } from '../dtos/create-tasks.dto';
import { UpdateTaskDetailsDto } from '../dtos/update-tasks.dto';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';
import { randomUUID } from 'crypto';
import { MessageHelper } from '../../helpers/messages/message.helper';

describe('TasksController Unit Test', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;
  let id: string;

  beforeEach(() => {
    id = randomUUID();
    tasksService = new TasksService();
    tasksController = new TasksController(tasksService);
  });

  it('should return all tasks', async () => {
    const mockTasks = [
      {
        id: '1',
        task: 'Sample Task 1',
        description: 'Description 1',
      },
      {
        id: '2',
        task: 'Sample Task 2',
        description: 'Description 2',
      },
    ];

    jest.spyOn(tasksService, 'findAllTasks').mockResolvedValue(mockTasks);

    expect(await tasksController.findAll()).toBe(mockTasks);
  });

  it('should return a task by ID', async () => {
    const taskId = 'some-id';
    const result = {
      id: taskId,
      task: 'Sample Task',
      description: 'Sample Description',
    };

    jest.spyOn(tasksService, 'findOneTask').mockResolvedValue(result);

    expect(await tasksController.findOne(taskId)).toBe(result);
  });

  it('should create a new task', async () => {
    const mockTaskDto: CreateTaskDto = {
      task: 'Sample Task',
      description: 'Sample Description',
    };

    const mockTaskResponse = {
      id: '1',
      task: 'Sample Task',
      description: 'Sample Description',
      status: StatusTasks.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(tasksService, 'createTask').mockResolvedValue(mockTaskResponse);

    const result = await tasksController.create(mockTaskDto);
    expect(result).toBe(mockTaskResponse);
  });

  it('should update a task and return the updated task', async () => {
    const mockId = '1';
    const mockUpdateDto: UpdateTaskDetailsDto = {
      task: 'Updated Task',
      description: 'Updated Description',
    };

    const expectedUpdatedTask = {
      id: mockId,
      task: 'Updated Task',
      description: 'Updated Description',
      status: StatusTasks.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(tasksService, 'updateTask')
      .mockResolvedValue(expectedUpdatedTask);

    const result = await tasksController.update(mockId, mockUpdateDto);

    expect(tasksService.updateTask).toHaveBeenCalledWith(mockId, mockUpdateDto);

    expect(result).toEqual(expectedUpdatedTask);
  });

  it('should remove a task and return the task ID and name', async () => {
    const mockId = '1';
    const mockTask = {
      id: mockId,
      task: 'Sample Task',
      description: 'Sample Description',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const expectedResponse = {
      id: mockId,
      task: 'Sample Task',
    };

    jest.spyOn(tasksService, 'removeTask').mockResolvedValue(expectedResponse);

    const result = await tasksController.remove(mockId);

    expect(tasksService.removeTask).toHaveBeenCalledWith(mockId);

    expect(result).toEqual(expectedResponse);
  });

  it('should throw NotFoundException if task does not exist', async () => {
    const mockId = '2';

    jest
      .spyOn(tasksService, 'removeTask')
      .mockRejectedValue(new NotFoundException(MessageHelper.NOT_FOUND_TASK));

    await expect(tasksController.remove(mockId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
