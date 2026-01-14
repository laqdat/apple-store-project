import React from 'react';
import './About.css';
import { FaLeaf, FaLock, FaUniversalAccess, FaUsers } from 'react-icons/fa'; // Import icon

const About = () => {
  return (
    <div className="about-page">
      
      {/* 1. HERO: LỜI MỞ ĐẦU */}
      <section className="about-hero">
        <div className="hero-content fade-in">
          <h1 className="about-title">Sáng tạo. Đổi mới. <br/> Thay đổi thế giới.</h1>
          <p className="about-subtitle">Tại Apple, chúng tôi không chỉ tạo ra sản phẩm.<br/> Chúng tôi tạo ra những điều kỳ diệu.</p>
        </div>
      </section>

      {/* 2. SỨ MỆNH & TẦM NHÌN */}
      <section className="about-mission container">
        <div className="mission-box fade-in-up">
          <h2>Sứ Mệnh Của Chúng Tôi</h2>
          <p>
            "Mang đến trải nghiệm người dùng tốt nhất cho khách hàng thông qua phần cứng, 
            phần mềm và dịch vụ sáng tạo của chúng tôi."
          </p>
        </div>
        <div className="mission-divider"></div>
        <div className="mission-box fade-in-up">
          <h2>Tầm Nhìn</h2>
          <p>
            "Chúng tôi tin rằng chúng tôi có mặt trên thế giới này để tạo ra những sản phẩm tuyệt vời, 
            và điều đó sẽ không thay đổi."
          </p>
        </div>
      </section>

      {/* 3. GIÁ TRỊ CỐT LÕI (BENTO GRID STYLE) */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-heading fade-in-up">Giá Trị Của Apple</h2>
          <p className="section-desc fade-in-up">Những nguyên tắc định hình cách chúng tôi làm việc và cống hiến.</p>
          
          <div className="values-grid">
            
            <div className="value-card card-privacy fade-in-up">
              <FaLock className="value-icon" />
              <h3>Quyền Riêng Tư</h3>
              <p>Chúng tôi tin rằng quyền riêng tư là quyền cơ bản của con người.</p>
            </div>

            <div className="value-card card-env fade-in-up">
              <FaLeaf className="value-icon" />
              <h3>Môi Trường</h3>
              <p>Chúng tôi cam kết trung hòa carbon 100% vào năm 2030.</p>
            </div>

            <div className="value-card card-accessibility fade-in-up">
              <FaUniversalAccess className="value-icon" />
              <h3>Trợ Năng</h3>
              <p>Công nghệ mạnh mẽ nhất là công nghệ mà ai cũng có thể sử dụng.</p>
            </div>

            <div className="value-card card-inclusion fade-in-up">
              <FaUsers className="value-icon" />
              <h3>Hòa Nhập & Đa Dạng</h3>
              <p>Chúng tôi xây dựng một văn hóa nơi mọi người đều thuộc về.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CỘT MỐC LỊCH SỬ (TIMELINE) */}
      <section className="about-history container">
        <h2 className="section-heading">Hành Trình Đổi Mới</h2>
        <div className="timeline">
          
          <div className="timeline-item">
            <div className="timeline-year">1976</div>
            <div className="timeline-content">
              <h3>Khởi đầu tại Garage</h3>
              <p>Steve Jobs, Steve Wozniak và Ronald Wayne thành lập Apple Computer Inc.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-year">1984</div>
            <div className="timeline-content">
              <h3>Macintosh ra đời</h3>
              <p>Chiếc máy tính cá nhân đầu tiên thay đổi cách chúng ta làm việc.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-year">2001</div>
            <div className="timeline-content">
              <h3>iPod & iTunes</h3>
              <p>1.000 bài hát trong túi của bạn. Cách mạng hóa ngành âm nhạc.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-year">2007</div>
            <div className="timeline-content">
              <h3>iPhone</h3>
              <p>Apple tái định nghĩa điện thoại di động. Kỷ nguyên smartphone bắt đầu.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-year">Nay</div>
            <div className="timeline-content">
              <h3>Kỷ nguyên mới</h3>
              <p>Apple Vision Pro, Apple Silicon và cam kết về một tương lai xanh.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FOOTER QUOTE */}
      <section className="about-quote">
        <blockquote>
          "Stay Hungry. Stay Foolish."
          <span>— Steve Jobs</span>
        </blockquote>
      </section>

    </div>
  );
};

export default About;