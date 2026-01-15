import React, { useState, useEffect } from 'react';
import './Admin.css';
// Import Service vừa tạo
import { ProductService, OrderService } from '../services/apiService'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Admin = () => {
  // --- STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dữ liệu hiển thị (Lấy trực tiếp từ Backend đã lọc, không cần filteredProducts nữa)
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  // State Modal & Form... (Giữ nguyên logic cũ)
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [editingId, setEditingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', price: '', image: '', category: 'iphone' });
  const [orderStatus, setOrderStatus] = useState('');

  // --- 1. LOGIN LOGIC (Giữ nguyên) ---
  useEffect(() => {
    const logged = localStorage.getItem('isAdminLoggedIn');
    if (logged === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      setIsLoggedIn(true);
      // Login xong mới tải dữ liệu
      loadData(); 
    } else {
      alert("Sai tài khoản/mật khẩu!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
  };

  // --- 2. LOAD DATA (DÙNG SERVICE & BACKEND FILTER) ---
  
  // Hàm tải dữ liệu chung
  const loadData = () => {
    fetchProducts();
    fetchOrders();
  };

  // Gọi Service lấy sản phẩm (Có truyền từ khóa tìm kiếm)
  const fetchProducts = async (keyword = '') => {
    try {
      const data = await ProductService.getAll(keyword);
      setProducts(data); // Backend đã lọc rồi, set thẳng vào state
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
    }
  };

  // Gọi Service lấy đơn hàng
  const fetchOrders = async (keyword = '') => {
    try {
      const data = await OrderService.getAll(keyword);
      setOrders(data);
    } catch (error) {
      console.error("Lỗi tải đơn hàng:", error);
    }
  };

  // --- XỬ LÝ TÌM KIẾM (BACKEND FILTERING) ---
  
  // Khi người dùng gõ tìm kiếm, ta gọi API luôn (hoặc dùng nút tìm kiếm)
  useEffect(() => {
    // Kỹ thuật Debounce: Đợi người dùng ngừng gõ 500ms mới gọi API (để đỡ spam server)
    const delayDebounceFn = setTimeout(() => {
      if (isLoggedIn) {
        if (activeTab === 'products') {
          fetchProducts(searchTerm); // Gửi từ khóa xuống backend
        } else if (activeTab === 'orders') {
          fetchOrders(searchTerm);   // Gửi từ khóa xuống backend
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeTab, isLoggedIn]);


  // --- CÁC HÀM XỬ LÝ SỰ KIỆN (DÙNG SERVICE) ---

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProductForm({ ...productForm, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Thêm/Sửa Sản phẩm dùng Service
  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { ...productForm, price: parseInt(productForm.price) };
    
    try {
      if (editingId) {
        await ProductService.update(editingId, data); // Gọi Service Update
      } else {
        await ProductService.create(data); // Gọi Service Create
      }
      alert("Thành công!");
      fetchProducts(searchTerm); // Tải lại dữ liệu (giữ nguyên tìm kiếm hiện tại)
      setShowModal(false);
    } catch (error) {
      alert("Có lỗi xảy ra!");
    }
  };

  // Xóa Sản phẩm dùng Service
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Xóa sản phẩm này nhé?")) {
      await ProductService.delete(id);
      fetchProducts(searchTerm);
    }
  };

  // Cập nhật trạng thái đơn hàng dùng Service
  const saveOrderStatus = async (e) => {
    e.preventDefault();
    try {
      await OrderService.updateStatus(selectedOrder.id, orderStatus);
      alert("Đã cập nhật trạng thái!");
      fetchOrders(searchTerm);
      setShowModal(false);
    } catch (error) {
      alert("Lỗi cập nhật!");
    }
  };

  // Xóa đơn hàng dùng Service
  const handleDeleteOrder = async (id) => {
    if (window.confirm("Xóa đơn này?")) {
      await OrderService.delete(id);
      fetchOrders(searchTerm);
    }
  };

  // Các hàm mở Modal (Giữ nguyên logic)
  const handleAddProduct = () => {
    setModalType('PRODUCT'); setEditingId(null);
    setProductForm({ name: '', price: '', image: '', category: 'iphone' }); setShowModal(true);
  };
  const handleEditProduct = (p) => {
    setModalType('PRODUCT'); setEditingId(p.id); setProductForm(p); setShowModal(true);
  };
  const handleViewOrderDetail = (o) => { setSelectedOrder(o); setModalType('ORDER_DETAIL'); setShowModal(true); };
  const handleEditOrderStatus = (o) => {
    setModalType('ORDER_STATUS'); setSelectedOrder(o); setOrderStatus(o.status || 'Chờ xác nhận'); setShowModal(true);
  };

  // --- BIỂU ĐỒ (Giả lập dữ liệu) ---
  const dataChart = [
    { name: 'T1', revenue: 40000000 }, { name: 'T2', revenue: 30000000 },
    { name: 'T3', revenue: 20000000 }, { name: 'T4', revenue: 27800000 },
    { name: 'T5', revenue: 18900000 }, { name: 'T6', revenue: 23900000 },
  ];

  // --- RENDER (GIỮ NGUYÊN CSS & HTML) ---
  const renderModal = () => (
    <div className="modal-overlay">
      <div className="modal-content" style={modalType === 'ORDER_DETAIL' ? {width: '600px'} : {}}>
        <div className="modal-header">
          <h3>{modalType === 'PRODUCT' ? (editingId ? 'Sửa' : 'Thêm') : modalType === 'ORDER_STATUS' ? 'Cập nhật' : 'Chi tiết'}</h3>
          <button className="btn-close" onClick={() => setShowModal(false)}>×</button>
        </div>
        {/* Form Sản phẩm */}
        {modalType === 'PRODUCT' && (
          <form onSubmit={saveProduct}>
            <div className="form-group"><label>Tên:</label><input value={productForm.name} onChange={e=>setProductForm({...productForm, name:e.target.value})} required/></div>
            <div className="form-group"><label>Giá:</label><input type="number" value={productForm.price} onChange={e=>setProductForm({...productForm, price:e.target.value})} required/></div>
            <div className="form-group"><label>Ảnh:</label><input type="file" onChange={handleImageUpload} />{productForm.image && <img src={productForm.image} alt="" style={{height:'60px'}}/>}</div>
            <div className="form-group"><label>Loại:</label><select value={productForm.category} onChange={e=>setProductForm({...productForm, category:e.target.value})}><option value="iphone">iPhone</option><option value="mac">Mac</option><option value="ipad">iPad</option><option value="watch">Watch</option></select></div>
            <button className="btn-save full-width">Lưu</button>
          </form>
        )}
        {/* Form Đơn hàng */}
        {modalType === 'ORDER_STATUS' && (
          <form onSubmit={saveOrderStatus}>
            <div className="form-group"><label>Trạng thái:</label><select value={orderStatus} onChange={e=>setOrderStatus(e.target.value)}><option>Chờ xác nhận</option><option>Đang giao hàng</option><option>Đã giao hàng</option><option>Đã hủy</option></select></div>
            <button className="btn-save full-width">Cập nhật</button>
          </form>
        )}
        {/* Chi tiết đơn */}
        {modalType === 'ORDER_DETAIL' && selectedOrder && (
          <div className="order-detail-view">
            <p><strong>Khách:</strong> {selectedOrder.customerInfo?.name} - {selectedOrder.customerInfo?.phone}</p>
            <table className="detail-table">
               <thead><tr><th>Tên</th><th>SL</th><th>Giá</th></tr></thead>
               <tbody>{(selectedOrder.cart || []).map((i,idx)=>(<tr key={idx}><td>{i.name}</td><td>{i.quantity}</td><td>{(i.price*i.quantity).toLocaleString()}đ</td></tr>))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  if (!isLoggedIn) return (
    <div className="login-container" style={{marginTop: '100px', position:'relative', zIndex:10}}>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2><input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} /><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><button>Đăng nhập</button>
      </form>
    </div>
  );

  return (
    <div className="admin-container">
      {showModal && renderModal()}
      <div className="admin-sidebar">
        <div className="sidebar-header">Apple Admin</div>
        <ul className="sidebar-menu">
          <li className={activeTab==='dashboard'?'active':''} onClick={()=>setActiveTab('dashboard')}>Dashboard</li>
          <li className={activeTab==='products'?'active':''} onClick={()=>setActiveTab('products')}>Sản phẩm</li>
          <li className={activeTab==='orders'?'active':''} onClick={()=>setActiveTab('orders')}>Đơn hàng</li>
          <li className="logout" onClick={handleLogout}>Đăng xuất</li>
        </ul>
      </div>

      <div className="admin-main">
        {activeTab === 'dashboard' && (
           <div className="admin-content">
             <h2>Dashboard</h2>
             <div className="stats-grid">
               <div className="stat-card blue"><h3>{products.length}</h3><p>Sản phẩm</p></div>
               <div className="stat-card green"><h3>{orders.length}</h3><p>Đơn hàng</p></div>
             </div>
             <div style={{marginTop:'20px', background:'white', padding:'20px', borderRadius:'10px'}}>
                <ResponsiveContainer width="100%" height={300}><BarChart data={dataChart}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="revenue" fill="#0071e3"/></BarChart></ResponsiveContainer>
             </div>
           </div>
        )}

        {/* Tab Sản phẩm có Input tìm kiếm gọi backend */}
        {activeTab === 'products' && (
          <div className="admin-content">
            <div className="header-flex">
              <h2>Sản phẩm</h2>
              <input 
                placeholder="Tìm kiếm backend..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                style={{padding:'10px', width:'300px', borderRadius:'8px', border:'1px solid #ddd'}}
              />
              <button className="btn-add" onClick={handleAddProduct}>+ Thêm</button>
            </div>
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Ảnh</th><th>Tên</th><th>Giá</th><th>Hành động</th></tr></thead>
              <tbody>
                {/* Render trực tiếp products, KHÔNG filter ở đây nữa */}
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td><td><img src={p.image} alt="" style={{width:'40px'}}/></td><td>{p.name}</td><td>{parseInt(p.price).toLocaleString()}đ</td>
                    <td><button className="btn-action edit" onClick={()=>handleEditProduct(p)}>Sửa</button><button className="btn-action delete" onClick={()=>handleDeleteProduct(p.id)}>Xóa</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Đơn hàng cũng tìm kiếm backend */}
        {activeTab === 'orders' && (
          <div className="admin-content">
             <div className="header-flex">
                <h2>Đơn hàng</h2>
                <input 
                  placeholder="Tìm tên khách, SĐT..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                  style={{padding:'10px', width:'300px', borderRadius:'8px', border:'1px solid #ddd'}}
                />
             </div>
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Khách</th><th>Tổng</th><th>TT</th><th>Hành động</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>#{o.id}</td><td>{o.customerInfo?.name}</td><td>{o.total?.toLocaleString()}đ</td>
                    <td><span className={`status-badge ${o.status==='Đã giao hàng'?'done':'pending'}`}>{o.status||'Chờ xác nhận'}</span></td>
                    <td><button className="btn-action view" onClick={()=>handleViewOrderDetail(o)}>Xem</button><button className="btn-action edit" onClick={()=>handleEditOrderStatus(o)}>Sửa</button><button className="btn-action delete" onClick={()=>handleDeleteOrder(o.id)}>Xóa</button></td>
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