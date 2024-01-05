import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TasksModule,
    DatabaseModule,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    console.log('Config DB_HOST:', this.configService.get<string>('DB_HOST'));
  }
}
