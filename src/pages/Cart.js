import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // Có useNavigate
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout'); // Chuyển hướng sang trang checkout
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Giỏ hàng của bạn đang trống.</h2>
        <p>Bạn chưa thêm sản phẩm nào vào túi.</p>
        <Link to="/store" className="btn-continue">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="cart-title">Giỏ hàng của bạn có tổng cộng {cart.reduce((t, i) => t + i.quantity, 0)} món.</h1>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="item-cate">{item.category}</p>
            </div>
            <div className="cart-quantity">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <div className="cart-price">
              <p>{formatPrice(item.price * item.quantity)}</p>
              <button onClick={() => removeFromCart(item.id)} className="btn-remove">Xóa</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Tạm tính:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="summary-row">
          <span>Vận chuyển:</span>
          <span>Miễn phí</span>
        </div>
        <div className="summary-total">
          <span>Tổng cộng:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        
        <button className="btn-checkout" onClick={handleCheckout}>Thanh Toán</button>
      </div>
    </div>
  );
};

export default Cart; // <--- QUAN TRỌNG: Phải có dòng này mới ko bị lỗi