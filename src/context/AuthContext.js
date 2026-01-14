import React, { createContext, useState, useEffect } from 'react';

// Tạo một cái "kho" dữ liệu chung
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Khi web vừa load, kiểm tra xem trong máy có lưu phiên đăng nhập chưa
  useEffect(() => {
    const storedUser = localStorage.getItem('appleUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Hàm Đăng nhập
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('appleUser', JSON.stringify(userData)); // Lưu vào bộ nhớ trình duyệt
  };

  // Hàm Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem('appleUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};