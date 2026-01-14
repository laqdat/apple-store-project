import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Watch.css';

const Watch = () => {
  const [products, setProducts] = useState([]);
  const [scrollScale, setScrollScale] = useState(1);

  useEffect(() => {
    fetch('http://localhost:5000/products?category=watch')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

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
    <div className="watch-page">
      
      {/* 1. HERO SECTION */}
      <section className="watch-hero">
        <div className="hero-content">
          <h1 className="watch-title">Apple Watch</h1>
          <p className="watch-subtitle">Thông minh hơn. Sáng hơn. Mạnh mẽ hơn.</p>
        </div>
        
        <div className="watch-video-wrapper">
           <div className="watch-video-container" style={{ transform: `scale(${scrollScale})` }}>
             <video autoPlay muted loop playsInline className="watch-video">
               <source src="/watch_video.mp4" type="video/mp4" />
             </video>
           </div>
        </div>
      </section>

      {/* 2. FEATURE GRID (Giao diện tối - Dark Mode) */}
      <section className="watch-features">
        <div className="container">
          <h2 className="features-title">Tại sao nên chọn Apple Watch?</h2>
          
          <div className="watch-grid">
            
            {/* Ô 1: Sức khỏe */}
            <div className="watch-card card-health">
              <h3>Sức khỏe tim mạch</h3>
              <p>Nhận thông báo khi nhịp tim quá cao hoặc quá thấp.</p>
            </div>

            {/* Ô 2: Thể thao (Vòng tròn Activity) */}
            <div className="watch-card card-fitness">
              <h3>Vận động</h3>
              <p>Đóng các vòng Actvity của bạn mỗi ngày. Chạy, bơi, đạp xe.</p>
              <div className="activity-rings">
                 {/* Giả lập 3 vòng tròn màu sắc */}
                 <div className="ring ring-red"></div>
                 <div className="ring ring-green"></div>
                 <div className="ring ring-blue"></div>
              </div>
            </div>

            {/* Ô 3: Kết nối */}
            <div className="watch-card card-connect">
              <h3>Giữ kết nối</h3>
              <p>Nghe gọi, nhắn tin ngay trên cổ tay mà không cần iPhone.</p>
            </div>

            {/* Ô 4: An toàn */}
            <div className="watch-card card-safety">
              <h3>Phát hiện va chạm</h3>
              <p>Tự động gọi cứu hộ khi phát hiện tai nạn xe nghiêm trọng.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DANH SÁCH SẢN PHẨM */}
      <section className="watch-products-section">
        <h2 className="section-heading">Chiếc Apple Watch nào dành cho bạn?</h2>
        <div className="store-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} showSpecs={true} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Watch;