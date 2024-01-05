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

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(+id);
  }

  @Post()
  create(@Body() body) {
    return this.tasksService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.tasksService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tasksService.remove(+id);
  }
}
