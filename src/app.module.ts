import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './todo/entities/todo.entity';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
  
  TodoModule,
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          //TodoEntity
          "dist/**/*.entity{.ts,.js}"
        ],
        synchronize: true,
        }
    )
  ],
 
controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware).forRoutes(
          //'/todo' #For All the method of this PATH
          { path: 'todo', method: RequestMethod.GET}
          )
      .apply(HelmetMiddleware).forRoutes('');
  }
}
