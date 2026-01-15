// Đường dẫn gốc của API
const API_URL = 'http://localhost:5000';

// --- SERVICE CHO SẢN PHẨM ---
export const ProductService = {
  // Lấy tất cả hoặc tìm kiếm (Backend Filtering)
  getAll: async (keyword = '') => {
    // Nếu có từ khóa -> gọi API tìm kiếm (?q=keyword). Nếu không -> lấy hết
    const url = keyword 
      ? `${API_URL}/products?q=${keyword}` 
      : `${API_URL}/products`;
      
    const res = await fetch(url);
    return res.json();
  },

  // Thêm mới
  create: async (data) => {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Cập nhật
  update: async (id, data) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Xóa
  delete: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return res.json(); // JSON Server trả về obj rỗng khi xóa thành công
  },
};

// --- SERVICE CHO ĐƠN HÀNG ---
export const OrderService = {
  // Lấy danh sách đơn hàng (Có tìm kiếm phía Backend)
  getAll: async (keyword = '') => {
    const url = keyword 
      ? `${API_URL}/orders?q=${keyword}` 
      : `${API_URL}/orders`;
      
    const res = await fetch(url);
    return res.json();
  },

  // Cập nhật trạng thái
  updateStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  // Xóa đơn
  delete: async (id) => {
    await fetch(`${API_URL}/orders/${id}`, { method: 'DELETE' });
  }
};