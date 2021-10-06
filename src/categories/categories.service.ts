import { Injectable } from '@nestjs/common';
import { Category } from './category.model';
import {v4 as uuid} from 'uuid';

@Injectable()
export class CategoriesService {
    private categories: Category[] = [];

    getAllCategories(): Category[] {
        return this.categories;
    }
}
