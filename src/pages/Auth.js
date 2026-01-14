import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Trạng thái: đang ở form Đăng nhập hay Đăng ký
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext); // Lấy hàm login từ Context
  const navigate = useNavigate(); // Dùng để chuyển trang

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- LOGIC ĐĂNG NHẬP ---
    if (isLogin) {
      try {
        // Tìm user trong db.json khớp email và pass
        const res = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`);
        const users = await res.json();

        if (users.length > 0) {
          login(users[0]); // Lưu thông tin user
          alert("Đăng nhập thành công!");
          navigate('/'); // Chuyển về trang chủ
        } else {
          setError("Email hoặc mật khẩu không đúng!");
        }
      } catch (err) {
        setError("Lỗi kết nối server!");
      }
    } 
    
    // --- LOGIC ĐĂNG KÝ ---
    else {
      // 1. Kiểm tra xem email đã tồn tại chưa
      const checkRes = await fetch(`http://localhost:5000/users?email=${formData.email}`);
      const checkData = await checkRes.json();

      if (checkData.length > 0) {
        setError("Email này đã được sử dụng!");
        return;
      }

      // 2. Nếu chưa có thì tạo mới
      const newUser = { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      };

      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      if (res.ok) {
        const userCreated = await res.json();
        login(userCreated); // Đăng ký xong tự đăng nhập luôn
        alert("Đăng ký thành công!");
        navigate('/');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
        <p className="auth-subtitle">Sử dụng tài khoản Apple ID của bạn.</p>
        
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input 
              type="text" name="name" placeholder="Họ và tên" 
              className="auth-input" onChange={handleChange} required 
            />
          )}
          <input 
            type="email" name="email" placeholder="Email" 
            className="auth-input" onChange={handleChange} required 
          />
          <input 
            type="password" name="password" placeholder="Mật khẩu" 
            className="auth-input" onChange={handleChange} required 
          />
          
          <button type="submit" className="btn-auth">
            {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? 'Tạo ngay' : 'Đăng nhập'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;