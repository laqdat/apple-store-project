import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const cities = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];

  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    email: user ? user.email : '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod'
  });

  if (cart.length === 0) {
    navigate('/store');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      id: Date.now(),
      customer: formData,
      items: cart,
      total: totalPrice,
      status: "Pending",
      date: new Date().toLocaleString()
    };

    try {
      const res = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });

      if (res.ok) {
        clearCart();
        alert("Đặt hàng thành công! Đang chuyển trang...");
        
        // --- CHIÊU CUỐI: CHUYỂN TRANG CỨNG ---
        // Cách này ép trình duyệt tải trang mới, không sợ lỗi Router
        window.location.href = '/order-success/' + newOrder.id;
        // --------------------------------------
      }
    } catch (error) {
      alert("Lỗi kết nối! Vui lòng thử lại.");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="checkout-page container">
      <h1 className="checkout-title">Thanh Toán</h1>
      <div className="checkout-container">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} id="checkoutForm">
            <h3>Thông tin giao hàng</h3>
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Tỉnh / Thành phố</label>
              <select name="city" value={formData.city} onChange={handleChange} required>
                <option value="">-- Chọn Tỉnh / Thành --</option>
                {cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <h3 style={{marginTop: '30px'}}>Thanh toán</h3>
            <div className="payment-options">
                <label><input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange}/> COD</label>
                <br/>
                <label><input type="radio" name="paymentMethod" value="momo" checked={formData.paymentMethod === 'momo'} onChange={handleChange}/> MoMo</label>
            </div>
          </form>
        </div>
        <div className="checkout-summary-section">
            <div className="summary-card">
                <h3>Tổng cộng: {formatPrice(totalPrice)}</h3>
                <button type="submit" form="checkoutForm" className="btn-place-order">Đặt Hàng</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;