import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chats')
@Controller('chats')
export class ChatsController {
    constructor (private readonly chatService: ChatsService){}

    @Get()
    getAllChats(){
        return this.chatService.getAllChats();
    }

    @Get(':id')
    getChatById(@Param('id', ParseUUIDPipe) id: string){
        return this.chatService.getChatById(id);
    }

    @Post(':emisorId')
    createChat(
        @Param('emisorId', ParseUUIDPipe) emisorId: string,
        @Body('reseptorId', ParseUUIDPipe) reseptorId: string,
        @Body('message') message: string){
        
            return this.chatService.createChat(emisorId, reseptorId, message);
    }

    @Delete(':id')
    deleteChat(id: string){
        return this.chatService.deleteChat(id);
    }
}
