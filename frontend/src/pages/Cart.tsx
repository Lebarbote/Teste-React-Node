import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'react-toastify';

interface CartItem {
  id: string;
  nome: string;
  preco: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const handleClearCart = () => {
    updateCart([]);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.warn('🛒 Your cart is empty!');
      return;
    }

    const total = cartItems.reduce(
      (acc, item) => acc + Number(item.preco) * item.quantity,
      0
    );

    try {
      await api.post('/orders', {
        items: cartItems,
        total,
      });

      toast.success('✅ Order placed successfully!');
      handleClearCart();

      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('❌ Failed to place order');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">🛒 Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="border rounded-lg p-4 flex justify-between items-center shadow"
              >
                <div>
                  <p className="font-semibold text-lg">{item.nome}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">
                    Price: US$ {(Number(item.preco) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full active:scale-95"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button
              onClick={handleClearCart}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full shadow active:scale-95"
            >
              Clear Cart
            </button>

            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow active:scale-95"
            >
              Place Order
            </button>

            <button
              onClick={() => navigate('/orders')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow active:scale-95"
            >
              Go to Orders
            </button>
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
