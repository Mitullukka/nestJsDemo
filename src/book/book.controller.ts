import { Controller,Get,Body,Post, Param,ValidationPipe  } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { createBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
    constructor(private bookService:BookService){}

    @Get()
    async getAllBooks(): Promise<Book[]>{
        return this.bookService.findAll()
    }

    @Post()
    async createBook(
        @Body(new ValidationPipe())
        book:createBookDto
    ): Promise<Book>{
        return this.bookService.create(book)
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id:string
    ): Promise<Book>{
        return this.bookService.findById(id)
    }
}
