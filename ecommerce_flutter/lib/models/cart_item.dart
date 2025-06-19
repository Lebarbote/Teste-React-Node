class CartItem {
  final String id;
  final String productId;
  final String nome;
  final String imagem;
  final double preco;
  final int quantidade;

  CartItem({
    required this.id,
    required this.productId,
    required this.nome,
    required this.imagem,
    required this.preco,
    required this.quantidade,
  });
}
