import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaPrint, FaExclamationTriangle } from 'react-icons/fa';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [error, setError] = useState(false);    // Thêm trạng thái lỗi

  useEffect(() => {
    // Gọi API lấy thông tin đơn hàng
    fetch(`http://localhost:5000/orders/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Lỗi khi lấy dữ liệu');
        }
        return res.json();
      })
      .then(data => {
        setOrder(data);
        setLoading(false); // Tắt loading khi có dữ liệu
      })
      .catch(err => {
        console.error("Lỗi:", err);
        setError(true);    // Bật trạng thái lỗi
        setLoading(false); // Tắt loading
      });
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // 1. Màn hình Đang tải
  if (loading) {
    return (
      <div className="order-success-page container" style={{textAlign: 'center', paddingTop: '100px'}}>
        <h2>⏳ Đang tìm đơn hàng #{id}...</h2>
        <p>Vui lòng đợi trong giây lát.</p>
      </div>
    );
  }

  // 2. Màn hình Lỗi (Nếu không tìm thấy ID trong db.json)
  if (error || !order) {
    return (
      <div className="order-success-page container" style={{textAlign: 'center', paddingTop: '100px'}}>
        <FaExclamationTriangle size={50} color="#ff3b30" />
        <h2 style={{marginTop: '20px'}}>Không tìm thấy đơn hàng!</h2>
        <p>Có thể đơn hàng chưa được lưu hoặc mã đơn hàng <strong>#{id}</strong> không tồn tại.</p>
        <div style={{marginTop: '30px'}}>
            <Link to="/" className="btn-home">Về trang chủ</Link>
        </div>
      </div>
    );
  }

  // 3. Màn hình Thành công (Giữ nguyên giao diện cũ)
  return (
    <div className="order-success-page container">
      <div className="success-header">
        <FaCheckCircle className="success-icon" />
        <h1>Đặt hàng thành công!</h1>
        <p>Cảm ơn bạn đã mua hàng. Mã đơn hàng của bạn là: <strong>#{order.id}</strong></p>
        {/* Kiểm tra an toàn để tránh lỗi nếu customer null */}
        <p>Email xác nhận đã được gửi tới: {order.customer?.email || 'N/A'}</p>
      </div>

      <div className="order-details-container">
        <div className="order-info-column">
          <h3>Thông tin nhận hàng</h3>
          <div className="info-group">
            <p><strong>Người nhận:</strong> {order.customer?.fullName}</p>
            <p><strong>Số điện thoại:</strong> {order.customer?.phone}</p>
            <p><strong>Địa chỉ:</strong> {order.customer?.address}, {order.customer?.city}</p>
            <p><strong>Thanh toán:</strong> {order.customer?.paymentMethod?.toUpperCase()}</p>
            <p><strong>Ngày đặt:</strong> {order.date}</p>
          </div>
          <div className="order-actions">
            <Link to="/" className="btn-home">Về trang chủ</Link>
            <button className="btn-print" onClick={() => window.print()}>
              <FaPrint /> In hóa đơn
            </button>
          </div>
        </div>

        <div className="order-items-column">
          <h3>Sản phẩm đã đặt</h3>
          <div className="order-items-list">
            {order.items?.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt={item.name} onError={(e)=>{e.target.src='https://via.placeholder.com/60'}} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <div className="item-price">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Tổng tiền:</span>
            <span className="total-amount">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;