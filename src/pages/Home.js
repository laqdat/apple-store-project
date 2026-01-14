import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Banner chính - iPhone 15 Pro */}
      <section className="hero-section black-theme">
        <h1 className="hero-title">iPhone 15 Pro</h1>
        <p className="hero-subtitle">Titan. Thật bền bỉ. Thật nhẹ. Thật Pro.</p>
        <div className="hero-links">
          <button className="btn btn-blue">Mua ngay</button>
          <button className="btn btn-link">Tìm hiểu thêm &gt;</button>
        </div>
        {/* Chỗ này sau này chèn ảnh thật, giờ dùng khối màu tượng trưng */}
        <div className="hero-image-placeholder">
          <img 
            src="/images/banner-home.jpg" 
            alt="Apple Banner" 
            className="hero-img"  /* <--- THÊM DÒNG NÀY */
          />
        </div>
      </section>

      {/* Banner phụ - Vision Pro */}
      <section className="hero-section white-theme">
        <h1 className="hero-title" style={{color: '#000'}}>Vision Pro</h1>
        <p className="hero-subtitle" style={{color: '#000'}}>Kỷ nguyên điện toán không gian.</p>
        <div className="hero-links">
          <button className="btn btn-outline">Tìm hiểu thêm</button>
        </div>
        <div className="hero-image-placeholder">
          <img 
            src="/images/vision-pro.jpg" 
            alt="Apple Vision Pro" 
            className="hero-img" 
          />
        </div>
      </section>
    </div>
  );
};

export default Home;