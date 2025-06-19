import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  private brazilianApi =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private europeanApi =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

  constructor(private readonly httpService: HttpService) {}

  private normalizeProduct(product: any) {
    const parseField = (field: any) => {
      if (Array.isArray(field)) {
        return field.join(' ');
      }
      return field ?? '';
    };
  
    return {
      id: product.id?.toString() ?? '',
      nome: parseField(product.nome),
      descricao: parseField(product.descricao),
      preco: product.preco?.toString() ?? '',
      imagem: '', 
      origem: product.origem ?? '',
    };
  }
  
  async getAllProducts() {
    const [brazilian, european] = await Promise.all([
      firstValueFrom(this.httpService.get(this.brazilianApi)),
      firstValueFrom(this.httpService.get(this.europeanApi)),
    ]);

    const allProducts = [
      ...brazilian.data.map((item) => this.normalizeProduct(item)),
      ...european.data.map((item) => this.normalizeProduct(item)),
    ];

    return allProducts;
  }

  async getProductById(id: string) {
    const urls = [`${this.brazilianApi}/${id}`, `${this.europeanApi}/${id}`];

    for (const url of urls) {
      try {
        const response = await firstValueFrom(this.httpService.get(url));
        if (response.data) {
          return this.normalizeProduct(response.data);
        }
      } catch {
      }
    }

    throw new Error('Product not found');
  }
}
