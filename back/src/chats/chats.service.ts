import { Injectable } from '@nestjs/common';
import { ChatsRepository } from './chats.repository';

@Injectable()
export class ChatsService {
    constructor (private readonly chatsRepository: ChatsRepository){}

    getAllChats(){
        return this.chatsRepository.getAllChats();
    }

    getChatById(id: string){
        return this.chatsRepository.getChatById(id);
    }

    createChat(emisorId: string, reseptorId: string, message: string){
        return this.chatsRepository.createChats(emisorId, reseptorId, message);
    }

    deleteChat(id: string){
        return this.chatsRepository.deleteChat(id);
    }

}
