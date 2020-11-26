import { IsNotEmpty, IS_NOT_EMPTY, MaxLength, MinLength } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty({
        "message": "Vous devez spécifier un nom"
    })
    @MinLength(3,{
        "message": "La taille de votre $property $value est petite il doit contenir au moins $constraint1"
    })
    @MaxLength(10,{
        "message": "La taille de votre $property $value est grande il doit contenir au plus $constraint1"
    })
    name: string;
    @IsNotEmpty({
        "message": "Vous devez spécifier une description"
    })
    @MinLength(10,{
        "message": "La taille de votre $property $value est petite il doit contenir au moins $constraint1"
    })
    description: string;
}