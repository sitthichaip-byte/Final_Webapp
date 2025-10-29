<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">&times;</button>

      <h2>ลงทะเบียน</h2>

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

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>ชื่อ-นามสกุล</label>
          <input
            v-model="registerData.fullname"
            type="text"
            required
            placeholder="กรอกชื่อ-นามสกุล"
          />
        </div>
        <div class="form-group">
          <label>อีเมล</label>
          <input v-model="registerData.email" type="email" required placeholder="กรอกอีเมลของคุณ" />
        </div>
        <div class="form-group">
          <label>รหัสผ่าน</label>
          <input
            v-model="registerData.password"
            type="password"
            required
            placeholder="กรอกรหัสผ่าน"
          />
        </div>
        <div class="form-group">
          <label>ยืนยันรหัสผ่าน</label>
          <input
            v-model="registerData.confirmPassword"
            type="password"
            required
            placeholder="กรอกรหัสผ่านอีกครั้ง"
          />
        </div>
        <button type="submit" class="btn-primary">ลงทะเบียน</button>
      </form>

      <div class="modal-footer">
        มีบัญชีผู้ใช้แล้วใช่ไหม? <a @click="switchToLogin">เข้าสู่ระบบ</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'

const emit = defineEmits(['close'])
const switchToLogin = inject('switchToLogin')

const registerData = reactive({
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const closeModal = () => {
  emit('close')
}

const handleRegister = () => {
  if (registerData.password !== registerData.confirmPassword) {
    alert('รหัสผ่านไม่ตรงกัน!')
    return
  }
  console.log('Register:', registerData)
  alert('ลงทะเบียนสำเร็จ!')
  closeModal()
}
</script>

<style scoped>
/* ใช้ style เดียวกับ LoginModal */
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

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 15px;
}

.form-group input:focus {
  outline: none;
  border-color: #003a70;
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

.modal-footer {
  margin-top: 20px;
  text-align: center;
  color: #666;
}

.modal-footer a {
  color: #003a70;
  cursor: pointer;
  text-decoration: none;
}

.modal-footer a:hover {
  text-decoration: underline;
}
</style>
