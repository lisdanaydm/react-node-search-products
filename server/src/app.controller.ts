import { Controller, Get, Query } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { Product } from './interfaces/product.interface';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { ProductSearchDto } from './dto/product-search.dto';

@Controller()
export class AppController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  @Get('/products')
  getProducts(@Query() query: ProductSearchDto): {
    count: number;
    data: Array<Product>;
  } {
    const filteredProducts = this.productService.findAll(query);

    const count = filteredProducts.length;
    const page = query.page || 1;
    const pageSize = query.limit || count;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const data = filteredProducts.slice(startIndex, endIndex);

    return { count, data };
  }
}
