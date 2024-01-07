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
import { TasksEntity } from './entities/tasks.entity';
import { UpdateTaskDetailsDto } from './dtos/update-tasks.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTaskStatusDto } from './dtos/update-status-task.dto';
import { GetAllTasksSwagger } from './dtos/swagger/get-all-task.dto';
import { CreateTasksSwagger } from './dtos/swagger/create-task.dto';
import { UpdatedTasksSwagger } from './dtos/swagger/updated-task.dto';
import { UpdatedStatusTasksSwagger } from './dtos/swagger/updated-status-task.dto';
import { DeleteTasksSwagger } from './dtos/swagger/delete-task.dto';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../helpers/swagger/not-foud.swagger';
import { MessageHelperSwagger } from '../helpers/messages/message.swagger.helper';
import { MessageHelper } from '../helpers/messages/message.helper';

@ApiTags('Lista de tarefas')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: MessageHelperSwagger.GET_ALL_TASKS })
  @ApiResponse({
    status: 200,
    description: MessageHelperSwagger.GET_ALL_TASKS,
    type: GetAllTasksSwagger,
    isArray: true,
  })
  async findAll(): Promise<any[]> {
    return await this.tasksService.findAllTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: MessageHelperSwagger.GET_BY_ID_TASK })
  @ApiResponse({
    status: 200,
    description: MessageHelperSwagger.GET_BY_ID_TASK,
    type: GetAllTasksSwagger,
  })
  @ApiResponse({
    status: 404,
    description: MessageHelper.NOT_FOUND_TASK,
    type: NotFoundSwagger
  })
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.tasksService.findOneTask(id);
  }

  @Post()
  @ApiOperation({ summary: MessageHelperSwagger.CREATE_TASK })
  @ApiResponse({
    status: 201,
    description: MessageHelperSwagger.MSG_CREATE_TASK,
    type: CreateTasksSwagger,
  })
  @ApiResponse({ 
    status: 400, 
    description: MessageHelperSwagger.INVALID_DATA,
    type: BadRequestSwagger
   })
  @ApiBody({
    description: 'Dados para informar para criação da tarefa',
    type: CreateTasksSwagger,
  })
  create(@Body() createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: MessageHelperSwagger.UPTADE_TASK,
  })
  @ApiResponse({
    status: 200,
    description: MessageHelperSwagger.UPTADE_TASK,
    type: GetAllTasksSwagger,
  })
  @ApiResponse({ 
    status: 400, 
    description: MessageHelperSwagger.INVALID_DATA,
    type: BadRequestSwagger
   })
   @ApiResponse({ 
    status: 404, 
    description: MessageHelper.NOT_FOUND_TASK,
    type: NotFoundSwagger
   })
  @ApiBody({
    description: MessageHelperSwagger.UPTADE_TASK,
    type: UpdatedTasksSwagger
  })
  update(
    @Param('id') id: string,
    @Body() updateTaskDetailsDto: UpdateTaskDetailsDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDetailsDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: MessageHelperSwagger.UPTADE_TASK_STATUS })
  @ApiOperation({
    summary: MessageHelperSwagger.UPTADE_TASK_STATUS,
  })
  @ApiResponse({
    status: 200,
    description: MessageHelperSwagger.UPTADE_TASK_STATUS,
    type: GetAllTasksSwagger,
  })
  @ApiResponse({ 
    status: 400, 
    description: MessageHelperSwagger.INVALID_DATA,
    type: BadRequestSwagger
   })
  @ApiResponse({ 
    status: 404, 
    description: MessageHelper.NOT_FOUND_TASK,
    type: NotFoundSwagger
   })
  @ApiBody({
    description: MessageHelperSwagger.UPTADE_TASK_STATUS,
    type: UpdatedStatusTasksSwagger
  })
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<UpdateTaskStatusDto> {
    return this.tasksService.updateStatus(id, updateTaskStatusDto.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: MessageHelperSwagger.SUMMARY_DELETE })
  @ApiResponse({ 
    status: 200, 
    description: MessageHelperSwagger.DESCRIPTION_CREATE,
    type: DeleteTasksSwagger
   })
  @ApiResponse({ 
    status: 404, 
    description: MessageHelper.NOT_FOUND_TASK,
    type: NotFoundSwagger
   })
  remove(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
  }
}
