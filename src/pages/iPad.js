import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './iPad.css';

const Ipad = () => {
  const [products, setProducts] = useState([]);
  const [scrollScale, setScrollScale] = useState(1);

  // 1. Lấy dữ liệu iPad
  useEffect(() => {
    fetch('http://localhost:5000/products?category=ipad')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // 2. Hiệu ứng cuộn video
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = Math.max(0.85, 1 - scrollY / 1500);
      setScrollScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="ipad-page">
      
      {/* HERO SECTION */}
      <section className="ipad-hero">
        <h1 className="ipad-title">iPad</h1>
        <p className="ipad-subtitle">Chạm, vẽ và gõ. <br/> Trên một thiết bị diệu kỳ.</p>
      </section>

      {/* VIDEO SECTION */}
      <div className="ipad-video-wrapper">
        <div 
          className="ipad-video-container" 
          style={{ transform: `scale(${scrollScale})` }}
        >
          {/* Nhớ chép file ipad_video.mp4 vào thư mục public nha */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="ipad-video"
          >
            <source src="/ipad_video.mp4" type="video/mp4" />
            Trình duyệt không hỗ trợ video.
          </video>
        </div>
      </div>

      {/* TÍNH NĂNG */}
      <section className="ipad-features container">
        <div className="feature-intro">
          <h2>Sáng tạo không giới hạn.</h2>
          <p>Làm được nhiều việc hơn theo những cách trực quan nhất. iPad được thiết kế cho tất cả những gì bạn yêu thích.</p>
        </div>
        
        <div className="ipad-feature-grid">
          <div className="ipad-card card-create">
            <h3>Sáng tạo</h3>
            <p>Vẽ, thiết kế, chỉnh sửa ảnh chuyên nghiệp ngay trên màn hình cảm ứng.</p>
          </div>
          <div className="ipad-card card-learn">
            <h3>Học tập</h3>
            <p>Ghi chú thông minh, đa nhiệm mượt mà, công cụ học tập đắc lực.</p>
          </div>
          <div className="ipad-card card-connect">
            <h3>Kết nối</h3>
            <p>Camera trước Ultra Wide với tính năng Center Stage giúp bạn luôn ở trung tâm.</p>
          </div>
        </div>
      </section>

      {/* DANH SÁCH SẢN PHẨM */}
      <section className="ipad-products-section">
        <h2 className="section-heading">Dòng sản phẩm iPad.</h2>
        <div className="store-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              showSpecs={true} // Bật hiện thông số
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Ipad;