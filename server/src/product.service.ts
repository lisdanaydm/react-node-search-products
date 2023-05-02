import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CategoryService } from './category.service';
import { ProductSearchDto } from './dto/product-search.dto';
import { Category } from './interfaces/category.interface';
import * as productsData from './data/products.json';

@Injectable()
export class ProductService {
  constructor(private category: CategoryService) {}

  private readonly products: Product[] = productsData;

  findAll(param: ProductSearchDto): Array<Product> {
    const categories: Category[] = this.category.findAll();
    const searchRegex = new RegExp(param.search, 'i');

    return this.products.filter((product: Product) => {
      if (
        searchRegex.test(product.name) ||
        searchRegex.test(product.description) ||
        product.tags.some((tag: string) => searchRegex.test(tag))
      ) {
        if (
          categories.some((category: Category) => {
            if (product.categoryID === category.ID) {
              return true;
            } else if (category.parentID) {
              const parentCategory = categories.find(
                (c: Category) => c.ID === category.parentID,
              );
              return parentCategory && product.categoryID === parentCategory.ID;
            } else {
              return false;
            }
          })
        ) {
          return true;
        }
      }
      return false;
    });
  }
}
