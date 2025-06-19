import 'package:flutter/material.dart';
import '../models/cart_item.dart';

class CartProvider with ChangeNotifier {
  final Map<String, CartItem> _items = {};

  Map<String, CartItem> get items => {..._items};

  double get totalAmount {
    return _items.values
        .fold(0, (sum, item) => sum + item.preco * item.quantidade);
  }

  void addItem({
    required String productId,
    required String nome,
    required String imagem,
    required double preco,
  }) {
    if (_items.containsKey(productId)) {
      _items.update(
        productId,
        (existing) => CartItem(
          id: existing.id,
          productId: existing.productId,
          nome: existing.nome,
          imagem: existing.imagem,
          preco: existing.preco,
          quantidade: existing.quantidade + 1,
        ),
      );
    } else {
      _items.putIfAbsent(
        productId,
        () => CartItem(
          id: DateTime.now().toString(),
          productId: productId,
          nome: nome,
          imagem: imagem,
          preco: preco,
          quantidade: 1,
        ),
      );
    }
    notifyListeners();
  }

  void removeItem(String productId) {
    _items.remove(productId);
    notifyListeners();
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }
}
