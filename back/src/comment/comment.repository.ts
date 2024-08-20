import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./comment.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Users } from "src/users/users.entity";
import { Comics } from "src/comics/comics.entity";


@Injectable()
export class CommentsRepository{
    constructor(
        @InjectRepository(Comments) private commentsRepository: Repository<Comments>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Comics) private comicsRepository: Repository<Comics>
    ){}

    async getAllComments (): Promise<Comments[]>{
        return await this.commentsRepository.find();
    }

    async getCommentById(id: string){
        const comment = await this.commentsRepository.findOne({
            where: {id},
            relations: {
                user: true,
            }
        })

        if(!comment){
            return `Comentario con id ${id} no encontrado`
        }
        return {
            id: comment.id,
            content: comment.content,
            created_at: comment.created_at,
            user: {
                id: comment.user.id,
                username: comment.user.username,
            }
        }
    }

    async createComment(userId: string, comicId: string, content: string){
        const user = await this.usersRepository.findOneBy({id: userId})

        if(!user){
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
        }

        const comic = await this.comicsRepository.findOneBy({id: comicId});
        if(!comic){
            throw new NotFoundException(`Comic con id ${comicId} no encontrado`);
        }

        if(!content || content.trim().length === 0){
            throw new BadRequestException(`El contenido del comentario no puede estar vacio`);
        }

        const comment = new Comments();
        comment.created_at = new Date();
        comment.user = user;
        comment.comic = comic;
        comment.content = content;

        const newComment = await this.commentsRepository.save(comment);

        return {
            id: newComment.id,
            created_at: newComment.created_at,
            content: newComment.content,
            user: {
                id: newComment.user.id,
                username: newComment.user.username,
            },
            comic: {
                id: newComment.comic.id,
                title: newComment.comic.title,
                description: newComment.comic.description,
                author: newComment.comic.author,
                data_post: newComment.comic.data_post,
                folderName: newComment.comic.folderName,
                user: {
                    id: newComment.comic.user.id,
                    username: newComment.comic.user.username,
                },
            }
        };
    }

     async deleteComment(id: string){
        const comment = await this.commentsRepository.findOne({
            where: {id},
            relations: {
                comic: true,
            }
        })

        if(!comment){
            throw new NotFoundException(`Comentario con id ${id} no encontrado`)
        }

        await this.commentsRepository.delete({id})
        return 'Comentario eliminado'
    }

    

}