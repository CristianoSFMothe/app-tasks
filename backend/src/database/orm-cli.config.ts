/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateTasksTable1704506963233 } from '../migrations/1704506963233-CreateTasksTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateTasksTable1704506963233]
});
