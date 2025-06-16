import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  origem: string; 
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleAddToCart = (product: Product) => {
    api.post('/cart/add', {
      productId: product.id,
      quantity: 1,
    });
  
    toast.success('🛒 Added to cart');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            {product.imagem ? (
              <img
                src={product.imagem}
                alt={product.nome}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <h2 className="text-xl font-semibold">{product.nome}</h2>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.origem === 'Brazil'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {product.origem}
              </span>

            </div>

            <p className="text-gray-600">{product.descricao}</p>
            <p className="text-lg font-bold mt-2">US$ {product.preco}</p>

            <button
              onClick={() => handleAddToCart(product)}
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
