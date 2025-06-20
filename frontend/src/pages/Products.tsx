import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import { useCart, Product } from '../context/CartContext';

import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/products').then((response) => {
      const filtered = response.data.filter(
        (p: Product) =>
          p.nome?.trim() !== '' &&
          p.descricao?.trim() !== '' &&
          p.preco?.trim() !== '' &&
          p.origem?.trim() !== ''
      );
      setProducts(filtered);
    });
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success('🛒 Added to cart!');
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-xl p-4 flex flex-col hover:scale-105 transition-transform"
          >
            <img
              src={
                product.imagem ||
                'https://via.placeholder.com/300x200.png?text=No+Image'
              }
              alt={product.nome}
              className="w-full h-48 object-cover rounded-xl"
            />

            <div className="flex justify-between items-center mt-4">
              <h2 className="text-xl font-semibold">{product.nome}</h2>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  product.origem === 'Brazil'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {product.origem}
              </span>
            </div>

            <p className="text-gray-600 mt-2 line-clamp-3">
              {product.descricao}
            </p>
            <p className="text-lg font-bold mt-2">US$ {product.preco}</p>

            <button
              onClick={() => handleAddToCart(product)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full shadow-md cursor-pointer active:scale-95 mt-auto"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
