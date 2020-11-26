import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

@Module({
  imports: [TodoModule],
 
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
