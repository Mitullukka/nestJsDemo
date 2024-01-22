import { MinLength,IsNotEmpty, IsString, IsNumber,IsOptional,IsInt,Min,Max, IsEmail, minLength } from 'class-validator';

export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsEmail({},{message:'Please enter correct email'})
    email:string

    @IsNotEmpty()
    @MinLength(6)
    password:string

}