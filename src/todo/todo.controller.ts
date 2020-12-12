import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Todo } from './model/todo';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-tdo.dto';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { FindTodoByStatusAndDescriptionDto } from './dto/find-todo-by-status-and-description';

@Controller('todo')
export class TodoController {
    private todos: Todo[] = [];

    constructor(
        private todoService: TodoService
    ){}

    @Get('')
    async getTodos(): Promise<TodoEntity[]>
    {
        return await this.todoService.getTodos();
    }

    @Get('find_by_status_and_description')
    async findByStatusAndDescription(
        @Body() statusAndDescription: FindTodoByStatusAndDescriptionDto
    ){
        //console.log(statusAndDescription);
        return await this.todoService.findByStatusAndDescription(statusAndDescription);
    }


    @Get(':id')
    async getTodoById(
        @Param('id') id: number
    ): Promise<TodoEntity>
    {
        return await this.todoService.getTodoById(id);
    }
    

    @Post() 
    async addTodo(
        @Body() todo: CreateTodoDto,
    ): Promise<TodoEntity>{
        return await this.todoService.addTodo(todo);
    }


    @Put(':id')
    async updateTodo(
        @Param('id') id: string,
        @Body() newTodo: UpdateTodoDto
        ): Promise<TodoEntity> 
    {
        return await this.todoService.updateTodo(id,newTodo);
    }


    @Delete(':id')
    async deleteTodo(
        @Param('id') id: number
    )
    {
        return await this.todoService.deleteTodo(id);
    }

    @Get('restore/:id')
    async restoreTodoById(
        @Param('id') id: number
    )
    {
        return await this.todoService.restoreTodo(id);
    }


}
