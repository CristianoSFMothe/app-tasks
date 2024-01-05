import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from '../tasks/entities/tasks.entity';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [TasksEntity],
  synchronize: true,
};

console.log('host', process.env.DB_HOST);
console.log('port', process.env.DB_PORT);
console.log('username', process.env.DB_USERNAME);
console.log('password', process.env.DB_DATABASE);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
