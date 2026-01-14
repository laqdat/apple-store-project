import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Mac.css';

const Mac = () => {
  const [products, setProducts] = useState([]);
  const [scrollScale, setScrollScale] = useState(1); // State để chỉnh độ to nhỏ của video

  // 1. Lấy dữ liệu máy Mac từ API
  useEffect(() => {
    fetch('http://localhost:5000/products?category=mac') // Chỉ lấy category = mac
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // 2. Xử lý hiệu ứng cuộn chuột (Scroll Animation)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Công thức: Càng cuộn xuống, số càng nhỏ. Min là 0.85 (không nhỏ quá)
      // 1000 là khoảng cách cuộn để đạt độ nhỏ tối đa
      const newScale = Math.max(0.70, 1 - scrollY / 1500);
      setScrollScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mac-page">
      
      {/* PHẦN 1: HERO TITLE */}
      <section className="mac-hero">
        <h1 className="mac-title">Mac</h1>
        <p className="mac-subtitle">Nếu bạn làm được, Mac sẽ giúp bạn làm điều đó.</p>
      </section>

      {/* PHẦN 2: VIDEO QUẢNG CÁO (Có hiệu ứng thu nhỏ) */}
      <div className="mac-video-wrapper">
        <div 
          className="mac-video-container" 
          style={{ transform: `scale(${scrollScale})` }} // <--- MAGIC Ở ĐÂY
        >
          {/* Video lấy từ nguồn Apple hoặc placeholder chất lượng cao */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="mac-video"
            poster="https://www.apple.com/v/mac/home/by/images/overview/hero/hero_macbook_air_15_midnight__cs0427g21zme_large.jpg"
          >
            <source src="/mac_ads.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>
      </div>

      {/* PHẦN 3: GIỚI THIỆU TÍNH NĂNG */}
      <section className="mac-features container">
        <div className="feature-text">
          <h2>Hiệu năng đỉnh cao.</h2>
          <p>Với chip Apple silicon, mọi máy Mac đều mang đến sức mạnh đáng kinh ngạc và thời lượng pin vượt trội.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>macOS</h3>
            <p>Dễ sử dụng. Đẹp mắt. Và được thiết kế để kết nối mượt mà với iPhone của bạn.</p>
          </div>
          <div className="feature-card">
            <h3>Độ bền</h3>
            <p>Vỏ nhôm nguyên khối tái chế. Bền bỉ theo năm tháng và thân thiện với môi trường.</p>
          </div>
          <div className="feature-card">
            <h3>Tương thích</h3>
            <p>Chạy các ứng dụng yêu thích của bạn nhanh như chớp. Từ Adobe đến Microsoft Office.</p>
          </div>
        </div>
      </section>

      {/* PHẦN 4: DANH SÁCH SẢN PHẨM */}
      <section className="mac-products-section">
        <h2 className="section-heading">Khám phá dòng sản phẩm.</h2>
        <div className="store-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              showSpecs={true} // <--- QUAN TRỌNG: BẬT CHẾ ĐỘ HIỆN THÔNG SỐ
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Mac;