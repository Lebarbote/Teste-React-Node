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
      alert('Request created successfully!');
      navigate('/orders');
    } catch (err) {
      alert('Error completing order. Check if the cart is empty.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Your Cart</h1>

      <div className="flex gap-4 mb-6">
        <Link to="/" className="underline">Back to Products</Link>
        <Link to="/orders" className="underline">My Orders</Link>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map(item => (
            <div key={item.id} className="border p-4 rounded flex gap-4">
              <img src={item.product.imagem} alt={item.product.nome} className="w-32 h-32 object-cover" />
              <div className="flex-1">
                <h2 className="text-xl">{item.product.nome}</h2>
                <p>{item.product.descricao}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Unit Price: R$ {item.product.preco}</p>
                <p className="font-bold">
                Subtotal: R$ {(parseFloat(item.product.preco) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <p className="text-2xl font-bold">Total: R$ {total.toFixed(2)}</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleClearCart}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Finalize Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
