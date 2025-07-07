class Product {
  final int id;
  final String name;
  final String description;
  final String brand;
  final String photo;
  final double price;
  final String provider;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.brand,
    required this.photo,
    required this.price,
    required this.provider,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      brand: json['brand'],
      photo: json['photo'],
      price: (json['price'] as num).toDouble(),
      provider: json['provider'],
    );
  }
}
