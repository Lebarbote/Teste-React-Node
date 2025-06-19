import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductsService {
  private brazilAPI = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private europeAPI = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

  private filterValidProducts(products: any[]) {
    return products.filter(
      (product) =>
        product.nome?.trim() !== '' &&
        product.descricao?.trim() !== '' &&
        product.preco?.trim() !== '' &&
        product.imagem?.trim() !== '' &&
        product.origem?.trim() !== ''
    );
  }

  async getAllProducts() {
    const [brazil, europe] = await Promise.all([
      axios.get(this.brazilAPI),
      axios.get(this.europeAPI),
    ]);

    const brazilProducts = brazil.data.map((product: any) => ({
      ...product,
      origem: 'Brazil',
    }));

    const europeProducts = europe.data.map((product: any) => ({
      ...product,
      origem: 'Europe',
    }));

    const allProducts = [...brazilProducts, ...europeProducts];

    return this.filterValidProducts(allProducts);
  }

  async getProductById(id: string) {
    const allProducts = await this.getAllProducts();
    return allProducts.find((product) => product.id === id);
  }
}
