import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './iPhone.css';

const Iphone = () => {
  const [products, setProducts] = useState([]);
  const [scrollScale, setScrollScale] = useState(1);

  useEffect(() => {
    fetch('http://localhost:5000/products?category=iphone')
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
    <div className="iphone-page">
      
      {/* 1. HERO SECTION */}
      <section className="iphone-hero">
        <h1 className="iphone-title">iPhone 15 Pro</h1>
        <p className="iphone-subtitle">Titanium. Thật bền bỉ. Thật nhẹ. Thật Pro.</p>
        
        <div className="iphone-video-wrapper">
           <div className="iphone-video-container" style={{ transform: `scale(${scrollScale})` }}>
             <video autoPlay muted loop playsInline className="iphone-video">
               <source src="/iphone_video.mp4" type="video/mp4" />
             </video>
           </div>
        </div>
      </section>

      {/* 2. SECTION TITANIUM (Giao diện tối) */}
      <section className="iphone-highlight dark-bg">
        <div className="container">
          <h2 className="highlight-text">iPhone. <br/> Được rèn từ <span className="text-titanium">Titanium</span>.</h2>
          <p className="highlight-desc">
            iPhone 15 Pro là chiếc iPhone đầu tiên có thiết kế từ titan chuẩn hàng không vũ trụ, 
            cùng loại hợp kim sử dụng cho các tàu vũ trụ thực hiện sứ mệnh đến sao Hỏa.
          </p>
        </div>
      </section>

      {/* 3. SECTION CAMERA */}
      <section className="iphone-camera container">
        <div className="camera-content">
          <h2>Camera bắt trọn trí tưởng tượng hoang đường nhất của bạn.</h2>
          <p>Từ khung hình linh hoạt ấn tượng đến ảnh chân dung thế hệ mới, hãy xem những gì bạn có thể làm với hệ thống camera iPhone mạnh mẽ nhất.</p>
          <div className="camera-badge">48MP Main | Ultra Wide | Telephoto</div>
        </div>
      </section>

      {/* 4. SECTION BENTO GRID (CÁC Ô TÍNH NĂNG - ĂN ĐIỂM CHỖ NÀY) */}
      <section className="iphone-bento container">
        <h2>Sức mạnh Pro.</h2>
        <div className="bento-grid">
          
          <div className="bento-box box-chip">
            <h3>A17 Pro</h3>
            <p>Con chip thay đổi cuộc chơi. Hiệu năng đồ họa đột phá.</p>
          </div>

          <div className="bento-box box-battery">
            <h3>Pin Pro</h3>
            <p>Thời lượng pin cả ngày dài. Lên đến 29 giờ xem video.</p>
          </div>

          <div className="bento-box box-action">
            <h3>Nút Tác Vụ</h3>
            <p>Lối tắt đến tính năng yêu thích của bạn.</p>
          </div>

          <div className="bento-box box-usb">
            <h3>USB-C</h3>
            <p>Tương thích mọi nơi. Tốc độ truyền dữ liệu nhanh hơn 20x.</p>
          </div>

        </div>
      </section>

      {/* 5. DANH SÁCH SẢN PHẨM */}
      <section className="iphone-products-section">
        <h2 className="section-heading">iPhone nào phù hợp với bạn?</h2>
        <div className="store-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} showSpecs={true} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Iphone;