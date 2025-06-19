import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-blue-100 text-blue-600';
    case 'paid':
      return 'bg-green-100 text-green-600';
    case 'shipped':
      return 'bg-yellow-100 text-yellow-700';
    case 'delivered':
      return 'bg-green-200 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

interface Order {
  id: number;
  createdAt: string;
  status: string;
  total: number;
  items: {
    id: string;
    nome: string;
    preco: string;
    quantity: number;
  }[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const loadOrders = async () => {
    const response = await api.get('/orders');
    setOrders(response.data);
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    await api.patch(`/orders/${orderId}/status`, { status: newStatus });
    loadOrders();
  };

  const handleClearOrders = async () => {
    await api.delete('/orders');
    setShowConfirm(false);
    loadOrders();
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Clear Orders
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                  <p className="text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center border-b pb-2"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{item.nome}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Unit Price: US$ {item.preco}</p>
                      <p>
                        Subtotal: US$ {(
                          Number(item.preco) * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right text-xl font-bold">
                Total: US$ {order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link to="/" className="underline">
          ← Back to Products
        </Link>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete all orders?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleClearOrders}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
