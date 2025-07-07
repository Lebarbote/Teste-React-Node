import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImportProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async importAll(): Promise<{ message: string }> {
    const basePath = path.resolve(process.cwd(), 'src', 'assets');

    const brazilian = JSON.parse(fs.readFileSync(path.join(basePath, 'brazilian-products.json'), 'utf-8'));
    const european = JSON.parse(fs.readFileSync(path.join(basePath, 'european-products.json'), 'utf-8'));

    const allProducts = [
      ...brazilian.map((item) => ({ ...item, provider: 'brazilian' })),
      ...european.map((item) => ({ ...item, provider: 'european' }))
    ];

    for (const item of allProducts) {
    const { id, ...data } = item; 
    await this.productRepository.save(data);
  }

    return { message: 'Importação concluída com sucesso.' };
  }
}
