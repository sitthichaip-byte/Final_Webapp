<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">&times;</button>

      <h2>เข้าสู่ระบบ</h2>

      <button class="google-btn">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path
            fill="#4285F4"
            d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"
          />
          <path
            fill="#34A853"
            d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"
          />
          <path
            fill="#FBBC05"
            d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"
          />
          <path
            fill="#EA4335"
            d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"
          />
        </svg>
        ดำเนินการต่อด้วยบัญชี Google
      </button>

      <div class="divider">หรือ</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>อีเมล</label>
          <input v-model="loginData.email" type="email" required placeholder="กรอกอีเมลของคุณ" />
        </div>
        <div class="form-group">
          <label>รหัสผ่าน</label>
          <input v-model="loginData.password" type="password" required placeholder="กรอกรหัสผ่าน" />
        </div>
        <button type="submit" class="btn-primary">เข้าสู่ระบบ</button>
      </form>

      <div class="modal-footer">
        ยังไม่มีบัญชีผู้ใช้ใช่ไหม? <a @click="switchToRegister">ลงทะเบียนที่นี่</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'

const emit = defineEmits(['close'])
const switchToRegister = inject('switchToRegister')

const loginData = reactive({
  email: '',
  password: '',
})

const closeModal = () => {
  emit('close')
}

const handleLogin = () => {
  console.log('Login:', loginData)
  alert('เข้าสู่ระบบสำเร็จ!')
  closeModal()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 10px;
  max-width: 450px;
  width: 90%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
}

.modal-close:hover {
  color: #333;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 15px;
  transition: background 0.3s;
}

.google-btn:hover {
  background: #f5f5f5;
}

.divider {
  text-align: center;
  color: #999;
  margin: 20px 0;
}

.btn-primary {
  width: 100%;
  padding: 15px;
  background: #003a70;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #002952;
}

.footer-text {
  margin-top: 20px;
  text-align: center;
  color: #666;
}

.footer-text a {
  color: #003a70;
  cursor: pointer;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}

.content-image {
  text-align: center;
}

.content-image img {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
