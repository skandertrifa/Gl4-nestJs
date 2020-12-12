import { TimeStamp } from "src/generics/timestamp";
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { TodoStatusEnum } from "../enums/todo-status.enum";
@Entity('todo')
export class TodoEntity extends TimeStamp{
    @PrimaryGeneratedColumn()
    id: number;
    @Column( {length: 30} )
    name: string;
    @Column( {length: 255} )
    description: string;
    @Column({
        type: 'enum',
        enum: TodoStatusEnum,
        default: TodoStatusEnum.waiting
    })
    status: TodoStatusEnum;
    
}