import { Category } from "../schema/book.schema"
import { IsNotEmpty, IsString, IsNumber,IsOptional } from 'class-validator';



export class createBookDto{
    @IsNotEmpty()
    @IsString()
    title:string

    @IsNotEmpty()
    @IsString()
    readonly description:string

    @IsNotEmpty()
    readonly author:string

    @IsNotEmpty()
    readonly price:number

    @IsNotEmpty()
    readonly category:Category
}