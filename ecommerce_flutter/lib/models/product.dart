class Product {
  final String id;
  final String nome;
  final String descricao;
  final String preco;
  final String imagem;
  final String origem;

  Product({
    required this.id,
    required this.nome,
    required this.descricao,
    required this.preco,
    required this.imagem,
    required this.origem,
  });

 factory Product.fromJson(Map<String, dynamic> json) {
  String parseField(dynamic field) {
    if (field is List) {
      return field.join(' ');
    }
    return field.toString();
  }

  return Product(
    id: json['id'].toString(),
    nome: parseField(json['nome']),
    descricao: parseField(json['descricao']),
    preco: json['preco'].toString(),
    imagem: json['imagem'] ?? '',
    origem: json['origem'] ?? '',
  );
}
}