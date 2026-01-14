import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  // --- 1. PHẦN ĐĂNG NHẬP ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Kiểm tra xem đã đăng nhập chưa (lưu trong LocalStorage)
    const logged = localStorage.getItem('isAdminLoggedIn');
    if (logged === 'true') {
      setIsLoggedIn(true);
    }
    fetchProducts();
    fetchOrders();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      setIsLoggedIn(true);
      alert("Xin chào Admin Lã Đạt đẹp trai!");
    } else {
      alert("Sai tài khoản hoặc mật khẩu rồi!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
  };

  // --- 2. PHẦN QUẢN TRỊ (LOGIC CŨ + MỚI) ---
  const [activeTab, setActiveTab] = useState('dashboard'); // Mặc định vào Dashboard
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // State Modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'PRODUCT', 'ORDER_STATUS', 'ORDER_DETAIL'
  const [editingId, setEditingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu đơn hàng đang xem chi tiết

  // Form Data
  const [productForm, setProductForm] = useState({ name: '', price: '', image: '', category: 'iphone' });
  const [orderStatus, setOrderStatus] = useState('');

  // Fetch Data
  const fetchProducts = () => fetch('http://localhost:5000/products').then(res => res.json()).then(data => setProducts(data));
  const fetchOrders = () => fetch('http://localhost:5000/orders').then(res => res.json()).then(data => setOrders(data));

  // --- XỬ LÝ ẢNH ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProductForm({ ...productForm, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // --- LOGIC SẢN PHẨM ---
  const handleAddProduct = () => {
    setModalType('PRODUCT');
    setEditingId(null);
    setProductForm({ name: '', price: '', image: '', category: 'iphone' });
    setShowModal(true);
  };

  const handleEditProduct = (p) => {
    setModalType('PRODUCT');
    setEditingId(p.id);
    setProductForm(p);
    setShowModal(true);
  };

  const saveProduct = (e) => {
    e.preventDefault();
    const data = { ...productForm, price: parseInt(productForm.price) };
    const api = editingId ? `http://localhost:5000/products/${editingId}` : 'http://localhost:5000/products';
    const method = editingId ? 'PUT' : 'POST';

    fetch(api, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => {
      fetchProducts();
      setShowModal(false);
    });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Xóa nhé?")) fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' }).then(fetchProducts);
  };

  // --- LOGIC ĐƠN HÀNG (MỚI) ---
  const handleViewOrderDetail = (order) => {
    setSelectedOrder(order);
    setModalType('ORDER_DETAIL');
    setShowModal(true);
  };

  const handleEditOrderStatus = (order) => {
    setModalType('ORDER_STATUS');
    setSelectedOrder(order);
    setOrderStatus(order.status || 'Chờ xác nhận');
    setShowModal(true);
  };

  const saveOrderStatus = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/orders/${selectedOrder.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: orderStatus })
    }).then(() => {
      fetchOrders();
      setShowModal(false);
    });
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm("Xóa lịch sử đơn này?")) fetch(`http://localhost:5000/orders/${id}`, { method: 'DELETE' }).then(fetchOrders);
  };

  // --- RENDER MODAL ---
  const renderModal = () => (
    <div className="modal-overlay">
      <div className="modal-content" style={modalType === 'ORDER_DETAIL' ? {width: '600px'} : {}}>
        <div className="modal-header">
          <h3>
            {modalType === 'PRODUCT' && (editingId ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm')}
            {modalType === 'ORDER_STATUS' && 'Cập nhật trạng thái'}
            {modalType === 'ORDER_DETAIL' && `Chi tiết đơn hàng #${selectedOrder?.id}`}
          </h3>
          <button className="btn-close" onClick={() => setShowModal(false)}>×</button>
        </div>

        {/* 1. FORM SẢN PHẨM */}
        {modalType === 'PRODUCT' && (
          <form onSubmit={saveProduct}>
            <div className="form-group">
              <label>Tên:</label>
              <input type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} required/>
            </div>
            <div className="form-group">
              <label>Giá:</label>
              <input type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} required/>
            </div>
            <div className="form-group">
              <label>Ảnh:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {productForm.image && <img src={productForm.image} alt="" style={{height: '80px', marginTop: '10px'}}/>}
            </div>
            <div className="form-group">
              <label>Loại:</label>
              <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})}>
                <option value="iphone">iPhone</option>
                <option value="mac">Mac</option>
                <option value="ipad">iPad</option>
                <option value="watch">Watch</option>
              </select>
            </div>
            <button type="submit" className="btn-save full-width">Lưu Sản Phẩm</button>
          </form>
        )}

        {/* 2. FORM TRẠNG THÁI ĐƠN HÀNG */}
        {modalType === 'ORDER_STATUS' && (
          <form onSubmit={saveOrderStatus}>
            <div className="form-group">
              <label>Trạng thái hiện tại:</label>
              <select value={orderStatus} onChange={e => setOrderStatus(e.target.value)}>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đang đóng gói">Đang đóng gói</option>
                <option value="Đang vận chuyển">Đang vận chuyển</option>
                <option value="Đã giao hàng">Đã giao hàng</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>
            <button type="submit" className="btn-save full-width">Cập nhật</button>
          </form>
        )}

        {/* 3. BẢNG CHI TIẾT ĐƠN HÀNG (MỚI) */}
        {modalType === 'ORDER_DETAIL' && selectedOrder && (
          <div className="order-detail-view">
            <div className="customer-info-box">
              <p><strong>Khách hàng:</strong> {selectedOrder.customerInfo?.name}</p>
              <p><strong>SĐT:</strong> {selectedOrder.customerInfo?.phone}</p>
              <p><strong>Địa chỉ:</strong> {selectedOrder.customerInfo?.address}</p>
              <p><strong>Ghi chú:</strong> {selectedOrder.customerInfo?.note || 'Không có'}</p>
            </div>
            <table className="detail-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>SL</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {/* Kiểm tra xem trong db lưu là 'cart' hay 'items' để lấy đúng */}
                {(selectedOrder.cart || selectedOrder.items || []).map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{parseInt(item.price).toLocaleString()}đ</td>
                    <td>x{item.quantity}</td>
                    <td>{(item.price * item.quantity).toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" style={{textAlign: 'right', fontWeight: 'bold'}}>TỔNG CỘNG:</td>
                  <td style={{fontWeight: 'bold', color: '#d70018'}}>{selectedOrder.total?.toLocaleString()}đ</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  // --- MÀN HÌNH LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    );
  }

  // --- MÀN HÌNH ADMIN CHÍNH ---
  return (
    <div className="admin-container">
      {showModal && renderModal()}
      
      <div className="admin-sidebar">
        <div className="sidebar-header">Apple Admin</div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Sản phẩm</li>
          <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Đơn hàng</li>
          <li className="logout" onClick={handleLogout}>Đăng xuất</li>
        </ul>
      </div>

      <div className="admin-main">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
           <div className="admin-content">
             <h2>Tổng quan</h2>
             <div className="stats-grid">
               <div className="stat-card blue"><h3>{products.length}</h3><p>Sản phẩm</p></div>
               <div className="stat-card green"><h3>{orders.length}</h3><p>Đơn hàng</p></div>
               <div className="stat-card orange">
                 <h3>{orders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString()}đ</h3>
                 <p>Doanh thu</p>
               </div>
             </div>
           </div>
        )}

        {/* SẢN PHẨM */}
        {activeTab === 'products' && (
          <div className="admin-content">
            <div className="header-flex"><h2>Quản lý Sản phẩm</h2><button className="btn-add" onClick={handleAddProduct}>+ Thêm mới</button></div>
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Hình</th><th>Tên</th><th>Giá</th><th>Hành động</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td><img src={p.image} alt="" style={{width: '40px', borderRadius:'4px'}}/></td>
                    <td>{p.name}</td>
                    <td>{parseInt(p.price).toLocaleString()}đ</td>
                    <td>
                      <button className="btn-action edit" onClick={() => handleEditProduct(p)}>Sửa</button>
                      <button className="btn-action delete" onClick={() => handleDeleteProduct(p.id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ĐƠN HÀNG */}
        {activeTab === 'orders' && (
          <div className="admin-content">
            <h2>Quản lý Đơn hàng</h2>
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Khách hàng</th><th>Tổng tiền</th><th>Trạng thái</th><th>Chi tiết</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.customerInfo?.name}<br/><small>{o.customerInfo?.phone}</small></td>
                    <td>{o.total?.toLocaleString()}đ</td>
                    <td><span className={`status-badge ${o.status === 'Đã giao hàng' ? 'done' : 'pending'}`}>{o.status || 'Chờ xác nhận'}</span></td>
                    <td>
                      <button className="btn-action view" onClick={() => handleViewOrderDetail(o)}>Xem list</button>
                      <button className="btn-action edit" onClick={() => handleEditOrderStatus(o)}>Sửa TT</button>
                      <button className="btn-action delete" onClick={() => handleDeleteOrder(o.id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;