import { IsIn, IsOptional } from "class-validator";
import { DefaultDeserializer } from "v8";
import { TodoStatusEnum } from "../enums/todo-status.enum";


export class FindTodoByStatusAndDescriptionDto {
    @IsIn([
        TodoStatusEnum.actif,
        TodoStatusEnum.waiting,
        TodoStatusEnum.done
    ],{
        "message": "Vous devez choisir l'un des status valide"
    })
    status: TodoStatusEnum;
    @IsOptional()
    description = "";
}