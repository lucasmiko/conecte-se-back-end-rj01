import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}

    @Get()
    getAllCategories(): Category[]{
        return this.categoriesService.getAllCategories();
    }
}
