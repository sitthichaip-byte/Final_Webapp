<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="contact-hero">
      <div class="hero-content">
        <h1 class="hero-title">ติดต่อเรา</h1>
        <p class="hero-subtitle">เรายินดีรับฟังความคิดเห็นและคำแนะนำจากคุณ</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <div class="form-header">
              <h2>ส่งข้อความถึงเรา</h2>
              <p>กรอกฟอร์มด้านล่างและเราจะติดต่อกลับโดยเร็วที่สุด</p>
            </div>

            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">ชื่อ *</label>
                  <input
                    type="text"
                    id="firstName"
                    v-model="form.firstName"
                    placeholder="ชื่อของคุณ"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="lastName">นามสกุล *</label>
                  <input
                    type="text"
                    id="lastName"
                    v-model="form.lastName"
                    placeholder="นามสกุลของคุณ"
                    required
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">อีเมล *</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="phone">เบอร์โทรศัพท์</label>
                  <input type="tel" id="phone" v-model="form.phone" placeholder="0XX-XXX-XXXX" />
                </div>
              </div>

              <div class="form-group">
                <label for="subject">หัวข้อ *</label>
                <select id="subject" v-model="form.subject" required>
                  <option value="">เลือกหัวข้อ</option>
                  <option value="general">สอบถามทั่วไป</option>
                  <option value="support">ขอความช่วยเหลือ</option>
                  <option value="feedback">แสดงความคิดเห็น</option>
                  <option value="partnership">ความร่วมมือทางธุรกิจ</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">ข้อความ *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  placeholder="เขียนข้อความของคุณที่นี่..."
                  required
                ></textarea>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">ส่งข้อความ</span>
                <span v-else>กำลังส่ง...</span>
              </button>

              <p v-if="submitMessage" class="submit-message" :class="submitStatus">
                {{ submitMessage }}
              </p>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info-wrapper">
            <div class="info-card">
              <div class="info-icon">📍</div>
              <h3>ที่อยู่สำนักงาน</h3>
              <p>123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</p>
            </div>

            <div class="info-card">
              <div class="info-icon">📧</div>
              <h3>อีเมล</h3>
              <p>
                <a href="mailto:contact@pearjob.com">contact@pearjob.com</a>
                <a href="mailto:support@pearjob.com">support@pearjob.com</a>
              </p>
            </div>

            <div class="info-card">
              <div class="info-icon">📞</div>
              <h3>โทรศัพท์</h3>
              <p>
                <a href="tel:+6621234567">02-123-4567</a>
                <a href="tel:+66812345678">081-234-5678</a>
              </p>
            </div>

            <div class="info-card">
              <div class="info-icon">🕐</div>
              <h3>เวลาทำการ</h3>
              <p>จันทร์ - วันศุกร์: 9:00 - 18:00 เสาร์ - อาทิตย์: ปิดทำการ</p>
            </div>

            <div class="social-section">
              <h3>ติดตามเราได้ที่</h3>
              <div class="social-links">
                <a href="#" class="social-link" title="Facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                    />
                  </svg>
                </a>
                <a href="#" class="social-link" title="Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                    />
                  </svg>
                </a>
                <a href="#" class="social-link" title="LinkedIn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                    />
                  </svg>
                </a>
                <a href="#" class="social-link" title="Instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section (Optional) -->
    <section class="map-section">
      <div class="container">
        <h2>ตำแหน่งที่ตั้ง</h2>
        <div class="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5906545134043!2d100.5610513!3d13.7460157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ0JzQ1LjciTiAxMDDCsDMzJzM5LjgiRQ!5e0!3m2!1sth!2sth!4v1234567890"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    submitStatus.value = 'success'
    submitMessage.value = 'ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด'

    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  }, 1500)
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
}

/* Hero Section */
.contact-hero {
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  padding: 120px 20px 80px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  animation: fadeInUp 0.8s ease;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.95;
  animation: fadeInUp 0.8s ease 0.2s backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Contact Content */
.contact-content {
  padding: 80px 20px;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;
}

/* Contact Form */
.contact-form-wrapper {
  background: #f8f9fa;
  padding: 50px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
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
  font-size: 16px;
  color: #666;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0056a8;
  box-shadow: 0 0 0 3px rgba(0, 86, 168, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  padding: 16px 32px;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 58, 112, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-message {
  padding: 15px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
}

.submit-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Contact Info */
.contact-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.info-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: #0056a8;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.info-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.info-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #003a70;
  margin-bottom: 10px;
}

.info-card p {
  font-size: 15px;
  line-height: 1.7;
  color: #666;
  margin: 0;
}

.info-card a {
  color: #0056a8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-card a:hover {
  color: #003a70;
  text-decoration: underline;
}

/* Social Section */
.social-section {
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  color: white;
}

.social-section h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-link {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: white;
  color: #0056a8;
  transform: translateY(-5px);
}

/* Map Section */
.map-section {
  padding: 80px 20px;
  background: #f8f9fa;
}

.map-section h2 {
  font-size: 36px;
  font-weight: 800;
  color: #003a70;
  text-align: center;
  margin-bottom: 40px;
}

.map-wrapper {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-title {
    font-size: 40px;
  }

  .contact-form-wrapper {
    padding: 35px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 25px;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .contact-form-wrapper {
    padding: 25px;
  }

  .form-header h2 {
    font-size: 26px;
  }
}
</style>
