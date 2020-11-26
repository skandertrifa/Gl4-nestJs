import { Injectable } from '@nestjs/common';
import { Todo } from './model/todo';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-tdo.dto';

@Injectable()
export class TodoService {
    private todos: Todo[] = [];

    constructor(){
        const todo = new Todo();
        todo.name="Nest cours";todo.description="Nest Js cours";
        this.todos = [
            todo
        ];
    }
    
    getTodos(): Todo[] {
        return this.todos;
    }

    addTodo(todo: CreateTodoDto ): Todo {
        const { name, description } = todo;
        const newTodo = new Todo();
        newTodo.name = name;
        newTodo.description = description;
        this.todos.push(newTodo);

        return newTodo;
    }

    deleteTodo(id: string): void{
        this.todos = this.todos.filter( todo => todo.id != id)
    }

    putTodo(id: string, newTodo: UpdateTodoDto): Todo{
        const {name, description, status} = newTodo;
        console.log(status);
        const myTodo = this.todos.filter( todo => todo.id === id)[0];
        myTodo.name = name? name : myTodo.name;
        myTodo.description = description ? description : myTodo.description;
        myTodo.status = status? status : myTodo.status;

        return myTodo;
    }


}
