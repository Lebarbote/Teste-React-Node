import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';

interface Order {
  id: number;
  items: {
    productId: string;
    nome: string;
    preco: string;
    quantity: number;
  }[];
  total: number;
  status: string;
  createdAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = () => {
    api.get('/orders').then((response) => {
      setOrders(response.data);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleClearOrders = async () => {
    try {
      await api.delete('/orders');
      toast.success('Orders deleted successfully!');
      fetchOrders();
    } catch (error) {
      toast.error('❌ Error deleting orders.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">My Orders</h1>

        {orders.length > 0 && (
          <button
            onClick={handleClearOrders}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            Clear Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <span className="text-sm text-gray-500 italic">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <ul className="mb-2 space-y-1">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {item.quantity}x {item.nome} — US$ {parseFloat(item.preco).toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <p className="font-bold">Total: US$ {order.total.toFixed(2)}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
