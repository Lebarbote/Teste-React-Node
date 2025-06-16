import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  createdAt: string;
  status: string;
  total: number;
  items: {
    productId: string;
    quantity: number;
    product: {
      nome: string;
      descricao: string;
      preco: string;
      imagem: string;
    };
  }[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    const response = await api.get('/orders');
    setOrders(response.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

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
                  <h2 className="text-xl font-semibold">
                    Order #{order.id}
                  </h2>
                  <p className="text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center border-b pb-2"
                  >
                    <img
                      src={item.product.imagem}
                      alt={item.product.nome}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.product.nome}</p>
                      <p className="text-gray-600">{item.product.descricao}</p>
                      <p>
                        Quantity: {item.quantity} | Unit Price: US${' '}
                        {item.product.preco}
                      </p>
                    </div>
                    <p className="font-bold">
                      Subtotal: US${' '}
                      {(
                        parseFloat(item.product.preco) * item.quantity
                      ).toFixed(2)}
                    </p>
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
    </div>
  );
}
