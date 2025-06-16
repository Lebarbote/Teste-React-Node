import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold">My Store</div>
          <div className="flex gap-4">
            <a href="/" className="text-gray-700 hover:text-gray-900">Products</a>
            <a href="/cart" className="text-gray-700 hover:text-gray-900">Cart</a>
            <a href="/orders" className="text-gray-700 hover:text-gray-900">Orders</a>
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <ToastContainer />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;



