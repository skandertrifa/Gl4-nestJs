import { TodoStatusEnum } from "../enums/todo-status.enum";

export class Todo {
    constructor(
        public id: string = '',
        public name: string = '',
        public description: string = '',
        public createdAt =  new Date(),
        public status: TodoStatusEnum = TodoStatusEnum.waiting
    ){
        this.id =id;
        this.name=name;
        this.description=description;
        this.createdAt=createdAt;
        this.status=status;
    }
}

