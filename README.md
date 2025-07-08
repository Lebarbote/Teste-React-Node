<h1> Este é um projeto fullstack desenvolvido para um desafio técnico. Trata-se de um e-commerce completo, capaz de: </h1>


- Consumir produtos de dois fornecedores externos (Brasil e Europa);
- Permitir ao usuário visualizar produtos, adicionar ao carrinho e finalizar pedidos;
- Persistir todos os pedidos no backend, permitindo consultas e gerenciamento;
- Disponível tanto em versão web (React) quanto em versão mobile (Flutter).


<h2> 🛠️ Tecnologias Utilizadas <h2> 

<h3>🔹 Frontend (Web):<h3>
<ul>
    <li>React</li>
    <li>Vite</li>
    <li>TypeScript</li>
    <li>TailwindCSS</li>
    <li>Axios</li>
    <li>React Router</li>
    <li>React Toastify</li>
  </ul>

<h3>🔹 Backend (API):<h3>
<ul>
    <li>Node.js</li>
    <li>NestJS</li>
    <li>TypeORM</li>
    <li>Axios</li>
    <li>Validation Pipe</li>
  </ul>

<h3>🔹 Mobile (App): </h3>
<ul>
    <li>Flutter</li>
    <li>Dart</li>
    <li>Gerenciamento de estado </li>
    <li>Integração com API via HTTP (Dio ou http)</li>
</ul>



<h2>🛠️ Como os dados dos produtos são obtidos </h2>
 <p>Os produtos são armazenados e servidos por uma API desenvolvida com NestJS. Ao inicializar o backend, ele realiza a integração com duas fontes externas (Brasil e Europa) para buscar os dados apenas uma vez — esses dados são então salvos localmente no banco SQLite.

Tanto o frontend React quanto o app Flutter consomem essa API local, acessando os produtos de forma rápida e estruturada através da rota:</p>
<pre><code>GET /products</code></pre>


<h2>🛠️ Como rodar o projeto localmente</h2>
<h3>Backend (NestJS)</h3>
  <pre><code>cd backend
npm install
npm run start:dev</code></pre>
  <p>Acesse a API em: <a href="http://localhost:3333">http://localhost:3333</a></p>
<a href="https://github.com/Lebarbote/Teste-React-Node/blob/main/backend/README.md" target="_blank">README Backend</a></li>


  <h3>Frontend (React)</h3>
  <pre><code>cd frontend
npm install
npm start</code></pre>
  <p>Acesse a aplicação web em: <a href="http://localhost:3000">http://localhost:3000</a></p>
<a href="https://github.com/Lebarbote/Teste-React-Node/blob/main/frontend/README.md" target="_blank">README Frontend</a></li>
  

  <h3>Mobile (Flutter - Opcional)</h3>
  <pre><code>cd ecommerce_flutter
flutter pub get
flutter run</code></pre>
  <p>Execute em emuladores ou dispositivos físicos Android.</p>
<a href="https://github.com/Lebarbote/Teste-React-Node/blob/main/ecommerce_flutter/README.md" target="_blank">README Ecommerce Flutter</a></li>

  <hr>
