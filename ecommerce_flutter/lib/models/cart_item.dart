class CartItem {
  final String id;
  final String productId;
  final String name;
  final String photo;
  final double price;
  final int quantity;

  CartItem({
    required this.id,
    required this.productId,
    required this.name,
    required this.photo,
    required this.price,
    required this.quantity,
  });

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      id: json['id'],
      productId: json['productId'].toString(),
      name: json['name'],
      photo: json['photo'],
      price: (json['price'] as num).toDouble(),
      quantity: json['quantity'],
    );
  }
}
