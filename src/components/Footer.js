import React from 'react';
import { Link } from 'react-router-dom'; // <--- Bắt buộc phải import cái này
import './Footer.css'; 

const Footer = () => {
  // Hàm cuộn lên đầu trang khi chuyển trang
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer" style={{backgroundColor: '#f5f5f7', padding: '40px 0', marginTop: '50px', fontSize: '12px'}}>
      <div className="container">
        <div className="footer-content" style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          
          {/* Cột 1: Sản phẩm */}
          <div className="footer-column">
            <h3 style={{fontWeight: 'bold', marginBottom: '10px'}}>Khám phá</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{marginBottom: '8px'}}><Link to="/mac" onClick={scrollToTop}>Mac</Link></li>
              <li style={{marginBottom: '8px'}}><Link to="/ipad" onClick={scrollToTop}>iPad</Link></li>
              <li style={{marginBottom: '8px'}}><Link to="/iphone" onClick={scrollToTop}>iPhone</Link></li>
              <li style={{marginBottom: '8px'}}><Link to="/watch" onClick={scrollToTop}>Watch</Link></li>
              <li style={{marginBottom: '8px'}}><Link to="/accessories" onClick={scrollToTop}>Phụ kiện</Link></li>
            </ul>
          </div>

          {/* Cột 2: Cửa hàng */}
          <div className="footer-column">
            <h3 style={{fontWeight: 'bold', marginBottom: '10px'}}>Cửa hàng</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{marginBottom: '8px'}}><Link to="/store" onClick={scrollToTop}>Tất cả sản phẩm</Link></li>
              <li style={{marginBottom: '8px'}}><Link to="/search" onClick={scrollToTop}>Tìm kiếm</Link></li>
              <li style={{marginBottom: '8px'}}><Link to="/cart" onClick={scrollToTop}>Giỏ hàng</Link></li>
            </ul>
          </div>

          {/* Cột 3: Tài khoản */}
          <div className="footer-column">
            <h3 style={{fontWeight: 'bold', marginBottom: '10px'}}>Tài khoản</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{marginBottom: '8px'}}><Link to="/login" onClick={scrollToTop}>Đăng nhập / Đăng ký</Link></li>
              <li style={{marginBottom: '8px'}}><Link to="/checkout" onClick={scrollToTop}>Thanh toán</Link></li>
            </ul>
          </div>

          {/* Cột 4: Về chúng tôi */}
          <div className="footer-column">
            <h3 style={{fontWeight: 'bold', marginBottom: '10px'}}>Apple Clone</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{marginBottom: '8px'}}><Link to="/about" onClick={scrollToTop}>Giới thiệu</Link></li>
              <li style={{marginBottom: '8px'}}><a href="#" style={{color: '#666'}}>Chính sách bảo mật</a></li>
              <li style={{marginBottom: '8px'}}><a href="#" style={{color: '#666'}}>Điều khoản sử dụng</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom" style={{borderTop: '1px solid #d2d2d7', marginTop: '20px', paddingTop: '20px', color: '#86868b'}}>
          <p>Copyright © 2024npm start Apple Clone Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;