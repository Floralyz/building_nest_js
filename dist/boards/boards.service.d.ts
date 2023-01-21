import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
export declare class BoardsService {
    private boardRepository;
    constructor(boardRepository: BoardRepository);
    createBoard(CreateBoardDto: CreateBoardDto): Promise<Board>;
    getBoardById(id: any): Promise<Board>;
}
