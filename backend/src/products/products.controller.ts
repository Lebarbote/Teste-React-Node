import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ImportProductsService } from './import-products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly importProductsService: ImportProductsService,
  ) {}

  @Get()
  getAll() {
    return this.productsService.getAllProducts();
  }

  @Get('import')
  import() {
    return this.importProductsService.importAll();
  }
}
