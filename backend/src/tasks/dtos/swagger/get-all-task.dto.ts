/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { TasksEntity } from "src/tasks/entities/tasks.entity";

export class GetAllTasksSwagger extends PartialType(TasksEntity) {}
