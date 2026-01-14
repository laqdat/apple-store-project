import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { FaSearch } from 'react-icons/fa';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Nếu ô tìm kiếm trống thì xóa kết quả ngay
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      // 1. Thay vì gọi ?q=query (tìm lung tung), ta gọi lấy hết sản phẩm về
      fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => {
           // 2. Tự lọc thủ công ở đây cho chuẩn xác 100%
           const searchKey = query.toLowerCase(); // Đổi từ khóa ra chữ thường
           
           const filteredData = data.filter(item => {
             // Chỉ tìm trong Tên (name) HOẶC Danh mục (category)
             const nameMatch = item.name.toLowerCase().includes(searchKey);
             const cateMatch = item.category.toLowerCase().includes(searchKey);
             return nameMatch || cateMatch;
           });

           setResults(filteredData);
        })
        .catch(err => console.error(err));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-page container">
      <div className="search-input-container">
        <FaSearch className="search-icon-large" />
        <input 
          type="text" 
          placeholder="Tìm kiếm iPhone, Mac, iPad..." 
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus // Tự động đặt con trỏ chuột vào đây khi mở trang
        />
      </div>

      <div className="search-results">
        {query && results.length === 0 ? (
          <p className="no-results">Không tìm thấy sản phẩm nào khớp với "{query}".</p>
        ) : (
          <div className="store-grid"> {/* Tận dụng lại class lưới của Store */}
             {results.map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;