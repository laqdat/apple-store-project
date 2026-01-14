import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { FaMobileAlt, FaLaptop, FaTabletAlt, FaHeadphones } from 'react-icons/fa'; // Import icon cho đẹp
import './Accessories.css';

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    // Chỉ lấy những sản phẩm có category là 'accessories'
    fetch('http://localhost:5000/products?category=accessories')
      .then(res => res.json())
      .then(data => setAccessories(data))
      .catch(err => console.error(err));
  }, []);

  // Hàm lọc sản phẩm theo thiết bị (dựa vào trường 'device' trong db.json)
  const iphoneItems = accessories.filter(item => item.device === 'iphone');
  const ipadItems = accessories.filter(item => item.device === 'ipad');
  const macItems = accessories.filter(item => item.device === 'mac');

  // Hàm cuộn trang mượt mà khi bấm menu
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="acc-page">
      
      {/* 1. HERO SECTION: Giới thiệu chung */}
      <section className="acc-hero">
        <h1 className="acc-title">Phụ Kiện Apple</h1>
        <p className="acc-subtitle">Kết hợp hoàn hảo. <span className="colorful-text">Điểm tô cá tính.</span></p>
        
        {/* Menu nhanh (Quick Nav) */}
        <div className="acc-nav">
          <button onClick={() => scrollToSection('section-iphone')} className="acc-nav-item">
            <FaMobileAlt size={24} />
            <span>iPhone</span>
          </button>
          <button onClick={() => scrollToSection('section-ipad')} className="acc-nav-item">
            <FaTabletAlt size={24} />
            <span>iPad</span>
          </button>
          <button onClick={() => scrollToSection('section-mac')} className="acc-nav-item">
            <FaLaptop size={24} />
            <span>Mac</span>
          </button>
        </div>
      </section>

      {/* 2. KHU VỰC IPHONE */}
      <section id="section-iphone" className="acc-section">
        <div className="container">
          <div className="section-header">
            <h2>Phụ kiện iPhone</h2>
            <p>Bảo vệ và cá nhân hóa chiếc điện thoại của bạn.</p>
          </div>
          <div className="store-grid">
            {iphoneItems.length > 0 ? (
              iphoneItems.map(item => <ProductCard key={item.id} product={item} showSpecs={true} />)
            ) : (
              <p className="empty-msg">Đang cập nhật phụ kiện iPhone...</p>
            )}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* 3. KHU VỰC IPAD */}
      <section id="section-ipad" className="acc-section">
        <div className="container">
          <div className="section-header">
            <h2>Phụ kiện iPad</h2>
            <p>Làm việc hiệu quả hơn. Sáng tạo mọi lúc mọi nơi.</p>
          </div>
          <div className="store-grid">
            {ipadItems.length > 0 ? (
              ipadItems.map(item => <ProductCard key={item.id} product={item} showSpecs={true} />)
            ) : (
              <p className="empty-msg">Đang cập nhật phụ kiện iPad...</p>
            )}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* 4. KHU VỰC MAC */}
      <section id="section-mac" className="acc-section">
        <div className="container">
          <div className="section-header">
            <h2>Phụ kiện Mac</h2>
            <p>Nâng tầm không gian làm việc chuyên nghiệp.</p>
          </div>
          <div className="store-grid">
            {macItems.length > 0 ? (
              macItems.map(item => <ProductCard key={item.id} product={item} showSpecs={true} />)
            ) : (
              <p className="empty-msg">Đang cập nhật phụ kiện Mac...</p>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Accessories;