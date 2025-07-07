import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { api } from '../services/api';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      toast.warn('Cart is empty!');
      return;
    }

    try {
      await api.post('/orders', {
        items: cart.map((item) => ({
          productId: item.id.toString(),
          nome: item.name,
          preco: item.price.toString(),
          quantity: item.quantity,
        })),
        total,
      });

      toast.success('✅ Request sent successfully!');
      clearCart();
    } catch (error) {
      toast.error('❌ Error sending request.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Provider: {item.provider}</p>
                  <p className="font-bold mt-2">
                    US$ {item.price} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 space-x-4">
            <p className="text-xl font-bold mb-4">Total: US$ {total.toFixed(2)}</p>

            <button
              onClick={handleSubmitOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md"
            >
              Submit Request
            </button>

            <button
              onClick={clearCart}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full shadow-md"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
