<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Left Side - Image/Branding -->
      <div class="login-image">
        <div class="overlay">
          <div class="branding">
            <div class="logo-large">💼</div>
            <h1>PearJob</h1>
            <p>ค้นหางานที่ใช่สำหรับคุณ</p>
          </div>
          <div class="features">
            <div class="feature-item">
              <span class="icon">✓</span>
              <span>10,000+ ตำแหน่งงาน</span>
            </div>
            <div class="feature-item">
              <span class="icon">✓</span>
              <span>บริษัทชั้นนำทั่วประเทศ</span>
            </div>
            <div class="feature-item">
              <span class="icon">✓</span>
              <span>สมัครงานง่ายในคลิกเดียว</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="login-form-wrapper">
        <div class="login-form">
          <div class="form-header">
            <h2>ยินดีต้อนรับกลับ</h2>
            <p>เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
          </div>

          <form @submit.prevent="handleLogin">
            <!-- Email Input -->
            <div class="form-group">
              <label for="email">อีเมล</label>
              <div class="input-wrapper">
                <span class="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <!-- Password Input -->
            <div class="form-group">
              <label for="password">รหัสผ่าน</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="formData.password"
                  placeholder="••••••••"
                  required
                />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>

            <!-- Remember & Forgot -->
            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" v-model="formData.remember" />
                <span>จดจำฉันไว้</span>
              </label>
              <a href="#" class="forgot-link">ลืมรหัสผ่าน?</a>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn-login" :disabled="isLoading">
              <span v-if="!isLoading">เข้าสู่ระบบ</span>
              <span v-else class="loading">
                <span class="spinner"></span>
                กำลังเข้าสู่ระบบ...
              </span>
            </button>

            <!-- Social Login -->
            <div class="divider">
              <span>หรือเข้าสู่ระบบด้วย</span>
            </div>

            <div class="social-login">
              <button type="button" class="social-btn google">
                <img src="https://www.google.com/favicon.ico" alt="Google" />
                Google
              </button>
              <button type="button" class="social-btn facebook">
                <span class="fb-icon">f</span>
                Facebook
              </button>
            </div>

            <!-- Register Link -->
            <div class="register-link">
              ยังไม่มีบัญชี?
              <router-link to="/register">สมัครสมาชิก</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true

  // Simulate API call
  setTimeout(() => {
    console.log('Login data:', formData.value)
    isLoading.value = false

    // Redirect after login
    router.push('/')
  }, 1500)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding: 20px;
}

.login-container {
  display: flex;
  max-width: 1100px;
  width: 100%;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

/* Left Side - Image */
.login-image {
  flex: 1;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  position: relative;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/interview.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.15;
}

.overlay {
  position: relative;
  z-index: 1;
  padding: 60px;
  color: white;
  text-align: center;
}

.branding {
  margin-bottom: 60px;
}

.logo-large {
  font-size: 80px;
  margin-bottom: 20px;
  background: white;
  width: 120px;
  height: 120px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.branding h1 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #ffd700;
}

.branding p {
  font-size: 18px;
  opacity: 0.9;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.feature-item .icon {
  background: #ffd700;
  color: #003a70;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

/* Right Side - Form */
.login-form-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.login-form {
  width: 100%;
  max-width: 450px;
}

.form-header {
  margin-bottom: 40px;
}

.form-header h2 {
  font-size: 32px;
  font-weight: 800;
  color: #003a70;
  margin-bottom: 10px;
}

.form-header p {
  color: #666;
  font-size: 16px;
}

/* Form Groups */
.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  font-size: 20px;
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 16px 16px 16px 50px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #0056a8;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 86, 168, 0.1);
}

.toggle-password {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  transition: transform 0.2s ease;
}

.toggle-password:hover {
  transform: scale(1.1);
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #555;
}

.checkbox-label input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.forgot-link {
  color: #0056a8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #003a70;
  text-decoration: underline;
}

/* Submit Button */
.btn-login {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 25px;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 58, 112, 0.3);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Divider */
.divider {
  text-align: center;
  margin: 30px 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #e0e0e0;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: white;
  padding: 0 15px;
  color: #999;
  font-size: 14px;
  position: relative;
}

/* Social Login */
.social-login {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.social-btn {
  flex: 1;
  padding: 14px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  border-color: #003a70;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-btn img {
  width: 20px;
  height: 20px;
}

.social-btn.google {
  color: #333;
}

.social-btn.facebook {
  color: #1877f2;
}

.fb-icon {
  background: #1877f2;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
}

/* Register Link */
.register-link {
  text-align: center;
  color: #666;
  font-size: 15px;
}

.register-link a {
  color: #0056a8;
  text-decoration: none;
  font-weight: 700;
  margin-left: 5px;
}

.register-link a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 968px) {
  .login-image {
    display: none;
  }

  .login-form-wrapper {
    padding: 40px 30px;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 10px;
  }

  .login-form-wrapper {
    padding: 30px 20px;
  }

  .form-header h2 {
    font-size: 26px;
  }

  .social-login {
    flex-direction: column;
  }
}
</style>
