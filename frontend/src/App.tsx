import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { CartProvider, useCart } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-2xl font-bold">My Store</h1>
          <nav className="space-x-4">
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
          </nav>
        </div>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<Products />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </CartProvider>
  );
}

export default App;
