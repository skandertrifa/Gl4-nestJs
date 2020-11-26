
import { TodoStatusEnum } from './../enums/todo-status.enum';
import { IsIn, IsOptional } from 'class-validator';
import { MinLength,MaxLength } from 'class-validator';

export class UpdateTodoDto {
    @IsOptional()
    @MinLength(3,{
        "message": "La taille de votre $property $value est petite il doit contenir au moins $constraint1 caractères"
    })
    @MaxLength(10,{
        "message": "La taille de votre $property $value est grande il doit contenir au plus $constraint1 caractères"
    })
    name: string;

    @IsOptional()
    @MinLength(10,{
        "message": "La taille de votre $property $value est petite il doit contenir au moins $constraint1 caractères"
    })
    description: string;

    @IsOptional()
    @IsIn([
        TodoStatusEnum.actif,
        TodoStatusEnum.waiting,
        TodoStatusEnum.done
    ],{
        "message": "Vous devez choisir l'un des status valide"
    })
    status: TodoStatusEnum;
}