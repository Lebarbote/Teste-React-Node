# FRONTEND 

O frontend deste projeto é uma aplicação web desenvolvida em React + TypeScript + Vite, que simula um e-commerce simples. O usuário poderá:

Visualizar produtos vindos de dois fornecedores externos (Brasil e Europa);

Adicionar produtos ao carrinho, com persistência via localStorage, ou seja, mesmo ao recarregar a página os itens continuam no carrinho;

Remover itens do carrinho ou limpar todo o carrinho;

Finalizar pedidos que são então enviados para o backend e registrados;

Consultar os pedidos realizados, acompanhando o status (pending, paid, shipped, delivered, cancelled) com opção de atualizar ou excluir;

Receber feedbacks em tempo real através de notificações (Toastify) para ações como adicionar ao carrinho, finalizar pedidos, erros ou avisos;

E após finalizar um pedido, o carrinho é esvaziado automaticamente e o usuário é redirecionado para a página de pedidos.

<hr>


<h2> 🛠️ Tecnologias Utilizadas <h2> 
<ul>
    <li>React</li>
    <li>Vite</li>
    <li>TypeScript</li>
    <li>TailwindCSS</li>
    <li>Axios</li>
    <li>React Router</li>
    <li>React Toastify</li>
  </ul>

<h2>🛠️ Como rodar o projeto localmente</h2>


<h3>Frontend (React)</h3>
  <pre><code>cd frontend
npm install
npm start</code></pre>
  <p>Acesse a aplicação web em: <a href="http://localhost:3000">http://localhost:3000</a></p>
  <p><strong>Observação:</strong> Se a porta 3000 estiver ocupada, o React rodará automaticamente na 3001 ou outra disponível, mediante confirmação no terminal.</p>
