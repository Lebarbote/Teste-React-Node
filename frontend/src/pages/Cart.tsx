import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'react-toastify';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.warn('🛒 Your cart is empty!');
      return;
    }

    const total = cart.reduce(
      (acc, item) => acc + Number(item.preco) * item.quantity,
      0
    );

    try {
      await api.post('/orders', {
        items: cart,
        total,
      });

      toast.success('✅ Order placed successfully!');
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('❌ Failed to place order');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="border-b pb-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.nome}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: US$ {item.preco}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={clearCart}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>

            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </>
      )}

      <div className="mt-6">
        <Link to="/products" className="text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
