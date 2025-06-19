import 'package:flutter/foundation.dart';
import 'cart_item.dart';

class OrderItem {
  final String id;
  final double total;
  final List<CartItem> products;
  final DateTime date;

  OrderItem({
    required this.id,
    required this.total,
    required this.products,
    required this.date,
  });
}
