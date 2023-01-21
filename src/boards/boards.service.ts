import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Injectable()
export class BoardsService {
/*    private boards: Board[] = [];*/
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ){}

        async getAllBoards(): Promise <Board[]>{
            return this.boardRepository.find();
        }

   /* getAllBoards(): Board[]{
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto){

        const {title, description} = createBoardDto;

        const board: Board= {
             id: uuid(),
             title,
             description,
             status: BoardStatus.PUBLIC
        }
        this.boards.push(board)
        return board;
    }

    */
    async createBoard(CreateBoardDto : CreateBoardDto, user:User): Promise<Board>{
        const {title, description} = CreateBoardDto;

        const board = this.boardRepository.create({
            title, 
            description,
            status: BoardStatus.PUBLIC,
            user
        })
        await this.boardRepository.save(board);
        return board;
    }


    async getBoardById(id:number,  user:User): Promise <Board>{
        const found = await this.boardRepository.findOne({where: {id, userId: user.id} });

        if(!found){
            throw new NotFoundException(`Can't found Board with id ${id}`)
        }

        return found;
    }

    /*
    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);
        if(!found){
            throw new NotFoundException(`Cant find Board with id ${id}`);
        }
        return found
    }
*/

async deleteBoard(id:number, user:User): Promise<void>{
    const result = await this.boardRepository.delete({id, user});
    console.log(result);

    if(result.affected === 0) {
        throw new NotFoundException(`Can't find Board with id ${id}`);
    }
}

async updateBoardStatus(id: number, status: BoardStatus, user:User): Promise<Board>{
    const board = await this.getBoardById(id, user);
    console.log('board', board);
    console.log('board', status);
    

    board.status = status;

    await this.boardRepository.save(board);
    return board;
}


/*
    deleteBoard(id:string): void{
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id:string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }*/

}
