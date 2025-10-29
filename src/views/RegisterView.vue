<template>
  <div class="register-page">
    <div class="register-container">
      <!-- Left Side - Branding -->
      <div class="register-image">
        <div class="overlay">
          <div class="branding">
            <div class="logo-large">💼</div>
            <h1>PearJob</h1>
            <p>เริ่มต้นเส้นทางสู่งานในฝัน</p>
          </div>
        </div>
      </div>

      <!-- Right Side - Register Form -->
      <div class="register-form-wrapper">
        <div class="register-form">
          <div class="form-header">
            <h2>สมัครสมาชิก</h2>
            <p>สร้างบัญชีเพื่อเริ่มต้นใช้งาน</p>
          </div>

          <form @submit.prevent="handleRegister">
            <!-- Full Name -->
            <div class="form-group">
              <label for="fullname">ชื่อ-นามสกุล</label>
              <div class="input-wrapper">
                <span class="input-icon">👤</span>
                <input
                  type="text"
                  id="fullname"
                  v-model="formData.fullname"
                  placeholder="กรอกชื่อ-นามสกุล"
                  required
                />
              </div>
            </div>

            <!-- Email -->
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

            <!-- Phone -->
            <div class="form-group">
              <label for="phone">เบอร์โทรศัพท์</label>
              <div class="input-wrapper">
                <span class="input-icon">📱</span>
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  placeholder="0xx-xxx-xxxx"
                  required
                />
              </div>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="password">รหัสผ่าน</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="formData.password"
                  placeholder="อย่างน้อย 8 ตัวอักษร"
                  required
                />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
              <label for="confirm-password">ยืนยันรหัสผ่าน</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirm-password"
                  v-model="formData.confirmPassword"
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                  required
                />
                <button
                  type="button"
                  class="toggle-password"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>

            <!-- Terms -->
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="formData.acceptTerms" required />
                <span
                  >ฉันยอมรับ <a href="#">เงื่อนไขการใช้งาน</a> และ
                  <a href="#">นโยบายความเป็นส่วนตัว</a></span
                >
              </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn-register" :disabled="isLoading">
              <span v-if="!isLoading">สมัครสมาชิก</span>
              <span v-else class="loading">
                <span class="spinner"></span>
                กำลังสมัคร...
              </span>
            </button>

            <!-- Login Link -->
            <div class="login-link">
              มีบัญชีอยู่แล้ว?
              <router-link to="/login">เข้าสู่ระบบ</router-link>
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
  fullname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

const handleRegister = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('รหัสผ่านไม่ตรงกัน!')
    return
  }

  isLoading.value = true

  setTimeout(() => {
    console.log('Register data:', formData.value)
    isLoading.value = false
    router.push('/login')
  }, 1500)
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding: 20px;
}

.register-container {
  display: flex;
  max-width: 1100px;
  width: 100%;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

/* Left Side */
.register-image {
  flex: 1;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  position: relative;
  min-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Right Side - Form */
.register-form-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.register-form {
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

.form-group {
  margin-bottom: 20px;
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
  padding: 14px 14px 14px 50px;
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
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #555;
}

.checkbox-label input[type='checkbox'] {
  margin-top: 2px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-label a {
  color: #0056a8;
  text-decoration: none;
}

.checkbox-label a:hover {
  text-decoration: underline;
}

.btn-register {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 25px 0 20px;
}

.btn-register:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 58, 112, 0.3);
}

.btn-register:disabled {
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

.login-link {
  text-align: center;
  color: #666;
  font-size: 15px;
}

.login-link a {
  color: #0056a8;
  text-decoration: none;
  font-weight: 700;
  margin-left: 5px;
}

.login-link a:hover {
  text-decoration: underline;
}

@media (max-width: 968px) {
  .register-image {
    display: none;
  }

  .register-form-wrapper {
    padding: 40px 30px;
  }
}
</style>
