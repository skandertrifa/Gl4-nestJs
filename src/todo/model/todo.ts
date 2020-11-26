import { TodoStatusEnum } from "../enums/todo-status.enum";
import { v4 as uuidv4 } from 'uuid';

export class Todo {
    public id = '';
    public name = '';
    public description = '';
    public createdAt= new Date();
    public status: TodoStatusEnum

    constructor(
        id = uuidv4(),
        name = '',
        description = '',
        createdAt =  new Date(),
        status = TodoStatusEnum.waiting
    ){
        this.id =id;
        this.name=name;
        this.description=description;
        this.createdAt=createdAt;
        this.status=status;
    }
}

