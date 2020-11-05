import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
//import { Request } from 'express';
import { Todo } from './model/todo';

@Controller('todo')
export class TodoController {
    todos: Todo[] = [];

    constructor(){
        this.todos = [
            new Todo('abc','Nest Cours','Start nest cours'),
        ]
    }

    @Get('')
    getTodos(){
        return this.todos;
    }

    @Post('') 
    @UseInterceptors (FileInterceptor('file'))
    addTodo(
        //@Req() request: Request,
        @Body() todo: Todo,
        //@UploadedFile() file
    ){
        //console.log(todo);
        this.todos.push( new Todo(todo.id,todo.name,todo.description))
        //console.log(file);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string){
        this.todos = this.todos.filter( todo => todo.id != id)
        console.log(id);
    }

    @Put(':id')
    @UseInterceptors (FileInterceptor('file'))
    updateTodo(@Param('id') id: string, @Body() tod: Todo,) {
        //console.log(tod.name === null);
        const myTodo = this.todos.filter( todo => todo.id === id)[0];
        const index = this.todos.indexOf(myTodo);
        tod.name !== undefined ? myTodo.name = tod.name : undefined;
        tod.description !== undefined ? myTodo.description = tod.description : undefined;
        tod.createdAt !== undefined ?  myTodo.createdAt = tod.createdAt : undefined
        tod.status !== undefined ? myTodo.status = tod.status : undefined
        this.todos[index] = myTodo;
        //console.log(tod);
        //console.log(index);
        //console.log(myTodo);

    }

}
