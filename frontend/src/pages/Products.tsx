import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleAddToCart = (productId: string) => {
    api.post('/cart/add', {
      productId,
      quantity: 1,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <img
              src={product.imagem}
              alt={product.nome}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{product.nome}</h2>
            <p className="text-gray-600">{product.descricao}</p>
            <p className="text-lg font-bold mt-2">R$ {product.preco}</p>

            <button
              onClick={() => handleAddToCart(product.id)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded mt-auto"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
