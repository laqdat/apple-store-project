import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 1. Lấy giỏ hàng từ kho (LocalStorage) khi vừa vào web
  useEffect(() => {
    const storedCart = localStorage.getItem('appleCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // 2. Mỗi khi giỏ hàng thay đổi, lưu ngay vào kho
  useEffect(() => {
    localStorage.setItem('appleCart', JSON.stringify(cart));
  }, [cart]);

  // --- CÁC HÀM XỬ LÝ ---

  // Thêm sản phẩm vào giỏ
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // Nếu có rồi thì tăng số lượng lên 1
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Nếu chưa có thì thêm mới với số lượng 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`Đã thêm ${product.name} vào giỏ!`);
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Tăng/Giảm số lượng
  const updateQuantity = (productId, amount) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + amount;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  // Xóa sạch giỏ (sau khi thanh toán)
  const clearCart = () => {
    setCart([]);
  };

  // Tính tổng tiền
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};