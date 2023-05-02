import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CategoryService, ProductService],
})
export class AppModule {}
