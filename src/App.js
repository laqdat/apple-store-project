import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Import các thành phần chung
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 2. Import ĐẦY ĐỦ các trang (Kiểm tra kỹ đoạn này)
import Home from './pages/Home';
import Store from './pages/Store';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Search from './pages/Search';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess'; 

// 3. Import các trang sản phẩm chi tiết (Lúc nãy bị thiếu cái này)
import Mac from './pages/Mac';
import Iphone from './pages/iPhone'; // Lưu ý tên file của bạn là iPhone.js hay Iphone.js thì sửa lại cho khớp
import Ipad from './pages/iPad';     // Lưu ý tên file iPad.js
import Watch from './pages/Watch';
import Accessories from './pages/Accessories';
import About from './pages/About';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        {/* Phần nội dung chính */}
        <div style={{ minHeight: 'calc(100vh - 44px - 300px)' }}> 
          <Routes>
            {/* Các trang chức năng chính */}
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            
            
            {/* Trang thông báo đặt hàng thành công (Khai báo cả 2 kiểu cho chắc) */}
            <Route path="/order-success/:id" element={<OrderSuccess />} />
            <Route path="/ordersuccess/:id" element={<OrderSuccess />} />

            {/* --- CÁC TRANG SẢN PHẨM (ĐÃ KHÔI PHỤC LẠI) --- */}
            <Route path="/mac" element={<Mac />} />
            <Route path="/iphone" element={<Iphone />} />
            <Route path="/ipad" element={<Ipad />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/accessories" element={<Accessories />} />
            
            {/* Trang giới thiệu (Dùng cả 2 đường dẫn cho chắc) */}
            <Route path="/about" element={<About />} />
            <Route path="/gioi-thieu" element={<About />} />
            
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;