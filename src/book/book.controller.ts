import { Req,Controller,Get,Body,Post,Query,Param,ValidationPipe,HttpException,HttpStatus, Put, UseGuards  } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { createBookDto } from './dto/create-book.dto';

import {Query as ExpressQuery } from "express-serve-static-core"
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
    constructor(private bookService:BookService){}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery ): Promise<Book[]>{
        return this.bookService.findAll(query)
    }

    @Post()
    @UseGuards(AuthGuard())
    async createBook(@Body(new ValidationPipe({
        transform: true,
        validationError: { target: false, value: false },
        exceptionFactory: (errors) => {
          const validationErrors = {};
          errors.forEach((error) => {
            const [message] = Object.values(error.constraints);
            validationErrors[error.property] = message;
          });
          throw new HttpException({ validationErrors }, HttpStatus.BAD_REQUEST);
        },
      })) book: createBookDto,
          @Req() req  
      ): Promise<Book> {
        return this.bookService.create(book,req.user);
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id:string
    ): Promise<Book>{
        return this.bookService.findById(id)
    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id:String,
        @Body()
        book
    ): Promise<Book>{
        return this.bookService.updateById(id,book)
    }
}
