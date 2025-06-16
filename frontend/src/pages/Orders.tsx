import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  items: {
    productId: string;
    quantity: number;
    product: {
      nome: string;
      preco: string;
      imagem: string;
    };
  }[];
  total: number;
  createdAt: string;
  status: string; 
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders').then(response => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Meus Pedidos</h1>

      <div className="flex gap-4 mb-6">
        <Link to="/" className="underline">Voltar para Produtos</Link>
        <Link to="/cart" className="underline">Ver Carrinho</Link>
      </div>

      {orders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map(order => (
            <div key={order.id} className="border p-4 rounded shadow">
              <div className="flex justify-between mb-2">
                <h2 className="text-xl font-bold">Pedido #{order.id}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString('pt-BR')}
                </span>
              </div>

              <p className="mb-2">
                <strong>Status:</strong> {order.status || 'Pendente'}
              </p>

              <div className="flex flex-col gap-2">
                {order.items.map(item => (
                  <div key={item.productId} className="flex gap-4 items-center">
                    <img src={item.product.imagem} alt={item.product.nome} className="w-24 h-24 object-cover" />
                    <div>
                      <h3 className="text-lg">{item.product.nome}</h3>
                      <p>Quantidade: {item.quantity}</p>
                      <p>Preço Unitário: R$ {item.product.preco}</p>
                      <p className="font-bold">
                        Subtotal: R$ {(parseFloat(item.product.preco) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-lg font-bold mt-2">
                Total do Pedido: R$ {order.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
