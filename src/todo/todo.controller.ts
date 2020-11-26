import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Todo } from './model/todo';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-tdo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    private todos: Todo[] = [];

    constructor(
        private todoService: TodoService
    ){}

    @Get('')
    getTodos(){
        return this.todoService.getTodos();
    }

    @Post() 
    addTodo(
        @Body() todo: CreateTodoDto,
    ){
        this.todoService.addTodo(todo);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string){
        this.todoService.deleteTodo(id);
    }

    @Put(':id')
    updateTodo(
        @Param('id') id: string,
        @Body() newTodo: UpdateTodoDto
        ) {
            this.todoService.putTodo(id,newTodo);
    }

}
