import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './model/todo';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-tdo.dto';
import { Any, Equal, Like, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindTodoByStatusAndDescriptionDto } from './dto/find-todo-by-status-and-description';

@Injectable()
export class TodoService {
    private todos: Todo[] = [];

    constructor(
        @InjectRepository(TodoEntity)
        private readonly TodoRepository: Repository<TodoEntity>
    ){
        const todo = new Todo();
        todo.name="Nest cours";todo.description="Nest Js cours";
        this.todos = [
            todo
        ];
    }
    
    fakeGetTodos(): Todo[] {
        return this.todos;
    }
    async getTodos(): Promise<TodoEntity[]> {
        return await this.TodoRepository.find({
            //select: ["name"]
            //where: { name: "Mardi",  "description": "Cours Angular"}
        });
    }

    async getTodoById(id: number): Promise<TodoEntity>{
        return await this.TodoRepository.findOne(id);
    }

    fakeAddTodo(todo: CreateTodoDto ): Todo {
        const { name, description } = todo;
        const newTodo = new Todo();
        newTodo.name = name;
        newTodo.description = description;
        this.todos.push(newTodo);

        return newTodo;
    }
    async addTodo(todo: CreateTodoDto ): Promise<TodoEntity> {
        const newTodo = this.TodoRepository.create(todo);
        return await this.TodoRepository.save(newTodo);
    }




    fakeDeleteTodo(id: string): void{
        this.todos = this.todos.filter( todo => todo.id != id)
    }
    async deleteTodo(id: number){
        return await this.TodoRepository.softDelete(id);
    }
    async restoreTodo(id: number){
        return await this.TodoRepository.restore(id);
    }



    fakeUpdateTodo(id: string, newTodo: UpdateTodoDto): Todo{
        const {name, description, status} = newTodo;
        console.log(status);
        const myTodo = this.todos.filter( todo => todo.id === id)[0];
        myTodo.name = name? name : myTodo.name;
        myTodo.description = description ? description : myTodo.description;
        myTodo.status = status? status : myTodo.status;

        return myTodo;
    }
    async updateTodo(id: string, newTodo: UpdateTodoDto): Promise<TodoEntity>{
        const myTodo = await this.TodoRepository.preload({
            id : +id,
            ...newTodo
        });
        if (!myTodo){
            new NotFoundException("le todo d'id{$id} n'existe pas !");
        }
        return await this.TodoRepository.save(myTodo);    
    }

    async findByStatusAndDescription(
        statusAndDescription: FindTodoByStatusAndDescriptionDto
    )
    {
        const {status, description} = statusAndDescription;
        console.log(statusAndDescription);
        return await this.TodoRepository.find(
            {
                description: Like("%"+description+"%"),
                status
            }
            )
    }


}
