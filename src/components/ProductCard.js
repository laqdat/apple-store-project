import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

// Thêm prop showSpecs vào đây
const ProductCard = ({ product, showSpecs = false }) => {
  const { addToCart } = useContext(CartContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="product-card">
      <div className="card-image-container">
        <img src={product.image} alt={product.name} className="card-image" />
      </div>
      
      <div className="card-info">
        <h3 className="card-name">{product.name}</h3>
        <p className="card-price">{formatPrice(product.price)}</p>

        {/* --- PHẦN MỚI THÊM: HIỂN THỊ THÔNG SỐ --- */}
        {showSpecs && product.specs && (
          <ul className="product-specs">
            {product.specs.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        )}
        {/* ---------------------------------------- */}

        <div className="card-actions">
           <button 
             className="btn-buy"
             onClick={() => addToCart(product)}
           >
             Thêm vào giỏ
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;