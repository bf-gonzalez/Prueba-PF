import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @Get()
    getAllComment(){
        return this.commentService.getAllComment()
    }

    @Get(':id')
    getCommentById(@Param('id', ParseUUIDPipe)id: string){
        return this.commentService.getCommentById(id)
    }

    @Post(':comicId')
    @ApiBody({
        schema: {
          example: {
            userId: "",
            content: "El comic esta buenisimo pero le falto mejor sonido"
          }
        }
      })
    createComment(
        @Body('userId') userId: string,
        @Param('comicId', ParseUUIDPipe) comicId: string,
        @Body('content') content: string,
    ){
        return this.commentService.createComment(userId, comicId, content);
    }

    @Delete(':id')
    deleteComment(@Param('id', ParseUUIDPipe)id: string){
        return this.commentService.deleteComment(id)
    }
}
