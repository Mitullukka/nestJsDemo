import { User } from "src/auth/schemas/user.schema";
import { Category } from "../schema/book.schema"
import { IsNotEmpty, IsString, IsNumber,IsOptional,IsInt,Min,Max } from 'class-validator';



export class createBookDto{
    @IsNotEmpty()
    @IsString()
    title:string

    @IsNotEmpty()
    @IsString()
    readonly description:string

    @IsNotEmpty()
    readonly author:string
    @IsNotEmpty({ message: 'Price required' })
    @IsNumber({}, { message: 'Price must be a valid number' })
    @IsInt({ message: 'Price must be an integer' })
    @Min(0, { message: 'Price must be greater than or equal to 0' })
    @Max(1000000, { message: 'Price must be less than or equal to 1000000' })
    readonly price:number

    @IsNotEmpty()
    readonly category:Category

    user:User
}