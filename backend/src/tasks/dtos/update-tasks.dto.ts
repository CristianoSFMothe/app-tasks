/* eslint-disable prettier/prettier */
enum StatusTasks {
  BACKLOG = 'BACKLOG',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
export class UpdateTaskDto {
  readonly task?: string;
  readonly description?: string;
  readonly status?: StatusTasks;
}