import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }

  // @Get ()
  // getCategories(){
  //     return this.categoriesService.getCategories();
  // }
}
