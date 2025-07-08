# BACKEND 

O backend é uma API desenvolvida com Node.js e NestJS, que gerencia a lógica do e-commerce, incluindo:

Consumo de produtos de dois fornecedores (Brasil e Europa) para buscar os dados apenas uma vez — esses dados são então salvos localmente no banco SQLite;

Gestão do carrinho de compras: Adicionar itens, Remover itens, Limpar carrinho e Consultar o carrinho atual;


Criação de pedidos baseados nos itens do carrinho: Salva no banco de dados (SQLite); Persiste os pedidos para consulta futura;

Gerenciamento de pedidos: Visualizar todos os pedidos, Consultar pedido por ID, Atualizar o status do pedido (pending, paid, shipped, delivered, cancelled) e Deletar um pedido específico ou limpar todos

<hr>


<h2> 🛠️ Tecnologias Utilizadas <h2> 
<ul>
    <li>Node.js</li>
    <li>NestJS</li>
    <li>TypeORM</li>
    <li>SQLite (banco local)</li>
    <li>Axios</li>
    <li>Validation Pipe</li>
  </ul>

<h2>🛠️ Como rodar o projeto localmente</h2>


<h3>Backend (NestJS)</h3>
  <pre><code>cd backend
npm install
npm run start:dev</code></pre>
  <p>Acesse a API em: <a href="http://localhost:3333">http://localhost:3333</a></p>

