import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authCredentialsDto } from './auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){   }


        async signIn(authCredentialsDto: authCredentialsDto): Promise <{accessToken: string}> {
            const {username, password} = authCredentialsDto;
            const user = await this.userRepository.findOne({username});
            if(user && (await bcrypt.compare(password, user.password))){
                //create token here
                const payload = {username};
                const accessToken = await this.jwtService.sign(payload);

                return {accessToken};
            }else{
                throw new UnauthorizedException('login failed');
            }
        }


    async signUp(authCredentialsDto: authCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }
}

