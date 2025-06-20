# ECOMMERCE FLUTTER 

O ecommerce_flutter é uma aplicação mobile desenvolvida em Flutter, que consome a API do backend NestJS para permitir que usuários realizem compras de forma simples e intuitiva.

O aplicativo traz uma experiência completa de e-commerce, incluindo:

Listagem de Produtos: Consulta produtos de dois fornecedores externos (Brasil e Europa) através da API;

Carrinho de Compras: Adicionar e remover itens, Alterar a quantidade dos produtos e Visualização dinâmica dos itens adicionados

Finalização de Pedidos: Cria um pedido com base no carrinho atual e Limpa o carrinho após a compra

Consulta de Pedidos: Lista todos os pedidos realizados e Visualiza os detalhes de cada pedido, incluindo itens, quantidade, total e status

Atualização de Status do Pedido: O backend permite acompanhar o status (pending, paid, shipped, delivered, cancelled)

<hr>


<h2> 🛠️ Tecnologias Utilizadas <h2> 
<ul>
    <li>Flutter</li>
    <li>Dart</li>
    <li>Gerenciamento de estado </li>
    <li>Integração com API via HTTP (Dio ou http)</li>
</ul>

<h2>🛠️ Como rodar o projeto localmente</h2>


<h3>Backend (NestJS)</h3>
<pre><code>cd ecommerce_flutter
flutter pub get
flutter run</code></pre>
  <p>Execute em emuladores ou dispositivos físicos Android/iOS.</p>

