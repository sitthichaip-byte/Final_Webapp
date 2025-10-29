<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">💼</span>
            <span class="logo-text">PearJob</span>
          </div>
          <p class="footer-description">
            แพลตฟอร์มหางานออนไลน์ที่ดีที่สุด เชื่อมโยงผู้หางานกับองค์กรชั้นนำ
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h4>บริษัท</h4>
            <ul>
              <li><router-link to="/about">เกี่ยวกับเรา</router-link></li>
              <li><router-link to="/contact">ติดต่อเรา</router-link></li>
              <li><a href="#">ข่าวสาร</a></li>
              <li><a href="#">ร่วมงานกับเรา</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>สำหรับผู้หางาน</h4>
            <ul>
              <li><router-link to="/jobs">ค้นหางาน</router-link></li>
              <li><a href="#">คำแนะนำการสมัครงาน</a></li>
              <li><a href="#">บทความ</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>สำหรับนายจ้าง</h4>
            <ul>
              <li><router-link to="/post-job">ประกาศงาน</router-link></li>
              <li><a href="#">แพ็คเกจ</a></li>
              <li><a href="#">เครื่องมือสำหรับนายจ้าง</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>ช่องทางติดตาม</h4>
            <div class="social-links">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">📷</a>
              <a href="#" class="social-link">🐦</a>
              <a href="#" class="social-link">💼</a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 PearJob. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">เงื่อนไขการใช้งาน</a>
          <a href="#">นโยบายความเป็นส่วนตัว</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background: #1a1a1a;
  color: white;
  padding: 60px 20px 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 60px;
  margin-bottom: 40px;
}

.footer-brand {
  max-width: 350px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.logo-icon {
  font-size: 32px;
}

.logo-text {
  font-size: 28px;
  font-weight: 800;
  color: #ffd700;
}

.footer-description {
  color: #aaa;
  line-height: 1.6;
  font-size: 15px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-column h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffd700;
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 12px;
}

.footer-column ul li a {
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-column ul li a:hover {
  color: white;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #0056a8;
  transform: translateY(-3px);
}

.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-bottom p {
  color: #888;
  font-size: 14px;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 30px;
}

.footer-bottom-links a {
  color: #888;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: white;
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-bottom-links {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 640px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>
