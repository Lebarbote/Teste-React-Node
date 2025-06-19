Este é um projeto fullstack desenvolvido para o desafio técnico. Trata-se de um e-commerce completo, capaz de:

- Consumir produtos de dois fornecedores externos (Brasil e Europa);
- Permitir ao usuário visualizar produtos, adicionar ao carrinho e finalizar pedidos;
- Persistir todos os pedidos no backend, permitindo consultas e gerenciamento;
- Disponível tanto em versão web (React) quanto em versão mobile (Flutter).


🛠️ Tecnologias Utilizadas
🔹 Frontend (Web)
React
Vite
TypeScript
TailwindCSS
React Router
Axios
React Toastify

🔹 Backend (API)
Node.js
NestJS
TypeORM
SQLite (banco de dados local)
Axios (consumo de APIs externas)
Validation Pipe 

🔹 Mobile (App)
Flutter
Dart
Gerenciamento de estado 
Integração com API via HTTP (Dio ou http)


🛠️ (APIs Externas)
🇧🇷 Fornecedor Brasileiro:
http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider

🇪🇺 Fornecedor Europeu:
http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider


🛠️ Como rodar o projeto localmente
Backend (NestJS API):
cd backend
npm install
npm run start:dev
http://localhost:3333

Frontend (React):
cd frontend
npm install
npm run dev
http://localhost:3000
( > Caso a porta 3000 esteja ocupada, o React executará automaticamente na porta 3001 (ou outra disponível). O terminal perguntará se deseja mudar, basta confirmar com yes)

Mobile (Flutter):
cd ecommerce_flutter
flutter pub get
flutter run
(pode ser executado em emuladores Android, iOS ou dispositivos físicos.)

