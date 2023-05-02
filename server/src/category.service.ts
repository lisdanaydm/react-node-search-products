import { Injectable } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import * as categoriesData from './data/categories.json';

@Injectable()
export class CategoryService {
  private readonly categories: Category[] = categoriesData;

  findAll(): Category[] {
    return this.categories;
  }
}
