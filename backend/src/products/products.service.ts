import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductsService {
  private brazilAPI =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private europeAPI =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

  private mapBrazilProduct(product: any) {
    return {
      id: product.id,
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      imagem: product.imagem,
      origem: 'Brazil',
    };
  }

  private mapEuropeProduct(product: any) {
    return {
      id: product.id,
      nome: product.name,
      descricao: product.description,
      preco: product.price,
      imagem: product.gallery?.[0] ?? '', 
      origem: 'Europe',
    };
  }

  private filterValidProducts(products: any[]) {
    return products.filter(
      (product) =>
        product.nome?.trim() !== '' &&
        product.descricao?.trim() !== '' &&
        product.preco?.trim() !== '' &&
        product.imagem?.trim() !== '' &&
        product.origem?.trim() !== '',
    );
  }

  async getAllProducts() {
    const [brazilResponse, europeResponse] = await Promise.all([
      axios.get(this.brazilAPI),
      axios.get(this.europeAPI),
    ]);

    const brazilProducts = brazilResponse.data.map(this.mapBrazilProduct);
    const europeProducts = europeResponse.data.map(this.mapEuropeProduct);

    const allProducts = [...brazilProducts, ...europeProducts];

    return this.filterValidProducts(allProducts);
  }

  async getProductById(id: string) {
    const products = await this.getAllProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
