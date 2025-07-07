import 'package:ecommerce_flutter/models/cart_item.dart';

class OrderItem {
  final String id;
  final double amount;
  final List<CartItem> items;
  final DateTime date;

  OrderItem({
    required this.id,
    required this.amount,
    required this.items,
    required this.date,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      id: json['id'].toString(),
      amount: (json['amount'] as num).toDouble(),
      date: DateTime.parse(json['date']),
      items: (json['items'] as List<dynamic>)
          .map((item) => CartItem.fromJson(item))
          .toList(),
    );
  }
}
