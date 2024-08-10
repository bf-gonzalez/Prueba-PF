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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comic')
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get()
  getComics(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.comicsService.getAllComics(page, limit);
  }

  @Get('inactive')
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
  addComics(@Param('id') id: string) {
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
  getComicByIdioma(@Param('idioma') idioma: string){
    return this.comicsService.getComicByIdioma(idioma);
  }

  @Get('typecomic/:typecomic')
  getComicByType(@Param('typecomic') typecomic: string){
    return this.comicsService.getComicByType(typecomic);
  }
  @Post(':id')
  createComic(@Param('id') id: string, @Body() comic: Partial<Comics>) {
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
  deleteComic(@Param('id') id: string) {
    return this.comicsService.deleteComic(id);
  }
}
