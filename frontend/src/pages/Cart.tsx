import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  productId: string;
  quantity: number;
  product: {
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
  };
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const loadCart = async () => {
    const response = await api.get('/cart');
    setCart(response.data.items);
    setTotal(response.data.total);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (productId: string) => {
    await api.delete(`/cart/remove/${productId}`);
    loadCart();
  };

  const handleClearCart = async () => {
    await api.delete('/cart/clear');
    loadCart();
  };

  const handleCheckout = async () => {
    try {
      await api.post('/orders');
      alert('Order created successfully!');
      navigate('/orders');
    } catch (err) {
      alert('Error placing the order. Is your cart empty?');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex gap-6"
            >
              <img
                src={item.product.imagem}
                alt={item.product.nome}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.product.nome}</h2>
                <p className="text-gray-600">{item.product.descricao}</p>
                <p className="mt-1">Quantity: {item.quantity}</p>
                <p>Unit Price: R$ {item.product.preco}</p>
                <p className="font-bold">
                  Subtotal: R${' '}
                  {(parseFloat(item.product.preco) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-2xl font-bold">Total: R$ {total.toFixed(2)}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleClearCart}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link to="/" className="underline">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
