
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { authCredentialsDto } from "./auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(authCredentialsDto: authCredentialsDto): Promise<void>{
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({username, password:hashedPassword});

        try{
        await this.save(user);
        }catch(err){
            console.log('error',err)
            if(err.code === "23505"){
                throw new ConflictException('Existing username');
            }else{
                throw new InternalServerErrorException();
            }
        }
    }
    
}