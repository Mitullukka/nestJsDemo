import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schema/book.schema';
import { Query } from 'express-serve-static-core'
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name)
        private bookModel : mongoose.Model<Book>
    ){}

    async findAll(query: Query): Promise<Book[]>{

        const perPage  = Number(query.perPage) || 2;
        const currentPage = Number(query.page) || 1;
        const skip = perPage * (currentPage - 1)
        const keyword = query.keyword ? {
            title:{
                $regex:query.keyword,
                $options:'i'
            }
        } : {}

        const books = await this.bookModel.find({ ...keyword }).limit(perPage).skip(skip);
        return books
    }

    async create(book:Book,user:User): Promise<Book>{
        const data = Object.assign(book,{user:user._id})
        const res = await this.bookModel.create(data)
        return res 
    }

    async findById(id:string):Promise<Book>{
        const res = await this.bookModel.findById(id)
        return res
    }

    async updateById(id:String,book:Book): Promise<Book>{
        return await this.bookModel.findByIdAndUpdate(id,book,{     
            new:true,
            runValidators:true
        })
    }
}
