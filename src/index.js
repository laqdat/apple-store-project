import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // <--- Import mới

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* <--- Bọc thêm cái này */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);