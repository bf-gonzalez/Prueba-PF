import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ComicsService } from './comics.service';
import { Comic } from './interfaces/comic.interface';
import { title } from 'process';
import { Comics } from './comics.entity';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('comic')
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página'})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número de elementos por página'})
  getComics(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.comicsService.getAllComics(page, limit);
  }

  @Get('inactive')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página'})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número de elementos por página'})
  getInactiveComics(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    if (page && limit) {
      return this.comicsService.getInactiveComics();
    }
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    return this.comicsService.getInactiveComics(Number(page), Number(limit));
  }

  @Get('active')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página'})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número de elementos por página'})
  getActiveComics(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    if (page && limit) {
      return this.comicsService.getActiveComics();
    }
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    return this.comicsService.getActiveComics(Number(page), Number(limit));
  }

  @Get('seeder/:id')
  addComics(@Param('id', ParseUUIDPipe) id: string) {
    return this.comicsService.addComics(id);
  }

  @Get(':id')
  getComicById(@Param('id') id: string) {
    return this.comicsService.getComicById(id);
  }

  @Get('title/:title')
  getComicByName(@Param('title') title: string) {
    return this.comicsService.getComicByTitle(title);
  }

  @Get('idioma/:idioma')
  getComicByIdioma(@Param('idioma') idioma: string) {
    return this.comicsService.getComicByIdioma(idioma);
  }

  @Get('typecomic/:typecomic')
  getComicByType(@Param('typecomic') typecomic: string) {
    return this.comicsService.getComicByType(typecomic);
  }
  @Post(':id')
  @ApiBody({
    schema: {
      example: {
        title: 'Marvel',
        description:
          'Este comic tiene mucha accion, peleas y cuanta con un gran gion',
        categoryname: 'Aventura, Pelea, XXX',
        idioma: 'Español',
        typecomic: 'Manga',
        author: 'Batman',
        data_post: '1990-07-25',
        folderName: 'Primer capitulo',
      },
    },
  })
  createComic(@Param('id', ParseUUIDPipe) id: string, @Body() comic: Partial<Comics>) {
    return this.comicsService.createComic(id, comic);
  }

  @Put(':id')
  putComic(@Param('id') id: string, @Body() comic: Comics) {
    return this.comicsService.updatedComic(id, comic);
  }

  @Put('activate/:id')
  activateComics(@Param('id', ParseUUIDPipe) id: string) {
    return this.comicsService.activateComics(id);
  }

  @Delete(':id')
  deleteComic(@Param('id', ParseUUIDPipe) id: string) {
    return this.comicsService.deleteComic(id);
  }
}
