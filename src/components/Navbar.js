import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaApple, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  // Tính tổng số lượng item trong giỏ
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const menuItems = [
    { name: "Cửa Hàng", path: "/store" },
    { name: "Mac", path: "/mac" },
    { name: "iPad", path: "/ipad" },
    { name: "iPhone", path: "/iphone" },
    { name: "Watch", path: "/watch" },
    { name: "Phụ Kiện", path: "/accessories" },
    { name: "Giới Thiệu", path: "/about" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <FaApple size={18} />
        </Link>

        {/* Menu */}
        <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className="nav-link">{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* Icons bên phải */}
        <div className="nav-icons">
          <Link to="/search"><FaSearch size={14} /></Link>
          
          {/* --- CHỈ GIỮ LẠI ĐÚNG 1 CÁI NÀY --- */}
          <Link to="/cart" className="cart-icon-container" style={{position: 'relative'}}>
            <FaShoppingBag size={14} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
          {/* ---------------------------------- */}

          {/* Logic hiển thị tên User */}
          {user ? (
            <div className="user-info">
              <span className="user-name">Chào, {user.name}</span>
              <button onClick={logout} className="btn-logout">Thoát</button>
            </div>
          ) : (
            <Link to="/login" className="login-link">
               Đăng nhập
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;