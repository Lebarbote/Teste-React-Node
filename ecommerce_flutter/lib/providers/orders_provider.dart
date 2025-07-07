import 'package:flutter/material.dart';
import '../models/order_item.dart';
import '../models/cart_item.dart';

class OrdersProvider with ChangeNotifier {
  final List<OrderItem> _orders = [];

  List<OrderItem> get orders => [..._orders];

  void addOrder(List<CartItem> cartProducts, double total) {
    _orders.insert(
      0,
      OrderItem(
        id: DateTime.now().toString(),
        amount: total,
        items: cartProducts,
        date: DateTime.now(),
      )
    );
    notifyListeners();
  }
}
