import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Store.css';

const Store = () => {
  const [products, setProducts] = useState([]);

  // Gọi API lấy danh sách sản phẩm khi vào trang
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Lỗi lấy dữ liệu:", err));
  }, []);

  return (
    <div className="store-page">
      {/* Phần tiêu đề */}
      <div className="store-header">
        <h1 className="store-title">Cửa Hàng. <span className="highlight">Cách tốt nhất để mua sản phẩm bạn yêu thích.</span></h1>
      </div>

      {/* Lưới sản phẩm */}
      <div className="store-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Store;