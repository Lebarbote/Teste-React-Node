import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  private brazilianApi = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private europeanApi = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

  constructor(private readonly httpService: HttpService) {}

  async getAllProducts() {
    const [brazilian, european] = await Promise.all([
      firstValueFrom(this.httpService.get(this.brazilianApi)),
      firstValueFrom(this.httpService.get(this.europeanApi)),
    ]);
  
    const formattedBrazilian = brazilian.data.map((item: any) => ({
      id: item.id,
      nome: item.nome,
      descricao: item.descricao,
      preco: item.preco,
      imagem: item.imagem,
      origem: 'Brasil',
    }));
  
    const formattedEuropean = european.data.map((item: any) => ({
      id: item.id,
      nome: item.name,
      descricao: item.description,
      preco: item.price,
      imagem: item.gallery, 
      origem: 'Europe',
    }));
  
    return [...formattedBrazilian, ...formattedEuropean];
  }
  

  async getProductById(id: string) {
    const urls = [
      `${this.brazilianApi}/${id}`,
      `${this.europeanApi}/${id}`,
    ];

    for (const url of urls) {
      try {
        const response = await firstValueFrom(this.httpService.get(url));
        if (response.data) {
          return response.data;
        }
      } catch {
      }
    }
    throw new Error('Product not found');
  }
}
