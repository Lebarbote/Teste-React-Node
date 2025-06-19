import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/orders_provider.dart';

class OrdersPage extends StatelessWidget {
  static const routeName = '/orders'; // ✅ Fica aqui fora do build

  const OrdersPage({super.key});

  @override
  Widget build(BuildContext context) {
    final ordersData = Provider.of<OrdersProvider>(context);
    final orders = ordersData.orders;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Orders'),
      ),
      body: orders.isEmpty
          ? const Center(
              child: Text('No orders yet!'),
            )
          : ListView.builder(
              itemCount: orders.length,
              itemBuilder: (ctx, index) {
                final order = orders[index];
                return Card(
                  margin: const EdgeInsets.all(10),
                  child: ListTile(
                    title: Text(
                      'Total: US\$ ${order.total.toStringAsFixed(2)}',
                    ),
                    subtitle: Text(
                      '${order.products.length} items - ${order.date.toLocal()}',
                    ),
                  ),
                );
              },
            ),
    );
  }
}
