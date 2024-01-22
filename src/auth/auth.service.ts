import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtService : JwtService
    ){}

    async signUp(signUpDto:SignUpDto): Promise<{token : string}> {
        const {name,email,password} = signUpDto
        const existingUser = await this.userModel.findOne({email})
        if(existingUser){
            throw new ConflictException({
               message: [{email: 'Email Already exists'}] 
            })
        }
        const hashPassword = await bcrypt.hash(password,10)

        const user = await this.userModel.create({
            name:name,
            email:email,
            password:hashPassword
        })

        const token = this.jwtService.sign({id:user._id});
        return {token}
    }

    async login(loginDto:LoginDto): Promise<{token:string}>{
        const {email,password} = loginDto;

        const user = await this.userModel.findOne({email})
        if(!user){
            throw new UnauthorizedException("Invalid email or password")            
        }       

        const isPasswordMatched = await bcrypt.compare(password,user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException({
              status: 401,
              message: [{ password: 'Invalid password' }],
            });
          }

        const token = this.jwtService.sign({id:user._id})
        
        return {token}

    }   

}
