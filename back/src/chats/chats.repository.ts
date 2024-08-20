import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chats } from "./chats.entity";
import { Repository } from "typeorm";
import { Users } from "src/users/users.entity";


@Injectable()
export class ChatsRepository{
    constructor (
        @InjectRepository(Chats) private chatsRepository: Repository<Chats>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
    ){}

    async getAllChats(){
        return await this.chatsRepository.find()
    }

    async getChatById(id: string){

        try{

            const chat = await this.chatsRepository.findOne({
                where: {id},
                relations: {
                    user: true,
                }
            })
            if(!chat){
                throw new NotFoundException(`EL chat con id ${id} no encontrado `)
            }
            return chat;
        }catch (error){
            throw new BadRequestException(`Error al buscar el chat`) 
        }
    }

    async createChats(emisorId: string, reseptorId: string, message: string){

        const userEmi = await this.usersRepository.findOneBy({id: emisorId})

        if(!userEmi){
            return `El usuario con id ${emisorId} no encontrado`
        }

        const userRes = await this.usersRepository.findOneBy({id: reseptorId})

        if(!userRes){
            return `El usuario con id ${reseptorId} no encontrado`
        }

        if(!message || message.trim().length === 0){
            throw new BadRequestException(`El contenido del mensaje no puede estar vacio`);
        }

        const chat = new Chats();
        chat.created_at = new Date();
        chat.reseptorId = reseptorId;
        chat.user = userEmi;
        chat.message = message;


        const newMessage = await this.chatsRepository.save(chat)

        return {
            id: newMessage.id,
            created_at: newMessage.created_at,
            message: newMessage.message,
            reseptorId:{
               id: userRes.id,
               username:  userRes.username,
            } ,
            user:{
                id: userEmi.id,
                username: userEmi.username,
            }
        }
    }

    async deleteChat(id: string){
        try {
            const chat = await this.chatsRepository.findOneBy({id})
            if(!chat){
                throw new BadRequestException(`El mensaje con id ${id} no fue encontrado`);
            }
    
            await this.chatsRepository.delete({id})
            
            return "Mensaje Eliminado"
        } catch (error) {
            throw new BadRequestException(`Error al eliminar mensaje con id ${id}`)
        }
    }
}